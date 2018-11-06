exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('sessions', function (t) {
      t.increments()
      t.string('sessionId')
      t.string('locationId')
      t.timestamp('start')
      t.timestamp('end')
    }),
    knex.schema.createTable('areas', function (t) {
      t.increments()
      t.string('sessionId')
      t.string('name')
      t.integer('duration')
    }),
    knex.schema.createTable('locations', function (t) {
      t.increments()
      t.string('location')
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('sessions'),
    knex.schema.dropTable('areas')
  ])
}
