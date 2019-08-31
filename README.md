# Crowdin API Client

A Node.js client for the 
[v1](https://support.crowdin.com/api/api-integration-setup/) and 
[v2](https://support.crowdin.com/enterprise/api/) Crowdin APIs

🚧 This is still a work in progress. To see what remains to be implemented, check out the [open issues](https://github.com/crowdin-node/crowdin-node/issues). 🚧

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

## Examples

To try out some examples, clone the repo and install dependencies:

```sh
git clone https://github.com/aletrejo/crowdin-wrapper
cd crowdin-wrapper
npm install
```

Then you can run the examples:

```js
node examples/v1-get-project-details.js
node examples/v2-add-files.js
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