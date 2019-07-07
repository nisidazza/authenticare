const config = require('package-json-config')

const server = require('./server')
const client = require('./client')
const testing = require('./testing')

const options = config.get('authenticare')

module.exports = {
  server: server.bind(null, options),
  client: client.bind(null, options),
  testing: testing.bind(null, options)
}
