'use strict';

/**
 * Get the innermost scope which contains a given location.
 * @param {Scope} initialScope The initial scope to search.
 * @param {Node} node The location to search.
 * @returns {Scope} The innermost scope.
 */
function getInnermostScope(initialScope, node) {
  const location = node.range[0];

  let scope = initialScope;
  let found = false;
  do {
      found = false;
      for (const childScope of scope.childScopes) {
          const range = childScope.block.range;

          if (range[0] <= location && location < range[1]) {
              scope = childScope;
              found = true;
              break
          }
      }
  } while (found)

  return scope
}
/**
 * Find the variable of a given name.
 * @param {Scope} initialScope The scope to start finding.
 * @param {string|Node} nameOrNode The variable name to find. If this is a Node object then it should be an Identifier node.
 * @returns {Variable|null} The found variable or null.
 */
function findVariable(initialScope, nameOrNode) {
  let name = "";
  let scope = initialScope;

  if (typeof nameOrNode === "string") {
      name = nameOrNode;
  } else {
      name = nameOrNode.name;
      scope = getInnermostScope(scope, nameOrNode);
  }

  while (scope != null) {
      const variable = scope.set.get(name);
      if (variable != null) {
          return variable
      }
      scope = scope.upper;
  }

  return null
}
const {functionTypes} = ['FunctionDeclaration', 'FunctionExpression', 'ArrowFunctionExpression'];

const MESSAGE_ID = 'preferDefaultParameters';
const MESSAGE_ID_SUGGEST = 'preferDefaultParametersSuggest';

const isDefaultExpression = (left, right) =>
	left
	&& right
	&& left.type === 'Identifier'
	&& right.type === 'LogicalExpression'
	&& (right.operator === '||' || right.operator === '??')
	&& right.left.type === 'Identifier'
	&& right.right.type === 'Literal';

const containsCallExpression = (sourceCode, node) => {
	if (!node) {
		return false;
	}

	if (node.type === 'CallExpression') {
		return true;
	}

	const keys = sourceCode.visitorKeys[node.type];

	for (const key of keys) {
		const value = node[key];

		if (Array.isArray(value)) {
			for (const element of value) {
				if (containsCallExpression(sourceCode, element)) {
					return true;
				}
			}
		} else if (containsCallExpression(sourceCode, value)) {
			return true;
		}
	}

	return false;
};

const hasSideEffects = (sourceCode, function_, node) => {
	for (const element of function_.body.body) {
		if (element === node) {
			break;
		}

		// Function call before default-assignment
		if (containsCallExpression(sourceCode, element)) {
			return true;
		}
	}

	return false;
};

const hasExtraReferences = (assignment, references, left) => {
	// Parameter is referenced prior to default-assignment
	if (assignment && references[0].identifier !== left) {
		return true;
	}

	// Old parameter is still referenced somewhere else
	if (!assignment && references.length > 1) {
		return true;
	}

	return false;
};

const isLastParameter = (parameters, parameter) => {
	const lastParameter = parameters[parameters.length - 1];

	// See 'default-param-last' rule
	return parameter && parameter === lastParameter;
};

const needsParentheses = (sourceCode, function_) => {
	if (function_.type !== 'ArrowFunctionExpression' || function_.params.length > 1) {
		return false;
	}

	const [parameter] = function_.params;
	const before = sourceCode.getTokenBefore(parameter);
	const after = sourceCode.getTokenAfter(parameter);

	return !after || !before || before.value !== '(' || after.value !== ')';
};

/** @param {import('eslint').Rule.RuleFixer} fixer */
const fixDefaultExpression = (fixer, sourceCode, node) => {
	const {line} = node.loc.start;
	const {column} = node.loc.end;
	const nodeText = sourceCode.getText(node);
	const lineText = sourceCode.lines[line - 1];
	const isOnlyNodeOnLine = lineText.trim() === nodeText;
	const endsWithWhitespace = lineText[column] === ' ';

	if (isOnlyNodeOnLine) {
		return fixer.removeRange([
			sourceCode.getIndexFromLoc({line, column: 0}),
			sourceCode.getIndexFromLoc({line: line + 1, column: 0}),
		]);
	}

	if (endsWithWhitespace) {
		return fixer.removeRange([
			node.range[0],
			node.range[1] + 1,
		]);
	}

	return fixer.remove(node);
};

/** @param {import('eslint').Rule.RuleContext} context */
const create = context => {
	const {sourceCode} = context;
	const functionStack = [];

	const checkExpression = (node, left, right, assignment) => {
		const currentFunction = functionStack[functionStack.length - 1];

		if (!currentFunction || !isDefaultExpression(left, right)) {
			return;
		}

		const {name: firstId} = left;
		const {
			left: {name: secondId},
			right: {raw: literal},
		} = right;

		// Parameter is reassigned to a different identifier
		if (assignment && firstId !== secondId) {
			return;
		}

		const variable = findVariable(sourceCode.getScope(node), secondId);

		// This was reported https://github.com/sindresorhus/eslint-plugin-unicorn/issues/1122
		// But can't reproduce, just ignore this case
		/* c8 ignore next 3 */
		if (!variable) {
			return;
		}

		const {references} = variable;
		const {params} = currentFunction;
		const parameter = params.find(parameter =>
			parameter.type === 'Identifier'
			&& parameter.name === secondId,
		);

		if (
			hasSideEffects(sourceCode, currentFunction, node)
			|| hasExtraReferences(assignment, references, left)
			|| !isLastParameter(params, parameter)
		) {
			return;
		}

		const replacement = needsParentheses(sourceCode, currentFunction)
			? `(${firstId} = ${literal})`
			: `${firstId} = ${literal}`;

		return {
			node,
			messageId: MESSAGE_ID,
			suggest: [{
				messageId: MESSAGE_ID_SUGGEST,
				fix: fixer => [
					fixer.replaceText(parameter, replacement),
					fixDefaultExpression(fixer, sourceCode, node),
				],
			}],
		};
	};

	context.on(functionTypes, node => {
		functionStack.push(node);
	});

	context.onExit(functionTypes, () => {
		functionStack.pop();
	});

	context.on('AssignmentExpression', node => {
		if (node.parent.type === 'ExpressionStatement' && node.parent.expression === node) {
			return checkExpression(node.parent, node.left, node.right, true);
		}
	});

	context.on('VariableDeclarator', node => {
		if (node.parent.type === 'VariableDeclaration' && node.parent.declarations[0] === node) {
			return checkExpression(node.parent, node.id, node.init, false);
		}
	});
};

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
	create,
	meta: {
		type: 'suggestion',
		docs: {
			description: 'Prefer default parameters over reassignment.',
		},
    schema:[],
		fixable: 'code',
		hasSuggestions: true,
		messages: {
			[MESSAGE_ID]: 'Prefer default parameters over reassignment.',
			[MESSAGE_ID_SUGGEST]: 'Replace reassignment with default parameter.',
		},
	},
};