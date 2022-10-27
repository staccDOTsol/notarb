# CNAME file configuration for typedoc
![License](https://img.shields.io/npm/l/typedoc-plugin-cname)
[![Coverage](https://img.shields.io/codecov/c/gh/JoshStern/typedoc-plugin-cname)](https://app.codecov.io/gh/JoshStern/typedoc-plugin-cname)
![Size](https://img.shields.io/bundlephobia/min/typedoc-plugin-cname)
[![Version](https://img.shields.io/npm/v/typedoc-plugin-cname)](https://www.npmjs.com/package/typedoc-plugin-cname)

Github pages uses a `CNAME` file at the root of the docs directory and `typedoc` will remove the
it when regenerating docs. `typedoc-plugin-cname` allows for a CNAME host to be configured and
added to the output directory.

## Installation
```sh
npm install -D typedoc typedoc-plugin-cname
```

## Usage
This plugin adds the `cname` option which can be used to set a hostname.

### CLI
```sh
npx tsdoc --plugin typedoc-plugin-cname --cname <host> <entryPoint>
```

### Config file
```json
// typedoc.json
{
  // ...
  "cname": "<host>"
}
```
