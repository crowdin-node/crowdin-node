const assert = require('assert')

module.exports = function (opts = {}) {
  const defaults = {
    schemaVersion: 'v2',
    key: null
  }

  const client = Object.assign({}, defaults, opts)
  assert(client.key, 'Missing required key.')

  const schema = require('./lib/get-schema')(schemaVersion)
  const operations = require('./lib/get-operations')(schema)
  
  operations.forEach(operation => {
    client[operation.name] = operate.bind(operation)
  })

  return client
}