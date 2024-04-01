import { io } from '.'
import { GamesType } from './types/types'
export const addGame = () => {}

export const currentRoomStatus = async (roomNumber: string, game: GamesType) => {
  const socketsInRoomObj = await io.in(roomNumber).fetchSockets()

  const socketInRoomArray = socketsInRoomObj.map((socket) => socket.id)
  const roomOccupancy = socketInRoomArray.length
  if (roomOccupancy > 1) {
    game[roomNumber].roomStatus = roomOccupancy
  } else {
    game[roomNumber] = {
      gameScore: [''],
      gameStatus: '',
      roomStatus: roomOccupancy,
      playerX: '',
      playerO: '',
    }
  }
}
