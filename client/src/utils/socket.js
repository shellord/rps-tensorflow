import { io } from 'socket.io-client'

const URL = 'http://localhost:5000'

const socket = io(URL, { autoConnect: false })

// socket.onAny((event, ...args) => {
//   console.log(event, args)
// })
socket.on('connect', () => {
  console.log('connected ' + socket.id)
})

socket.on('disconnect', (reason) => {
  console.log('diconnected ' + reason)
})
export default socket
