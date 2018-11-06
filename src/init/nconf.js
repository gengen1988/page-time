const nconf = require('nconf')

nconf.env()
nconf.defaults({
  port: 5000,
  knex: {
    // debug: true,
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    useNullAsDefault: true
  }
})
