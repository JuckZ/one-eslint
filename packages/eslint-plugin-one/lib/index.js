const {name, version} = require('../package.json');
const requireIndex = require("requireindex");
const mineProcessor = require("./processors/eslint-processor-mine");

/** @type {import('eslint').ESLint.Plugin} */
module.exports = {
  meta: {
    name,
    version
  },
  rules: {
    ...requireIndex(__dirname + "/rules"),
  },
  processors: {
    ".mine": mineProcessor,
    'mine': mineProcessor
  },
  configs: {
    recommended: {
      plugins: ['one'],
      rules: {
        'one/mine001': 2
      },
      env: {
        es6: true,
        browser: true
      }
    },
  }
}