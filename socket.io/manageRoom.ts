import { io } from '.'
import { GamesType } from './types/types'

const randomPlayerTypeSelector = () => {
  const playerOptions = ['X', 'O']
  const selectPlayerOptionRandom = playerOptions[Math.floor(Math.random() * 2)]
  console.log(selectPlayerOptionRandom)
  return selectPlayerOptionRandom
}

export const updateRoomStatus = async (roomNumber: string, game: GamesType) => {
  const socketsInRoomObj = await io.in(roomNumber).fetchSockets()

  const socketInRoomArray = socketsInRoomObj.map((socket) => socket.id)
  const roomOccupancy = socketInRoomArray.length
  // add
  if (roomOccupancy > 1) {
    const gameRoomData = game[roomNumber]
    gameRoomData.roomStatus = roomOccupancy
    gameRoomData.gameStatus = 'Started'

    if (gameRoomData.player1 === 'X') {
      gameRoomData.player2 = 'O'
    } else {
      gameRoomData.player2 = 'X'
    }

    return gameRoomData.player2
  } else {
    game[roomNumber] = {
      gameScore: Array(9).fill('_'),
      gameStatus: 'Not started',
      roomStatus: roomOccupancy,
      player1: '',
      player2: '',
    }
    const gameRoomData = game[roomNumber]
    gameRoomData['player1'] = randomPlayerTypeSelector()
    return gameRoomData.player1
  }
}
