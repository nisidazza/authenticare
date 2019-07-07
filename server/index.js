const hash = require('./hash')
const token = require('./token')
const routes = require('./routes')

module.exports = function (options) {
  return {
    decodeToken: token.decode.bind(null, options),
    applyAuthRoutes: routes.applyAuthRoutes.bind(null, options),
    generateHash: hash.generate.bind(null, options),
    verifyHash: hash.verify.bind(null, options)
  }
}
