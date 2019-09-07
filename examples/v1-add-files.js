
require('dotenv-safe').config()

const assert = require('assert')
const { CROWDIN_API_KEY, CROWDIN_PROJECT_ID } = process.env

assert(CROWDIN_API_KEY, 'Create a .env file and set CROWDIN_API_KEY')
assert(CROWDIN_PROJECT_ID, 'Create a .env file and set CROWDIN_PROJECT_ID')

async function main () {
  const client = require('..')({
    schemaVersion: 'v1',
    key: CROWDIN_API_KEY
  })

  // directory must be created before files can be added
  await client.projects.directories.add(CROWDIN_PROJECT_ID, { name: 'github/some-owner/some-repo', recursive: true })

  const addFilesResult = await client.projects.files.add(CROWDIN_PROJECT_ID, {
    files: {
      'github/some-owner/some-repo/README.md': 'I am the README.',
      'github/some-owner/some-repo/config.yml': 'is_yaml: true'
    }
  })

  console.log(addFilesResult.body)

  const updateFilesResult = await client.projects.files.update(CROWDIN_PROJECT_ID, {
    files: {
      'github/some-owner/some-repo/README.md': 'I am the README (STILL).',
      'github/some-owner/some-repo/config.yml': 'is_still_yaml: true'
    }
  })

  console.log(updateFilesResult.body)
}

main()
