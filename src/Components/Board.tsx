import React, { useState } from 'react'
import Circle from '../assets/circle.png'
import Cross from '../assets/cross.png'

export const Board = () => {
  const [gameStatus, setGameStatus] = useState(Array(9).fill(null))

  const [currentPlayer, setCurrentPlayer] = useState('X')

  const updateGameBoard = (square: number, player: string) => {
    setGameStatus((currentStatus) => {
      const updatedList = [...currentStatus]
      updatedList[square] = player
      return updatedList
    })
    setCurrentPlayer((current) => (current === 'X' ? 'O' : 'X'))
  }
  return (
    <div className="board">
      {gameStatus.map((_, index) => {
        return (
          <div
            className="square"
            key={index}
            onClick={() => {
              updateGameBoard(index, currentPlayer)
            }}
          >
            {gameStatus[index] === 'X' ? (
              <img src={Cross} />
            ) : gameStatus[index] === 'O' ? (
              <img src={Circle} />
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
