/**
 * @fileoverview all in one
 * @author juck
 */
"use strict";
const { ESLint } = require('eslint');
const assert = require('assert');

const cli = new ESLint({
  overrideConfig: {plugins: ['eslint-plugin-one']},
  rulePaths: ['lib/rules/']
});


describe('Eslint-plugin-one Markdown Processor', () => {
  it('should process and lint code correctly', async () => {
    const filePath = 'tests/TEST.md';
    const code = '# Hello\n# World';
    const codeReport = await cli.lintText(code);
    const fileReport = await cli.lintFiles([filePath]);
    assert.strictEqual(codeReport[0].errorCount, 0);
    assert.strictEqual(fileReport[0].errorCount, 0);
  });
});
