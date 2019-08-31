// This module exports a generic function for making HTTP requests.
// Each schema operation object is bound to this function

const got = require('got')
const URL = require('url')
const FormData = require('form-data')
const pkg = require('../package.json')
const generateRequestPath = require('./generate-request-path')
const { isPlainObject, last, pick } = require('lodash')

module.exports = async function operate (...args) {
  const defaultOpts = {
    // Crowdin responds with XML by default. JSON is preferable.
    json: true
  }

  // pop options object off the args
  const opts = isPlainObject(last(args)) ? args.pop() : {}

  // TODO: validate input
  // assert(args.length === this.requiredArguments.length, `Invalid request. Expected arguments: ${this.signature}`)

  const query = pick(opts, this.queryParamNames)

  const url = URL.format({
    protocol: 'https',
    hostname: this.clientConfig.hostname,
    pathname: generateRequestPath(this, args),
    query: Object.assign({}, defaultOpts, query, { key: this.clientConfig.key })
  })

  const body = generateFormBody(this, opts)

  const headers = {
    'user-agent': `${pkg.name}@${pkg.version} (https://ghub.io/${pkg.name})`
  }

  try {
    switch (this.verb) {
      case 'get':
      case 'head':
        return got.get(url, { json: true, headers })
      case 'post':
      case 'put':
        return got[this.verb](url, { body, headers })
      default:
        console.log(`${this.verb} HTTP method not yet supported:`)
    }
  } catch (error) {
    console.error('error making request')
    console.error(error)
  }
}

function generateFormBody (operation, opts) {
  // build object of valid body params
  const body = pick(opts, operation.bodyParamNames)

  const form = new FormData()

  if (body.files) {
    Object.keys(body.files).forEach(filename => {
      form.append(`files[${filename}]`, Buffer.from(body.files[filename]), filename)
    })
    delete body.files
  }

  return form
}
