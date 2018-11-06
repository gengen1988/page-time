require('./init/nconf')
const io = require('./service/io')
const app = require('./service/express')

io.on('connection', require('./socket/page-time'))
app.use(require('./router/location'))
