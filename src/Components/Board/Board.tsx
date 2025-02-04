import React, { useState, useEffect } from 'react'

import Circle from '../../assets/circle.png'
import Cross from '../../assets/cross.png'

import { socket } from '../..'

export type BoardTypes = {
  gameResult: Array<string>
  setGameResult: React.Dispatch<React.SetStateAction<Array<string>>>
}

export const Board: React.FC<BoardTypes> = ({ gameResult, setGameResult }) => {
  const [gameScore, setGameScore] = useState(Array(9).fill('_'))
  const [currentPlayer, setCurrentPlayer] = useState('X')

  // stores player info to map onto room object on the server
  const player = sessionStorage.getItem('player')
  const room = sessionStorage.getItem('room')

  const isCurrentPlayer = player === currentPlayer

  // sends square selected and player details to the server when are square is selected
  const playMade = (square: number) => {
    socket.emit('playMade', { square: square, player: currentPlayer, room: room })
  }

  useEffect(() => {
    socket.on('gameStarted', () => {
      setGameResult(['Started'])
      console.log('received result')
    })
    socket.on('gameInfo', (data) => {
      const player = data.player
      const room = data.room
      sessionStorage.setItem('player', player)
      sessionStorage.setItem('room', room)
    })

    socket.on('gameResults', ({ gameScore, gameStatus }) => {
      console.log(gameScore)
      setGameScore(gameScore)
      setGameResult(gameStatus)

      if (gameStatus === 'Started') {
        setCurrentPlayer((current) => (current === 'X' ? 'O' : 'X'))
      }
    })




    return () => {
      socket.off('connect')

      socket.off('gameInfo')
    }
  }, [])

  return (
    <div data-result={gameResult} data-can-play={isCurrentPlayer} className="board">
      {gameScore.map((_, index) => {
        return (
          <div
            className="square"
            data-player={currentPlayer}
            tabIndex={0}
            key={index}
            onClick={() => {
              playMade(index)
            }}
          >
            {gameScore[index] === 'X' ? (
              <img src={Cross} alt="Cross" />
            ) : gameScore[index] === 'O' ? (
              <img src={Circle} alt="Naught" />
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
