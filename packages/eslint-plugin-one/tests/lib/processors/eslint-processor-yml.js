const outdent = require("outdent");
const { ESLint } = require('eslint');
const assert = require('assert');

const cli = new ESLint({
  useEslintrc: false,
  overrideConfig: {
    extends: [
      // add more generic rulesets here, such as:
      // 'eslint:recommended',
      "plugin:yml/standard",
    ],
    rules: {
      // override/add rules settings here, such as:
      // 'yml/rule-name': 'error'
    },
    overrides: [
      {
        files: ["*.yaml", "*.yml"],
        parser: "yaml-eslint-parser",
      },
    ]
  },
});

describe('Eslint-plugin-one Markdown Processor', () => {

  it('should process and lint code correctly', async () => {
    const filePath = 'fixtures/yml/TEST.yml';
    const fileReport = await cli.lintFiles([filePath]);
    assert.strictEqual(fileReport[0].errorCount, 2);
  });

  it('should process and lint code correctly', async () => {
    const filePath = 'fixtures/yml/TEST2.yaml';
    const fileReport = await cli.lintFiles([filePath]);
    assert.strictEqual(fileReport[0].errorCount, 1);
  });

  it('should process and lint code correctly', async () => {
    const code = '# Hello\n## World\n## Juck';
    const codeReport = await cli.lintText(code, {
      filePath: 'a.md'
    });
    assert.strictEqual(codeReport[0].errorCount, 1);
  });

  it('should process and lint code correctly', async () => {
    const code = outdent`
    # Hello
    ## World`;
    const codeReport = await cli.lintText(code, {
      filePath: 'b.md'
    });
    assert.strictEqual(codeReport[0].errorCount, 1);
  });
});
