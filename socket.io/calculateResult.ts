import { winningPatterns } from './winningPatterns'
import { GameInformation } from './types/types'

export const calculateResult = (game: GameInformation, currentPlayer: string) => {
  const gameScore = game.gameScore
  let stateWin = null
  winningPatterns.forEach((pattern) => {
    let winningPattern = true
    pattern.forEach((digit) => {
      if (gameScore[digit] !== currentPlayer) {
        winningPattern = false
      }
    })

    if (winningPattern) {
      stateWin = true
    }
  })

  const gameComplete = !gameScore.includes('_')
  if (stateWin) {
    game.gameStatus = ['Won', currentPlayer]
  } else if (gameComplete) {
    game.gameStatus = ['Draw']
  } else {
    return
  }
}
