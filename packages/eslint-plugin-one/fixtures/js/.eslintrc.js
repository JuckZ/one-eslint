/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  root: true,
  overrides: [
    {
      files: ['**/*.js'],
      extends: ["plugin:one/recommended"],
      rules: {
        'one/prefer-comment-method': [
          'error',
          {
            objName: 'util',
            propNames: ['goToPage'],
            commentName: 'public'
          }
        ]
      }
    },
  ]
};
