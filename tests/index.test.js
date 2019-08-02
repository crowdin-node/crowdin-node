const { isPlainObject } = require('lodash')
require('make-promises-safe')
// const nock = require('nock')

const Crowdin = require('..')
const client = Crowdin({ key: 'mykey' })

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
    expect(typeof client.key).toBe('string')
  })

  test('client.project.branches.getMany works', async () =>{
    const result = await client.projects.branches.getMany('myProjectId')
    expect(result.statusCode).toBe(200)
  })

  test.skip('client.projects.branches throws an error with invalid arguments', async () => {
    try {
      await client.projects.branches.getMany()
    } catch (err){
      expect(err).toEqual({
        error: 'Foobar'
      })
    }

    //   expect(details).toBe()
  })
})
