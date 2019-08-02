// This module exports a generic function for making HTTP requests.
// Each schema operation object is bound to this function

// const got = require('got')
const assert = require('assert')

module.exports = async function operate (...args) {
  // console.log(args)
  // console.log(this.requiredArguments)
  // assert(args.length === this.requiredArguments.length, `Invalid request. Expected arguments: ${this.signature}`)
  if (!args.length === this.requiredArguments.length) {
    throw new Error(`Invalid request. Expected arguments: ${this.requiredArguments}`)
  }
  for (let arg of args) {

  }
}
