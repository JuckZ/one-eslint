const {name, version} = require('../package.json');
const requireIndex = require("requireindex");
const mdProcessor = require("./processors/eslint-processor-md");

/** @type {import('eslint').ESLint.Plugin} */
module.exports = {
  meta: {
    name,
    version
  },
  rules: {
    ...requireIndex(__dirname + "/rules"),
  },
  // processors: {
  //   ".md": mdProcessor,
  //   'md': mdProcessor
  // },
  configs: {
    recommended: {
      plugins: ['one', 'jsdoc', 'local-rules'],
      globals: {},
      settings: {},
      extends: ["plugin:jsdoc/recommended-error"],
      // extends: ["plugin:jsdoc/recommended-typescript-error"],
      rules: {
        // 'one/md001': 'error',
        'local-rules/no-default-parameters': 2,
        'one/prefer-comment-method': [
          'error',
          {
            objName: 'test',
            propNames: ['testCall'],
            commentName: '$test'
          }
        ]
      },
      env: {
        es6: true,
        es6: true,
        browser: true
      }
    },
  }
}