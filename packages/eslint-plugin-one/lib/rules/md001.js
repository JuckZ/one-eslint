const ruleChecker = require("../ruleChecker");
const Rule = require("./rule");

module.exports = {
  meta: {
    type: "layout",
    docs: {
      description: "heading levels should only increment by one level at a time",
      url: "https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md001",
    },
    schema: [],
    fixable: "whitespace",
  },
  create: ruleChecker(Rule.MD001),
};
