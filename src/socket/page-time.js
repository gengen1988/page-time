const createSession = require('../session')

module.exports = function (socket) {
  console.log('connect')

  const session = createSession(socket.id)

  socket.emit('location', location => {
    session.location(location)
  })

  socket.on('disconnect', reason => {
    console.log('disconnect')
    session.end()
    session.persist()
  })

  socket.on('scroll', cls => {
    session.update(cls)
  })

}
