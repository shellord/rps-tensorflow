import React, { useEffect } from 'react'
import socket from './utils/socket'

const App = () => {
  useEffect(() => {
    socket.connect()
  }, [])

  return <div className="App">sdfs</div>
}

export default App
