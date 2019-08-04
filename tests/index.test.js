const { isPlainObject } = require('lodash')
require('make-promises-safe')
const nock = require('nock')

const Crowdin = require('..')
const client = Crowdin({ key: 'mykey' })

// disallow all network access
nock.disableNetConnect()

describe('module', () => {
  test('exports a function for instantiating a client', () => {
    expect(typeof Crowdin).toBe('function')
  })
})

describe('client', () => {
  test('is an object', async () => {
    expect(isPlainObject(client)).toBe(true)
  })

  test('requires an API key', () => {
    expect(() => {
      Crowdin()
    }).toThrow('Missing required option: `key`')
  })

  test('attaches key to client object', async () => {
    expect(typeof client.config.key).toBe('string')
  })

  test('client.api.project.branches.getMany() works', async () => {
    const mock = nock('https://api.crowdin.com')
      .get('/projects/myProjectId/branches')
      .query({ key: 'mykey' })
      .reply(200)

    const result = await client.api.projects.branches.getMany('myProjectId')

    expect(mock.isDone()).toBe(true)
    expect(result.statusCode).toBe(200)
  })

  test.skip('client.api.projects.branches throws an error with invalid arguments', async () => {
    try {
      await client.api.projects.branches.getMany()
    } catch (err) {
      expect(err).toEqual({
        error: 'Foobar'
      })
    }
  })
})
