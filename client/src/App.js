import { useState, useEffect } from 'react'
import socket from './utils/socket'
import './App.css'
import GestureDetector from './components/GestureDetector'

const App = () => {
  const [roomid, setRoomid] = useState(null)
  const [p2id, setP2id] = useState(null)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)
  const [enabled, setEnabled] = useState(false)
  const [option, setOption] = useState(null)

  const createGame = () => {
    socket.connect()
    socket.emit('createRoom')
    socket.once('roomId', (roomId) => {
      setRoomid(roomId)
    })
    socket.once('player2Joined', (id) => {
      setP2id(id)
    })
  }
  const quitGame = () => {
    socket.disconnect()
    setRoomid(null)
    setP2id(null)
  }
  const joinRoom = () => {
    socket.connect()
    socket.emit('joinRoom', roomid)
    socket.once('player2Joined', (id) => {
      setP2id(id)
    })
  }
  const sendOption = (option) => {
    setEnabled(false)
    socket.emit('option', { roomid, option })
    socket.once('result', (result) => {
      socket.id === result ? setResult('win') : setResult('loss')
      setEnabled(true)
    })
  }

  const onGesture = (gesture) => {
    let option = 2
    if (gesture) {
      gesture.name &&
        (option =
          gesture.name === 'rock' ? 0 : gesture.name === 'paper' ? 1 : 2)
      setOption(gesture.name)
      sendOption(option)
    }
  }

  return (
    <div className="App">
      <button onClick={createGame}>Create Room</button>
      <button onClick={quitGame}>Disconnect</button>
      <input
        placeholder="room code"
        onChange={(e) => setRoomid(parseInt(e.target.value))}
      />
      <button onClick={joinRoom}>Join Room</button>

      {roomid && (
        <>
          <div>Room Code: {roomid}</div>
          <div>Waiting for Player 2 ...</div>
          {p2id && (
            <>
              <div>Player 2 ha2 joined: {p2id}</div>
              <div>
                Choose an option:
                <button onClick={() => sendOption(0)}>rock</button>
                <button onClick={() => sendOption(1)}>paper</button>
                <button onClick={() => sendOption(2)}>scissor</button>
              </div>

              <div>{result}</div>
            </>
          )}
          <div>
            <button onClick={() => setEnabled(true)}>Enable</button>
            <button onClick={() => setEnabled(false)}>Disable</button>
          </div>
        </>
      )}
      <div>Selected Option is {option}</div>
      <GestureDetector enabled={enabled} onGesture={onGesture} />
    </div>
  )
}

export default App
