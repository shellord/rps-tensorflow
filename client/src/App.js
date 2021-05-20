import socket from './utils/socket'

const App = () => {
  const createGame = () => {
    socket.connect()
    socket.emit('createRoom')
    socket.once('roomId', (roomId) => {
      console.log(roomId)
    })
  }

  return (
    <div className="App">
      <button onClick={createGame}>Create Room</button>
    </div>
  )
}

export default App
