# Crowdin API Client

A Node.js client for the 
[v1](https://support.crowdin.com/api/api-integration-setup/) and 
[v2](https://support.crowdin.com/enterprise/api/) Crowdin APIs

🚧 This client is a work in progress, and not ready for production use. Feel free to try it out and [open issues](https://github.com/crowdin-node/crowdin-node/issues). 🚧

## Installation

```sh
npm install crowdin
```

## Basic Usage

```js
const crowdin = require('crowdin')({
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

## Thanks

Special thanks to :sparkles:[Paul Le Cam](https://www.npmjs.com/~paul_lecam):sparkles: for donating the `crowdin` npm package name. 