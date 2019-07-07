const request = require('./request')
const { signInUrl, registerUrl } = require('../endpoints')
const defaultOptions = require('./default-options')

const {
  logOff,
  getAuthToken,
  isAuthenticated,
  getEncodedToken } = require('./auth')

module.exports = function (options) {
  const opts = { ...defaultOptions, options }

  return {
    signIn: opts.signIn || signIn.bind(null, opts),
    logOff: opts.logOff || logOff.bind(null, opts),
    register: opts.register || register.bind(null, opts),
    isAuthenticated: opts.isAuthenticated || isAuthenticated.bind(null, opts),
    getEncodedToken: opts.getAuthToken || getEncodedToken.bind(null, opts),
    getToken: opts.getToken || getAuthToken.bind(null, opts)
  }
}

function register (options, newUser) {
  const baseUrl = options && options.baseUrl
  const url = `${baseUrl || ''}${registerUrl}`
  return request(url, newUser)
}

function signIn (options, user) {
  const baseUrl = options && options.baseUrl
  const url = `${baseUrl || ''}${signInUrl}`
  return request(url, user)
}
