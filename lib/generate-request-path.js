const assert = require('assert')
const pupa = require('pupa')

module.exports = function generateRequestPath (operation, args) {
  assert(operation.requestPath)
  assert(operation.pathParams)

  const context = operation.pathParams.reduce((ctx, paramName, i) => {
    ctx[paramName] = args[i]
    return ctx
  }, {})

  return pupa(operation.requestPath, context)
}
