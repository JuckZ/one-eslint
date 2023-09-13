/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  root: true,
  overrides: [
    {
      files: ['**/*.mine'],
      // processor: 'one/mine',
      parser: "eslint-plugin-one/mineParser",
      extends: ["plugin:one/recommended"],
      // extends: ["@juckz",],
      rules: {
        "one/mine001": "error",
        "one/mine025": ["error", {
          "level": 1
        }]
      }
    },
    {
      files: ["**/*.mine/*.js"],
      parserOptions: {
        ecmaFeatures: {
          impliedStrict: true
        }
      },
      rules: {
        "no-console": "off",
        "import/no-unresolved": "off"
      }
    }
  ]
};
