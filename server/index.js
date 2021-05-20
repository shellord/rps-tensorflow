import { createServer } from 'http'
import { Server } from 'socket.io'

const httpServer = createServer()
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

const rooms = {}

io.on('connection', (socket) => {
  console.log(socket.id + ' has connected')

  socket.on('disconnect', () => {
    console.log(socket.id + ' has disconnected')
  })

  socket.on('createRoom', () => {
    const roomid = Math.floor(Math.random() * (9999 - 1111) + 1111)
    socket.emit('roomId', roomid)
    socket.join(roomid)
    rooms[roomid] = { player1: socket.id, p1option: null }
    console.log(socket.id + ' has created the room ' + roomid)
  })
  socket.on('joinRoom', (roomid) => {
    socket.join(roomid)
    rooms[roomid].player2 = socket.id
    rooms[roomid].p2option = null
    socket.emit('player2Joined', rooms[roomid].player1)
    socket.to(roomid).emit('player2Joined', socket.id)
    console.log(socket.id + ' has joined room ' + roomid)
  })

  socket.on('option', ({ roomid, option }) => {
    rooms[roomid].player1 === socket.id
      ? (rooms[roomid].p1option = option)
      : (rooms[roomid].p2option = option)
    if (rooms[roomid].p1option !== null && rooms[roomid].p2option !== null) {
      let result = bestOption(rooms[roomid].p1option, rooms[roomid].p2option)
      result === 1
        ? io.sockets.to(roomid).emit('result', rooms[roomid].player1)
        : result === 2
        ? io.sockets.to(roomid).emit('result', rooms[roomid].player2)
        : 'draw'
      rooms[roomid].p1option = null
      rooms[roomid].p2option = null
    }
  })

  const bestOption = (option1, option2) =>
    option1 === option2
      ? 0
      : option1 === 0 && option2 === 1
      ? 2
      : option1 === 1 && option2 === 2
      ? 2
      : option1 === 2 && option2 === 0
      ? 2
      : 1
})

httpServer.listen(5000, () =>
  console.log('Server running at http://localhost:5000')
)
