// require dotenv 
const { isPlainObject } = require('lodash')
const client = require('..')(
  { key: 'mykey' }
)

describe('crowdin client', () => {
  test('it is an object', async () => {
    expect(isPlainObject(client)).toBe(true)
  })

  test('getProjectDetails', async () => {
    const details = await client.getProjectDetails('a_project')
    console.log(details)
    //   expect(details).toBe()
  })

  test('has key', async () => {
    expect(typeof client.key).toBe('string')
  })
})
