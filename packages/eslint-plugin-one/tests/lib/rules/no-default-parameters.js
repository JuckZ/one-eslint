const outdent = require("outdent");
const Eslintrc = require("../../../.eslintrc");
const rule = require("../../../lib/rules/no-default-parameters"),
  RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester({
	...Eslintrc,
	"parserOptions": {
    "ecmaVersion": 'latest',
  },
});
ruleTester.run("no-default-parameters", rule, {
  valid: [
    'function abc(a){a=123}'
    // 'function abc(foo = { bar: 123 }) { }',
		// 'function abc({ bar } = { bar: 123 }) { }',
		// 'function abc({ bar = 123 } = { bar }) { }',
		// 'function abc(foo = fooDefault) { }',
		// 'function abc(foo = {}) { }',
		// 'function abc(foo = \'bar\') { }',
		// 'function abc({ bar = 123 } = {}) { }',
		// 'const abc = (foo = \'bar\') => { };',
		// 'foo = foo || \'bar\';',
		// 'const bar = foo || \'bar\';',
		// 'const abc = function(foo = { bar: 123 }) { }',
		// 'const abc = function({ bar } = { bar: 123 }) { }',
		// 'const abc = function({ bar = 123 } = {}) { }',
		// outdent`
		// 	function abc(foo) {
		// 		foo = foo || bar();
		// 	}
		// `,
		// outdent`
		// 	function abc(foo) {
		// 		foo = foo || {bar};
		// 	}
		// `,
		// outdent`
		// 	function abc(foo) {
		// 		const {bar} = foo || 123;
		// 	}
		// `,
		// outdent`
		// 	function abc(foo, bar) {
		// 		bar = foo || 'bar';
		// 	}
		// `,
		// outdent`
		// 	function abc(foo, bar) {
		// 		foo = foo || 'bar';
		// 		baz();
		// 	}
		// `,
		// outdent`
		// 	function abc(foo) {
		// 		foo = foo && 'bar';
		// 	}
		// `,
		// outdent`
		// 	function abc(foo) {
		// 		foo = foo || 1 && 2 || 3;
		// 	}
		// `,
		// outdent`
		// 	function abc(foo) {
		// 		foo = !foo || 'bar';
		// 	}
		// `,
		// outdent`
		// 	function abc(foo) {
		// 		foo = (foo && bar) || baz;
		// 	}
		// `,
		// outdent`
		// 	function abc(foo = 123) {
		// 		foo = foo || 'bar';
		// 	}
		// `,
		// outdent`
		// 	function abc() {
		// 		let foo = 123;
		// 		foo = foo || 'bar';
		// 	}
		// `,
		// outdent`
		// 	function abc() {
		// 		let foo = 123;
		// 		const bar = foo || 'bar';
		// 	}
		// `,
		// outdent`
		// 	const abc = (foo, bar) => {
		// 		bar = foo || 'bar';
		// 	};
		// `,
		// outdent`
		// 	const abc = function(foo, bar) {
		// 		bar = foo || 'bar';
		// 	}
		// `,
		// outdent`
		// 	const abc = function(foo) {
		// 		foo = foo || bar();
		// 	}
		// `,
		// outdent`
		// 	function abc(foo) {
		// 		function def(bar) {
		// 			foo = foo || 'bar';
		// 		}
		// 	}
		// `,
		// outdent`
		// 	function abc(foo) {
		// 		const bar = foo = foo || 123;
		// 	}
		// `,
		// outdent`
		// 	function abc(foo) {
		// 		bar(foo = foo || 1);
		// 		baz(foo);
		// 	}
		// `,
		// // The following tests check references and side effects
		// outdent`
		// 	function abc(foo) {
		// 		console.log(foo);
		// 		foo = foo || 123;
		// 	}
		// `,
		// outdent`
		// 	function abc(foo) {
		// 		console.log(foo);
		// 		foo = foo || 'bar';
		// 	}
		// `,
		// outdent`
		// 	function abc(foo) {
		// 		const bar = foo || 'bar';
		// 		console.log(foo, bar);
		// 	}
		// `,
		// outdent`
		// 	function abc(foo) {
		// 		let bar = 123;
		// 		bar = foo;
		// 		foo = foo || 123;
		// 	}
		// `,
		// outdent`
		// 	function abc(foo) {
		// 		bar();
		// 		foo = foo || 123;
		// 	}
		// `,
		// outdent`
		// 	const abc = (foo) => {
		// 		bar();
		// 		foo = foo || 123;
		// 	};
		// `,
		// outdent`
		// 	const abc = function(foo) {
		// 		bar();
		// 		foo = foo || 123;
		// 	};
		// `,
		// outdent`
		// 	function abc(foo) {
		// 		sideEffects();
		// 		foo = foo || 123;

		// 		function sideEffects() {
		// 			foo = 456;
		// 		}
		// 	}
		// `,
		// outdent`
		// 	function abc(foo) {
		// 		const bar = sideEffects();
		// 		foo = foo || 123;

		// 		function sideEffects() {
		// 			foo = 456;
		// 		}
		// 	}
		// `,
		// outdent`
		// 	function abc(foo) {
		// 		const bar = sideEffects() + 123;
		// 		foo = foo || 123;

		// 		function sideEffects() {
		// 			foo = 456;
		// 		}
		// 	}
		// `,
		// outdent`
		// 	function abc(foo) {
		// 		const bar = !sideEffects();
		// 		foo = foo || 123;

		// 		function sideEffects() {
		// 			foo = 456;
		// 		}
		// 	}
		// `,
		// outdent`
		// 	function abc(foo) {
		// 		const bar = function() {
		// 			foo = 456;
		// 		}
		// 		foo = foo || 123;
		// 	}
		// `,
		// // Last parameter is `RestElement`
		// outdent`
		// 	function abc(...foo) {
		// 		foo = foo || 'bar';
		// 	}
		// `,
		// // Last parameter is `AssignmentPattern`
		// outdent`
		// 	function abc(foo = 'bar') {
		// 		foo = foo || 'baz';
		// 	}
		// `,
  ],

  invalid: [
    {
      code: outdent`
			function abc(foo = 1) {
				const {bar} = foo || 123;
			}
		`,
      errors: [{ message: "Avoid setting default params 'foo'", type: "AssignmentPattern" }],
    },
  ],
});
