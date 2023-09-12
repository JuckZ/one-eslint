/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  root: true,
  "parserOptions": {
    "ecmaVersion": 'latest',
  },
  plugins: ['markdown', 'markdownlint'],
  // extensions: ['.md'],
  extends: [
    "eslint:recommended",
    "plugin:eslint-plugin/recommended",
    "plugin:node/recommended",
    "plugin:markdown/recommended",
    "plugin:typescript-eslint/recommended",
  ],
  env: {
    node: true,
  },
  rules: {
    'no-unused-vars': 'error',
    // 'one/custom-param': ['error', {
    //   name: 'foo',
    //   type: 'string',
    //   default: 'bar',
    // }] 
  },
  overrides: [
    {
      files: ["tests/**/*.js"],
      env: { mocha: true },
    },
    {
      files: ["**/*.yaml", "**/*.yml"],
      rules: {},
      processor: "markdown/markdown"
    },
    {
      files: ["**/*.md"],
      // processor: "markdown/markdown",
      parser: 'eslint-plugin-markdownlint/parser',
      extends: ['plugin:markdownlint/recommended'],
      "rules": {
        "markdownlint/md001": "off",
        "markdownlint/md003": "warn",
        "markdownlint/md025": ["error", {
          "level": 2
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
  ],
};
