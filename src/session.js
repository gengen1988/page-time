const knex = require('./service/knex')

module.exports = function createSession(id) {

  const duration = {}
  const data = {
    sessionId: id,
    start: Date.now()
  }

  var prev = undefined
  var getLocationId = undefined

  return {

    location(location) {
      getLocationId = knex('locations').where({ location }).select('id')
        .then(docs => {
          if (docs.length === 0) {
            return knex('locations').insert({ location })
              .then(result => {
                return knex('locations').where({ location }).select('id')
              })
          } else {
            return docs
          }
        })
        .then(docs => {
          return docs[0].id
        })
    },

    persist() {
      const docs = getDocs(duration)
      return getLocationId.then(id => {
        console.log('location id:', id);
        data.locationId = id
        return Promise.all([
          knex('sessions').insert(data),
          knex('areas').insert(docs)
        ])
      })
    },

    update(cls) {
      if (prev) prev()
      if (cls) {
        prev = memo(cls)
      }
    },

    end() {
      if (prev) prev()
      data.end = Date.now()
    }

  }

  function getDocs(duration) {
    return Object.keys(duration).map(key => ({
      sessionId: data.sessionId,
      name: key,
      duration: duration[key]
    }))
  }

  function memo(cls) {
    const memoTime = Date.now()
    const memoCls = cls
    return function () {
      memoCls.forEach(name => {
        duration[name] = duration[name] || 0
        duration[name] += Date.now() - memoTime
      })
    }
  }

}
