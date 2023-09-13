/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  root: true,
  extends: ["plugin:yml/standard"],
  parser: "@babel/eslint-parser",
  overrides: [
    {
      files: ["**/*.yaml", "**/*.yml"],
      parser: "yaml-eslint-parser",
    },
  ],
};