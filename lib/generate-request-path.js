const assert = require('assert')
const pupa = require('pupa')

// Given an operation object and arguments to run that operation, generate a URL path
// by injecting the arguments into the requestPath template from the schema

module.exports = function generateRequestPath (operation, suppliedArguments) {
  assert(operation.requestPath)
  assert(operation.pathParamNames)

  const context = operation.pathParamNames.reduce((ctx, paramName, i) => {
    ctx[paramName] = suppliedArguments[i]
    return ctx
  }, {})

  const requestPath = pupa(operation.requestPath, context)

  return requestPath
}
