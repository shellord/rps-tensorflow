import { createServer } from 'http'
import { Server } from 'socket.io'

const httpServer = createServer()
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  console.log(socket.id + ' has connected')

  socket.on('disconnect', () => {
    console.log(socket.id + ' has disconnected')
  })

  socket.on('createRoom', () => {
    socket.emit('roomdId', 1234)
  })
})

httpServer.listen(5000, () =>
  console.log('Server running at http://localhost:5000')
)
