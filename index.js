const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const PORT = 5000

app.use(express.static(__dirname))

server.listen(PORT, () => {
  console.log(`listen ${PORT}`);
})

let socketStore = {}

function getSocketStore(id) {
  socketStore[id] = socketStore[id] || {
    latestEvent: [],
    duration: {},
    latestEventTime: {}
  }
  return socketStore[id]
}

function updateStore(store, name) {
  store.duration[name] = store.duration[name] || 0
  store.duration[name] += Date.now() - store.latestEventTime[name]
}

io.on('connection', socket => {
  console.log('connect')

  socket.on('disconnect', reason => {
    const store = getSocketStore(socket.id)
    store.latestEvent.forEach(name => {
      updateStore(store, name)
    })
    console.log(socketStore)
  })

  socket.on('scroll', cls => {
    console.log('scroll:', cls)
    const store = getSocketStore(socket.id)

    // update on exit
    store.latestEvent.forEach(name => {
      if (!cls.includes(name)) {
        updateStore(store, name)
      }
    })

    // update in area
    cls.forEach(name => {
      if (store.latestEvent.includes(name)) {
        updateStore(store, name)
      }
      store.latestEventTime[name] = Date.now()
    })

    store.latestEvent = cls
  })
})
