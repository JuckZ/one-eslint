/**
 * @fileoverview all in one
 * @author juck
 */
"use strict";

module.exports = {
  meta: {
    name: "eslint-processor-md",
    version: "0.0.0"
  },
  // takes text of the file and filename
  preprocess: function (text, filename) {
    // here, you can strip out any non-JS content
    // and split into multiple strings to lint
    let code1 = text.split(' ')[0];
    let code2 = text.split(' ')[1];
    return [ // return an array of code blocks to lint
      { text: code1, filename: filename + "_0.js" },
      { text: code2, filename: filename + "_1.js" },
    ];
  },
  // takes a Message[][] and filename
  postprocess: function (messages, filename) {
    // `messages` argument contains two-dimensional array of Message objects
    // where each top-level array item contains array of lint messages related
    // to the text that was returned in array from preprocess() method

    // you need to return a one-dimensional array of the messages you want to keep
    return [].concat(...messages);
  },
  supportsAutofix: true // (optional, defaults to false)
};
