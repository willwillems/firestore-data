const { fileSync } = require("tmp")
const { writeSync } = require("fs")

// Set up Google Application Credentials for use by the Firebase CLI
// https://cloud.google.com/docs/authentication/production#finding_credentials_automatically
module.exports = function createGacFile(googleApplicationCredentials) {
  const tmpFile = fileSync({ postfix: ".json" })

  writeSync(tmpFile.fd, googleApplicationCredentials)

  return tmpFile.name
}
