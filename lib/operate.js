// This module exports a generic function for making HTTP requests.
// Each schema operation object is bound to this function

// const got = require('got')

module.exports = async function operate () {
  console.log('arguments', arguments)
  console.log('operate', this)
}
