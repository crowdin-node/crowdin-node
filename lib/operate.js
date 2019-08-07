// This module exports a generic function for making HTTP requests.
// Each schema operation object is bound to this function

const got = require('got')
const URL = require('url')
const generateRequestPath = require('./generate-request-path')
const { isPlainObject, last } = require('lodash')

module.exports = async function operate (...args) {
  // pop options object off the args
  const opts = isPlainObject(last(args)) ? args.pop() : {}

  // TODO: validate input
  // assert(args.length === this.requiredArguments.length, `Invalid request. Expected arguments: ${this.signature}`)

  const url = URL.format({
    protocol: 'https',
    hostname: this.clientConfig.hostname,
    pathname: generateRequestPath(this, args),
    query: Object.assign({}, opts, { key: this.clientConfig.key })
  })

  return got[this.verb](url)
}
