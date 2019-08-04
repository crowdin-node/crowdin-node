const { paramCase } = require('change-case')
const yaml = require('js-yaml')

module.exports = class Operation {
  constructor (verb, requestPath, props) {
    const defaultProps = {
      parameters: []
    }
    Object.assign(this, { verb, requestPath }, defaultProps, props)

    // remove redundant `api.` prefix from operation ID
    this.operationId = this.operationId.replace(/^api\./, '')

    return this
  }

  get id () {
    return this.operationId
  }

  get pathParams () {
    return this.parameters
      .filter(parameter => parameter.in === 'path')
      .map(parameter => parameter.name)
  }

  get queryParams () {
    return this.parameters
      .filter(parameter => parameter.in === 'query')
      .map(parameter => parameter.name)
  }

  get signature () {
    const params = [...this.pathParams]
    if (this.queryParams.length) params.push('[options]')
    return `(${params.join(', ')})`
  }

  get fullSignature () {
    return [this.id, this.signature].join('')
  }

  get slug () {
    return paramCase(this.id)
  }

  get yamlizedParameters () {
    return yaml.safeDump(this.parameters)
  }
}
