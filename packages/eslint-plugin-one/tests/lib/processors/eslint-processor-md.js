const outdent = require("outdent");
const { ESLint } = require('eslint');
const assert = require('assert');

const cli = new ESLint({
  useEslintrc: false,
  overrideConfig: {
    plugins: ['one'],
    overrides: [
      {
        files: ['**/*.md'],
        processor: 'one/markdown',
        parser: "eslint-plugin-markdownlint/parser",
        extends: ["plugin:markdownlint/recommended"],
        rules: {
          "markdownlint/md001": "off",
          "markdownlint/md003": "warn",
          "markdownlint/md025": ["error", {
            "level": 2
          }]
        }
      }
    ]
  },
  rulePaths: ['lib/rules/'],
});

describe('Eslint-plugin-one Markdown Processor', () => {

  it('should process and lint code correctly', async () => {
    const filePath = 'tests/TEST.md';
    const fileReport = await cli.lintFiles([filePath]);
    assert.strictEqual(fileReport[0].errorCount, 1);
  });

  it.skip('should process and lint code correctly', async () => {
    const filePath = 'tests/TEST2.md';
    const fileReport = await cli.lintFiles([filePath]);
    assert.strictEqual(fileReport[0].errorCount, 0);
  });

  it.skip('should process and lint code correctly', async () => {
    const code = '# Hello\n## World\n## Juck';
    const codeReport = await cli.lintText(code, {
      filePath: 'a.md'
    });
    assert.strictEqual(codeReport[0].errorCount, 0);
  });

  it.skip('should process and lint code correctly', async () => {
    const code = outdent`
    # Hello
    ## World`;
    const codeReport = await cli.lintText(code, {
      filePath: 'b.md'
    });
    assert.strictEqual(codeReport[0].errorCount, 1);
  });
});
