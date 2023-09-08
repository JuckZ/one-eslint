/**
 * @fileoverview all in one
 * @author juck
 */
"use strict";
const { ESLint } = require('eslint');

const cli = new ESLint({
  extensions: ['your-custom-extension'],
  // 添加你的 Processor 配置
  // plugins
  rulePaths: ['lib/rules/']
});


describe('Your Custom Processor', () => {
  it('should process and lint code correctly', () => {
    const filePath = 'tests/TEST.md';
    const code = '# README';
    const codeReport = cli.lintText(code);
    const fileReport = cli.lintFiles([filePath]);
    codeReport.then(results=> {
      console.log('1----' + results.length);
    }).catch(error => {
      console.error(error);
    });

    fileReport.then(results=> {
      console.log('2----' + results.length);
    }).catch(error => {
      console.error(error);
    });
    // assert.strictEqual(report.errorCount, 0);
    // assert.strictEqual(report.results[0].messages.length, 1);
  });
});
