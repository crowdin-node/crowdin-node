const assert = require('assert')
const getSchema = require('./lib/get-schema')
const getOperations = require('./lib/get-operations')
const operate = require('./lib/operate')

module.exports = function (opts = {}) {
  const defaults = {
    schemaVersion: 'v2',
    key: null
  }

  // attach options to the client object
  const client = Object.assign({}, defaults, opts)
  assert(client.key, 'Missing required option: `key`')

  // Load the requested schema version and generate a list of operations
  const schema = getSchema(client.schemaVersion)
  const operations = getOperations(schema)

  // attach bound operations to the client object
  operations.forEach(operation => {
    client[operation.name] = operate.bind(operation)
  })

  return client
}
