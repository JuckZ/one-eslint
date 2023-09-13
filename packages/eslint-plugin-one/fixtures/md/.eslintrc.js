/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  root: true,
  overrides: [
    {
      files: ['**/*.md'],
      // processor: 'one/md',
      parser: "eslint-plugin-one/mdParser",
      extends: ["plugin:one/recommended"],
      // extends: ["@juckz",],
      rules: {
        "one/md001": "error",
        "one/md025": ["error", {
          "level": 1
        }]
      }
    },
    {
      files: ["**/*.md/*.js"],
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
