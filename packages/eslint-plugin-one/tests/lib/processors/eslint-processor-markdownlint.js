const outdent = require("outdent");
const { ESLint } = require('eslint');
const assert = require('assert');

const cli = new ESLint({
  useEslintrc: false,
  overrideConfig: {
    overrides: [
      {
        files: ['**/*.md'],
        parser: "eslint-plugin-markdownlint/parser",
        extends: ["plugin:markdownlint/recommended"],
        rules: {
          "markdownlint/md001": "off",
          "markdownlint/md003": "warn",
          "markdownlint/md025": ["error", {
            "level": 1
          }]
        }
      }
    ]
  },
});

describe('Markdownlint Processor', () => {

  it('should process and lint code correctly', async () => {
    const filePath = 'tests/TEST.md';
    const fileReport = await cli.lintFiles([filePath]);
    assert.strictEqual(fileReport[0].errorCount, 9);
  });

  it('should process and lint code correctly', async () => {
    const filePath = 'tests/TEST2.md';
    const fileReport = await cli.lintFiles([filePath]);
    assert.strictEqual(fileReport[0].errorCount, 2);
  });

  it('should process and lint code correctly', async () => {
    const code = '# Hello\n# World';
    const codeReport = await cli.lintText(code, {
      filePath: 'a.md'
    });
    assert.strictEqual(codeReport[0].errorCount, 4);
  });

  it('should process and lint code correctly', async () => {
    const code = outdent`
    # Hello
    ## World
    ## Juck`;
    const codeReport = await cli.lintText(code, {
      filePath: 'b.md'
    });
    assert.strictEqual(codeReport[0].errorCount, 5);
  });
});
