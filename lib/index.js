/**
 * @fileoverview all in one
 * @author juck
 */
"use strict";

const {name, version} = require('../package.json');
const requireIndex = require("requireindex");
const loadRule = require("../lib/utils/index").loadRule;
const mdProcessor = require("./processors/eslint-processor-md");

/** @type {import('eslint').ESLint.Plugin} */
module.exports = {
  meta: {
    name,
    version
  },
  rules: {
    ...requireIndex(__dirname + "/rules"),
    'prefer-default-parameters': loadRule('prefer-default-parameters')
  },
  processors: {
    ".md": mdProcessor,
    'markdown': mdProcessor
  },
  configs: {
    recommended: {
      env: {
        es6: true,
        browser: true
      },
      plugins: ['one'],
      processors: {
        ".md": mdProcessor,
        'markdown': mdProcessor
      },
      rules: {
        ...requireIndex(__dirname + "/configs/recommended/rules"),
        'prefer-default-parameters': loadRule('prefer-default-parameters'),
      }
    },
    all: {}
  }
}