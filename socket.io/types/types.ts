export interface GameInformation {
  gameScore: string[]
  gameStatus: string | string[]
  roomStatus: number
  X: string
  O: string
}

export interface PlayerInformation {
  room: string
  name: string
  player: string
}

export type GamesType = Record<string, GameInformation>
export type PlayerType = Map<string, PlayerInformation>
