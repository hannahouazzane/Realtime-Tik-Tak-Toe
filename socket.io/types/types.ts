export interface GameInformation {
  gameScore: string[]
  gameStatus: string | string[]
  roomStatus: number
  player1: string
  player2: string
}

export interface UserInformation {
  room: string
  name: string
}

export type GamesType = Record<string, GameInformation>
export type UserType = Record<string, UserInformation>
