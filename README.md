# eslint-plugin-one

all in one

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-one`:

```sh
npm install eslint-plugin-one --save-dev
```

## Usage

Add `one` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "one"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "one/rule-name": 2
    }
}
```

## Rules

<!-- begin auto-generated rules list -->

🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).\
💡 Manually fixable by [editor suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions).

| Name                                                                 | Description                                  | 🔧 | 💡 |
| :------------------------------------------------------------------- | :------------------------------------------- | :- | :- |
| [eslint-rule-one](docs/rules/eslint-rule-one.md)                     | all in one                                   | 🔧 |    |
| [prefer-default-parameters](docs/rules/prefer-default-parameters.md) | Prefer default parameters over reassignment. | 🔧 | 💡 |

<!-- end auto-generated rules list -->


