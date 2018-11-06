require('./src/init/nconf')
const nconf = require('nconf')

module.exports = nconf.get('knex')
