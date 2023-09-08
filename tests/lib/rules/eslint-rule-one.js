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
    // give me some code that won't trigger a warning
  ],

  invalid: [
    {
      code: "console.log('failed')",
      errors: [{ message: "Fill me in.", type: "Me too" }],
    },
  ],
});
