const {Firestore} = require('@google-cloud/firestore')


const projectId = process.env['GCLOUD_PROJECT']


module.exports = async function (keyFilename, path, key, value, read) {
  const firestore = new Firestore({ projectId, keyFilename })

  const document = firestore.doc(path)

  if (!read) {
    await document.set({
      [key]: value
    }, { merge: true })
  }

  const doc = await document.get()
  const data = doc.data()

  return data[key]
}