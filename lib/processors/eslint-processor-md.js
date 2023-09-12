/**
 * @fileoverview all in one
 * @author juck
 */
"use strict";

const marked = require('marked');

module.exports = {
  meta: {
    name: "eslint-processor-md",
    version: "0.0.0"
  },
  // takes text of the file and filename
  preprocess: function (text, filename) {
    // here, you can strip out any non-JS content
    // and split into multiple strings to lint
    let h1Count = 0;
    const lexer = new marked.Lexer();
    const tokens = lexer.lex(text);
    for (const token of tokens) {
      if (token.type === 'heading' && token.depth === 1) {
        h1Count++;
      }
    }
    // 如果有多个一级标题，生成一个错误消息
    if (h1Count > 1) {
      return [
        {
          text: 'Multiple H1 titles are not allowed.',
          filename: '0.md'
        },
        {
          text: 'Multiple H1\nnot allowed',
          filename: '1.md'
        }
      ];
    } else {
      return [{
        text,
      }];
    }
  },
  // takes a Message[][] and filename
  postprocess: function (messages, filename) {
    // `messages` argument contains two-dimensional array of Message objects
    // where each top-level array item contains array of lint messages related
    // to the text that was returned in array from preprocess() method

    // you need to return a one-dimensional array of the messages you want to keep
    return [].concat(...messages);
  },
  supportsAutofix: false // (optional, defaults to false)
};
