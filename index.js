const core = require('@actions/core')
const createGacFile = require('./adc.js')
const data = require('./data.js')


main().catch(handleError)

async function main () {
  // inputs defined in action metadata file
  const path   = core.getInput('path', { required: true })
  const key    = core.getInput('key', { required: true })
  const value  = core.getInput('value')
  const read   = value === ""

  core.debug("Creating GAC file")
  const keyFilename = createGacFile(core.getInput('firebaseServiceAccount'))
  core.debug(`Successfully created GAC file at: ${keyFilename}`)

  core.debug("Setting/getting Firestore data")
  const out = await data(keyFilename, path, key, value, read)
  core.debug(`Successfully set/get Firestore data: ${out}`)

  core.setOutput("value", out)
}

function handleError (error) {
  core.setFailed(error.message)
}
