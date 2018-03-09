# neutrino-preset-define-from-file

wrapper for [DefinePlugin](https://webpack.js.org/plugins/define-plugin/)

define global constant with content from file

## usage

config.json:
```json
{"A": 1, "B": 2} 
```

.neutrinorc.js:
```js
module.exports = {
  use: [
    // define global constants A and B:
    ['neutrino-preset-define-from-file', {fileName: 'config.json'}],
    // define global constant ENV == {A:1,B:2}
    ['neutrino-preset-define-from-file', {
      fileName: 'config.json', 
      contentName: 'ENV'
    }],
    // stop if config not exist:
    ['neutrino-preset-define-from-file', {
      fileName: 'not-exist-config.json',
      required: true
    }],
  ]
};
```

with [env middleware](https://neutrino.js.org/packages/env/):
```js
module.exports = {
  env: {
    NODE_ENV: {
      production: {
        use: [['neutrino-preset-define-from-file', {fileName: '.production', required: true}]]
      },
      development: {
        use: [['neutrino-preset-define-from-file', {fileName: '.development', required: true}]]
      },
    }
  }
};
```
