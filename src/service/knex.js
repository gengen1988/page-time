const nconf = require('nconf')
const knex = require('knex')
module.exports = knex(nconf.get('knex'))
