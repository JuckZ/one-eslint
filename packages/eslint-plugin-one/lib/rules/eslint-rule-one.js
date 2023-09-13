/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "all in one",
      recommended: false,
      url: '',
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
      // create: "Use default export instead.",
      avoidName: "Avoid using variables named '{{ name }}'",
      noConsoleLog: "Avoid using console.{{ name }}",
      missingSemicolon: "Missing semicolon",
    }
  },

  create(context) {
    // variables should be defined here
    const logs = [
      'debug', 'error', 'info', 'log', 'warn', 'table'
    ]
    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      // visitor functions for different types of nodes
      ForStatement(node) {
        context.report({
          node,
          messageId: 'missingSemicolon',
          fix(fixer) {
            return fixer.insertTextAfter(node, ';');
          }
        })
      },
      Identifier(node) {
        if (node.name === "foo") {
          context.report({
            node,
            messageId: "avoidName",
            data: {
              name: "foo",
            }
          });
        }
      },
      CallExpression(node) {
        const options = context.options[0];
        const disableLogs = Array.isArray(options) ? logs.filter(log => !options.includes(log)) : logs
        const obj = node.callee.object
        const prop = node.callee.property
        if (!obj || !prop) return
        if (obj.name !== 'console') return
        if (disableLogs.includes(prop.name)) {
          context.report({
            node,
            messageId: 'noConsoleLog',
            data: {
              name: prop.name
            }
          })
        }
      }
    };
  },
};
