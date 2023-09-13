const outdent = require("outdent");
const { ESLint } = require('eslint');
const assert = require('assert');

const cli = new ESLint({
  useEslintrc: false,
  overrideConfig: {
    overrides: [
      {
        files: ['**/*.mine'],
        // processor: 'one/mine',
        parser: "eslint-plugin-one/mineParser",
        extends: ["plugin:one/recommended"],
        // extends: ["@juckz",],
        rules: {
          "one/mine001": "error",
          "one/mine025": ["error", {
            "level": 1
          }]
        }
      },
      {
        files: ["**/*.mine/*.js"],
        parserOptions: {
          ecmaFeatures: {
            impliedStrict: true
          }
        },
        rules: {
          "no-console": "off",
          "import/no-unresolved": "off"
        }
      }
    ]
  },
});

describe('Eslint-plugin-one Markdown Processor', () => {

  it('should process and lint code correctly', async () => {
    const filePath = 'fixtures/mine/TEST.mine';
    const fileReport = await cli.lintFiles([filePath]);
    assert.strictEqual(fileReport[0].errorCount, 10);
  });

  it('should process and lint code correctly', async () => {
    const filePath = 'fixtures/mine/TEST2.mine';
    const fileReport = await cli.lintFiles([filePath]);
    assert.strictEqual(fileReport[0].errorCount, 2);
  });

  it('should process and lint code correctly', async () => {
    const code = '# Hello\n## World\n## Juck';
    const codeReport = await cli.lintText(code, {
      filePath: 'a.mine'
    });
    assert.strictEqual(codeReport[0].errorCount, 5);
  });

  it('should process and lint code correctly', async () => {
    const code = outdent`
    # Hello
    ## World`;
    const codeReport = await cli.lintText(code, {
      filePath: 'b.mine'
    });
    assert.strictEqual(codeReport[0].errorCount, 3);
  });
});
