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
    let codeChunkList = text.split('\n');
    let index = -1;
    // return an array of code blocks to lint
    return codeChunkList.map(code => {
      index++;
      return {
        text: code,
        filename: `${filename}_${index}.md`
      };
    });
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
