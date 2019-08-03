module.exports = function getOperations (schema) {
  const operations = []

  for (const [requestPath, operationsAtPath] of Object.entries(schema.paths)) {
    for (const [verb, operation] of Object.entries(operationsAtPath)) {
      if (operation.operationId.includes('\\')) continue

      operation.verb = verb
      operation.requestPath = requestPath
      operation.operationId = operation.operationId
        .replace(/^api\./, '')
        .replace('pre-translates', 'preTranslates')

      operation.parameters = operation.parameters || []

      operation.pathParams = operation.parameters
        .filter(parameter => parameter.in === 'path')
        .map(parameter => parameter.name)

      operation.queryParams = operation.parameters
        .filter(parameter => parameter.in === 'query')
        .map(parameter => parameter.name)

      // Derive method arguments and signature based on defined path and query parameters
      // if (queryParams.length) operation.requiredArguments.push('[options]')
      // operation.signature = `(${operation.requiredArguments.join(', ')})`

      operations.push(operation)
    }
  }

  return operations
}
