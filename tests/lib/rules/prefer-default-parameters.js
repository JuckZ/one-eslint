/**
 * @fileoverview prefer-default-parameters
 * @author juck
 */
"use strict";

const rule = require("../../../lib/rules/prefer-default-parameters"),
  RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester();
ruleTester.run("prefer-default-parameters", rule, {
  valid: [
    // 'function abc(foo = { bar: 123 }) { }',
  ],

  invalid: [
    // {
    //   code: 'function abc(foo) {\n  foo = foo || 123;\n}',
    // errors: [ 'function abc(foo = 123) {\n}' ].map(suggestion => ({
		// 	messageId: 'preferDefaultParameters',
		// 	suggestions: [{
		// 		messageId: 'preferDefaultParametersSuggest',
		// 		output: suggestion,
		// 	}],
		// })),
    // },
  ],
});