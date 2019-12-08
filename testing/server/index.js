const server = require('../../server')
const testSecret = require('./testSecret')
const createTestToken = require('./createTestToken')
const getTokenDecoder = require('./getTokenDecoder')

let isAuthorized = true
let tokenToUse = {}

module.exports = {
  ...server,
  testSecret,
  createTestToken,
  useToken: (isAllowed, token) => {
    isAuthorized = isAllowed
    tokenToUse = token
    console.log('isAuthorized / token:', isAuthorized, '/', tokenToUse)
  },
  getTokenDecoder: isTokenRequired => getTokenDecoder(isTokenRequired, isAuthorized, tokenToUse)
}

