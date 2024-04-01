import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { Lobby } from './pages/Lobby'
import { Game } from './pages/Game'
import { io } from 'socket.io-client'

import './styles/global.css'

const URL = 'http://localhost:3000'
export const socket = io(URL)
const Index: React.FC = () => {
  const [showGame, setShowGame] = useState(false)

  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.id)
    })
    socket.on('roomAvailable', (roomAvailable) => {
      setShowGame(roomAvailable)
    })
  }, [])
  return (
    <>
      <header>
        <h1>Welcome to Tiktaktoe</h1>
      </header>
      <main>{showGame ? <Game /> : <Lobby />}</main>
    </>
  )
}

const rootElement = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(rootElement)

root.render(<Index />)
