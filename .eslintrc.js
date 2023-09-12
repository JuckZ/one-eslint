"use strict";

module.exports = {
  root: true,
  "parserOptions": {
    "ecmaVersion": 'latest',
  },
  extends: [
    "eslint:recommended",
    "plugin:eslint-plugin/recommended",
    "plugin:node/recommended",
    "plugin:markdown/recommended"
  ],
  env: {
    node: true,
  },
  overrides: [
    {
      files: ["tests/**/*.js"],
      env: { mocha: true },
    },
    {
      // In v2, explicitly apply eslint-plugin-markdown's `markdown`
      // processor on any Markdown files you want to lint.
      files: ["**/*.md"],
      processor: "markdown/markdown"
  },
  {
      // In v2, configuration for fenced code blocks is separate from the
      // containing Markdown file. Each code block has a virtual filename
      // appended to the Markdown file's path.
      files: ["**/*.md/*.js"],
      // Configuration for fenced code blocks goes with the override for
      // the code block's virtual filename, for example:
      parserOptions: {
          ecmaFeatures: {
              impliedStrict: true
          }
      },
      rules: {
          "no-console": "off"
      }
  }
  ],
};
