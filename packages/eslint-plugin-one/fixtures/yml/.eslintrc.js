/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  root: true,
  extends: ["plugin:yml/standard"],
  overrides: [
    {
      files: ["**/*.yaml", "**/*.yml"],
      parser: "yaml-eslint-parser",
    },
  ],
};