# Crowdin API Wrapper

A Node.js client for the 
[v1](https://support.crowdin.com/api/api-integration-setup/) and 
[v2](https://support.crowdin.com/enterprise/api/) Crowdin APIs

## Installation

🚧 This is a work in progress. Not ready for general use! 🚧

This module is not yet published to npm. For now, you can install it directly
form the GitHub repo:

```sh
npm install aletrejo/crowdin-wrapper
```

## Basic Usage

```js
const crowdin = require('crowdin-wrapper')({
  key: process.env.CROWDIN_KEY,
  schemaVersion: 'v2'
})

const projects = await crowdin.projects.getMany()
```

Or clone the repo and run an example script:

```sh
git clone https://github.com/aletrejo/crowdin-wrapper
cd crowdin-wrapper
npm install
npm run example
```

## API

This module exports a single [factory function](https://www.youtube.com/watch?v=ImwrezYhw4w) 
that returns a Crowdin client:

### `createClient([options])`

- `options` Object
  - `key` String - Your Crowdin API key. Required.
  - `schemaVersion` String (optional) - Çan be `v1` or `v2`. Defaults to `v2`.
  - `hostname` String (optional) - Defaults to `api.crowdin.com`

The returned client is an object of deeply nested API operations like 
`crowdin.projects.files.getMany` and `crowdin.projects.branches.languages.progress.getMany`. 
Each of these operations returns a Promise to a [got](https://ghub.io/got) response object. 

See [docs/v1.md](docs/v1.md) and [docs/v2.md](docs/v2.md) for reference.