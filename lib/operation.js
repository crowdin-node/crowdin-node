const { paramCase } = require('change-case')
const { isPlainObject, get } = require('lodash')

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

  get validPathParams () {
    return this.parameters
      .filter(parameter => parameter.in === 'path')
      .map(parameter => parameter.name)
  }

  get validQueryParams () {
    return this.parameters
      .filter(parameter => parameter.in === 'query')
      .map(parameter => parameter.name)
  }

  get validBodyParams () {
    const props = get(this, 'requestBody.content.application/json.schema.properties')
    return isPlainObject(props) ? Object.keys(props) : []
  }

  get signature () {
    const params = [...this.validPathParams]
    if (this.validQueryParams.length) params.push('[options]')
    return `(${params.join(', ')})`
  }

  get fullSignature () {
    return [this.id, this.signature].join('')
  }

  get slug () {
    return paramCase(this.id)
  }
}
