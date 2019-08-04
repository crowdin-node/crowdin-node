#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const handlebars = require('handlebars')

const getSchema = require('../lib/get-schema')
const getOperations = require('../lib/get-operations')
const schemaVersions = ['v1', 'v2']
const docsPath = path.join(__dirname, '../docs')

const template = `
# Crowdin API {{schemaVersion}}

## Operations

{{#each operations}}
- [{{fullSignature}}](#{{slug}})
{{/each}}

{{#each operations}}
<a id="{{slug}}">
  <h2>{{fullSignature}}</h2>
</a>

> {{summary}}

**Parameters**

\`\`\`yml
{{yamlizedParameters}}
\`\`\`

{{/each}}
`

schemaVersions.forEach(schemaVersion => {
  const outfile = path.join(docsPath, `${schemaVersion}.md`)
  const schema = getSchema(schemaVersion)
  const operations = getOperations(schema)
  const output = handlebars.compile(template)({ schemaVersion, operations })
  fs.writeFileSync(outfile, output)
})
