const got = require('got')
const assert = require('assert')

const operations = [
  {
    name: 'addFile',
    path: '/api/project/{project-identifier}/add-file?key={project-key}',
    verb: 'post'
  },
  {
    name: 'getProjectDetails',
    path: '/api/project/{projectIdentifier}/info',
    verb: 'post', 
    params: [
      {
        name: 'projectIdentifier',
        in: 'path',
        required: true
      },
      {
        name: 'key',
        in: 'query', 
        required: true
      }
    ]
  }
]

const operate = async function operate () {
  console.log('Hello operator!')
  console.log(this)
  // validate arguments object
  // construct a path
  // make a request with request path + verb
  // return data
}

module.exports = function (opts = {}) {
  // set a default host name
  assert(opts.key && opts.key.length, 'Missing required key.')
  const client = {}
  client.key = opts.key
  operations.forEach(operation => {
    client[operation.name] = operate.bind(operation)
  })
  return client
}
