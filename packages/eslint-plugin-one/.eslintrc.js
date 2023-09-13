/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  // root: true,
  // "parserOptions": {
  //   "ecmaVersion": 'latest',
  // },
  plugins: ['@juckz'],
  // plugins: ['markdown'],
  extends: [
    "@juckz",
    // "eslint:recommended",
    // "plugin:eslint-plugin/recommended",
    // "plugin:node/recommended",
    // "plugin:markdown/recommended",
    // "plugin:typescript-eslint/recommended",
  ],
  // env: {
  //   node: true,
  //   es6: true,
  //   browser: true
  // },
  // rules: {
  //   'no-unused-vars': 'error',
  //   'one/custom-param': ['error', {
  //     name: 'foo',
  //     type: 'string',
  //     default: 'bar',
  //   }] 
  // },
  // overrides: [
  //   {
  //     files: ["tests/**/*.js"],
  //     env: { mocha: true },
  //   },
  //   {
  //     files: ["**/*.yaml", "**/*.yml"],
  //     rules: {},
  //     processor: "markdown/markdown"
  //   }
  // ],
};
