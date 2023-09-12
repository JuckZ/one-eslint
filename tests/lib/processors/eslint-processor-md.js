/**
 * @fileoverview all in one
 * @author juck
 */
"use strict";
const outdent = require("outdent");
const { ESLint } = require('eslint');
const assert = require('assert');

const cli = new ESLint({
  useEslintrc: false,
  overrideConfig: {
    plugins: ['markdown'],
    
    // plugins: ['eslint-plugin-one'],
    overrides: [
      {
        files: ["**/*.md"],
        processor: "markdown/markdown"
    },
      // {
      //  files: ['*.md'],
      //  processor:  'one/.md'
      // }
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

  it('should process and lint code correctly', async () => {
    const filePath = 'tests/TEST2.md';
    const fileReport = await cli.lintFiles([filePath]);
    assert.strictEqual(fileReport[0].errorCount, 0);
  });

  it('should process and lint code correctly', async () => {
    const code = '# Hello\n## World';
    const codeReport = await cli.lintText(code, {
      filePath: 'a.md'
    });
    assert.strictEqual(codeReport[0].errorCount, 0);
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
