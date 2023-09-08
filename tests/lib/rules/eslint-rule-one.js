/**
 * @fileoverview all in one
 * @author juck
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/eslint-rule-one"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("eslint-rule-one", rule, {
  valid: [
    'bar',
    'baz',
    {
      code: "console.xxx('failed')",
    },
  ],

  invalid: [
    {
      code: 'foo',
      errors: [{ message: "Avoid using variables named 'foo'", type: "Identifier" }],
    },
    {
      code: "console.log('foo')",
      errors: [{ message: "Avoid using console.log", type: "CallExpression" }],
    },
    {
      code: "console.info('bar')",
      errors: [{ message: "Avoid using console.info", type: "CallExpression" }],
    },
  ],
});
