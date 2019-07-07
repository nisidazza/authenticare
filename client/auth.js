const decode = require('./decode')

const { saveToken, getToken: getEncodedToken } = require('./token-storage')

module.exports = {
  logOff,
  getAuthToken,
  saveAuthToken,
  isAuthenticated,
  getEncodedToken
}

function isAuthenticated () {
  const authToken = getEncodedToken()

  if (authToken) {
    const payload = decode(authToken)
    const expiry = payload.exp

    if (expiry < new Date().getTime() / 1000) {
      logOff()
      return false
    }
    return true
  } else {
    return false
  }
}

function saveAuthToken (authToken) {
  saveToken(authToken)
  return decode(authToken)
}

function getAuthToken () {
  const authToken = getEncodedToken()
  return authToken ? decode(authToken) : null
}

function logOff () {
  saveToken(null)
}
