/**
 * @fileoverview all in one
 * @author juck
 */
"use strict";

const {name, version} = require('../package.json');
const requireIndex = require("requireindex");
const loadRule = require("../lib/utils/index").loadRule;
const mdProcessor = require("./processors/eslint-processor-md");

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
    recommended: {},
    all: {}
  }
}