/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  root: true,
  overrides: [
    {
      files: ['**/*.md'],
      parser: "eslint-plugin-markdownlint/parser",
      extends: ["plugin:markdownlint/recommended"],
      rules: {
        "markdownlint/md001": "error",
        "markdownlint/md003": "warn",
        "markdownlint/md025": ["error", {
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
