/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "all in one",
      recommended: false,
      url: '', // URL to the documentation page for this rule
    },
    fixable: 'code', // Or `code` or `whitespace`
    schema: [
      {
        type: 'array',
        items: {
          type: 'string',
        }
      }
    ], // Add a schema if the rule has options
    messages: {
      noDefaultParam: "Avoid setting default params '{{ name }}'",
    }
  },

  create(context) {
    return {
      'FunctionDeclaration, FunctionExpression, ArrowFunctionExpression'(node) {
        // const prop = node.callee.property
        node.params.forEach(param => {
          if (param.type === 'AssignmentPattern') {
            console.log(param.left.name);
            context.report({
              node: param,
              messageId: 'noDefaultParam',
              data: {
                name: param.left.name
              }
            });
          }
        });
      },
    };
  },
};
