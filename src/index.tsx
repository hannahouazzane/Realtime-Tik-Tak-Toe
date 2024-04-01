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

      //checks to see if there are player details from prior games
      const player = sessionStorage.getItem('player')
      const room = sessionStorage.getItem('room')
   
      //if so removes these details
      if(player && room) {
       sessionStorage.removeItem('player')
       sessionStorage.removeItem('room')
 
      }
    })
    // if the entered room is available set the showGame state to true to display the game board
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
