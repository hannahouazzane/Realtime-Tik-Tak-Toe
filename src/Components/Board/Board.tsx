import React, { useState, useEffect } from 'react'
import Circle from '../assets/circle.png'
import Cross from '../assets/cross.png'

export type BoardTypes = {
  gameResult: Array<string>
  setGameResult: React.Dispatch<React.SetStateAction<Array<string>>>
}
export const Board: React.FC<BoardTypes> = ({ gameResult, setGameResult }) => {
  const [gameStatus, setGameStatus] = useState(Array(9).fill('_'))

  const [currentPlayer, setCurrentPlayer] = useState('X')

  const updateGameBoard = (square: number, player: string) => {
    setGameStatus((currentStatus) => {
      const updatedList = [...currentStatus]
      updatedList[square] = player

      return updatedList
    })
  }

  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  const hasWon = (gameStatus: Array<string>, currentPlayer: string) => {
    let stateWin = null
    winningPatterns.forEach((pattern) => {
      let winningPattern = true
      pattern.forEach((digit) => {
        if (gameStatus[digit] !== currentPlayer) {
          winningPattern = false
        }
      })

      if (winningPattern) {
        stateWin = true
      }
    })

    return stateWin
  }

  const isGameOver = (gameStatus: Array<string>, currentPlayer: string) => {
    const gameIncomplete = gameStatus.includes('_')
    if (hasWon(gameStatus, currentPlayer)) {
      setGameResult(['Won', currentPlayer])
    } else if (gameIncomplete) {
      return
    } else {
      setGameResult(['Draw'])
    }
  }

  useEffect(() => {
    isGameOver(gameStatus, currentPlayer)

    const gameStarted = gameStatus.some((item) => item !== '_')

    if (gameStarted) {
      setCurrentPlayer((current) => (current === 'X' ? 'O' : 'X'))
    }
  }, [gameStatus])

  return (
    <div data-result={gameResult} className="board">
      {gameStatus.map((_, index) => {
        return (
          <div
            className="square"
            data-player={currentPlayer}
            tabIndex={0}
            key={index}
            onClick={() => {
              updateGameBoard(index, currentPlayer)
            }}
          >
            {gameStatus[index] === 'X' ? (
              <img src={Cross} alt="Cross" />
            ) : gameStatus[index] === 'O' ? (
              <img src={Circle} alt="Naught" />
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
