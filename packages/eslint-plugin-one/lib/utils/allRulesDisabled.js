const Rule = require("../rules/rule");

module.exports = Object.values(Rule).reduce((o, key) => {
  o[key] = false;
  return o;
}, {});
