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
TODO: Run eslint-doc-generator to generate the rules list.
<!-- end auto-generated rules list -->


