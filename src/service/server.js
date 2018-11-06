const nconf = require('nconf')
const app = require('./express')

const server = module.exports = require('http').Server(app)

const PORT = nconf.get('port')

server.listen(PORT, () => {
  console.log(`listen ${PORT}`);
})
