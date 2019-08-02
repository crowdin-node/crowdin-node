const { isPlainObject } = require('lodash')
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

  test.skip('getProjectDetails', async () => {
    const details = await client.getProjectDetails('a_project')
    console.log(details)
    //   expect(details).toBe()
  })
})
