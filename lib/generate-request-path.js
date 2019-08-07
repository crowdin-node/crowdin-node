const assert = require('assert')
const pupa = require('pupa')

// Given an operation object and arguments to run that operation, generate a URL path
// by injecting the arguments into the requestPath template from the schema

module.exports = function generateRequestPath (operation, suppliedArguments) {
  assert(operation.requestPath)
  assert(operation.pathParams)

  const context = operation.pathParams.reduce((ctx, paramName, i) => {
    ctx[paramName] = suppliedArguments[i]
    return ctx
  }, {})

  return pupa(operation.requestPath, context)
}
