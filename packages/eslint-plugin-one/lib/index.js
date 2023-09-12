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
  processors: {
    ".md": mdProcessor,
    'markdown': mdProcessor
  },
  configs: {
    // recommended: {
    //   env: {
    //     es6: true,
    //     browser: true
    //   },
    //   plugins: ['one'],
    //   processors: {
    //     ".md": mdProcessor,
    //     'markdown': mdProcessor
    //   },
    //   rules: {
    //     ...requireIndex(__dirname + "/configs/recommended/rules"),
    //   }
    // },
    all: {}
  }
}