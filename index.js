const {Firestore} = require('@google-cloud/firestore')
const core = require('@actions/core')
// const github = require('@actions/github')

const createGacFile = require('./adc.js')

const projectId = process.env['GCLOUD_PROJECT']

const keyFilename = createGacFile(core.getInput('firebaseServiceAccount'))


const firestore = new Firestore({ projectId, keyFilename })


main().catch(handleError)

async function main () {
  // inputs defined in action metadata file
  const path   = core.getInput('path', { required: true })
  const key    = core.getInput('key', { required: true })
  const value  = core.getInput('value')
  const read   = value === ""

  const document = firestore.doc(path)

  if (!read) {
    await document.set({
      [key]: value
    }, { merge: true })
  }

  const doc = await document.get()
  const data = doc.data()

  core.setOutput("value", data[key])
}

function handleError (error) {
  core.setFailed(error.message)
}
