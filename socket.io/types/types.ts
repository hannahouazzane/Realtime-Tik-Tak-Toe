interface GameInformation {
  gameScore: string[]
  gameStatus: string
  roomStatus: number
  playerX: string
  playerO: string
}

export type GamesType = Record<string, GameInformation>
