const knex = require('../service/knex')
const router = module.exports = require('express').Router()

router.get('/', (req, res) => {
  knex('locations').then(docs => {
    res.render('locations', { docs })
  })
})

router.get('/locations/:id', (req, res) => {
  knex('locations')
    .select('name')
    .sum('duration')
    .leftJoin('sessions', 'locations.id', 'sessions.locationId')
    .leftJoin('areas', 'areas.sessionId', 'sessions.sessionId')
    .where('locations.id', req.params.id)
    .groupBy('name')
    .then(docs => {
      res.render('areas', { docs })
    })
})
