import { io } from '.'
import { GamesType } from './types/types'

const randomPlayerTypeSelector = () => {
  const playerOptions = ['X', 'O']
  const selectPlayerOptionRandom = playerOptions[Math.floor(Math.random() * 2)]
  console.log(selectPlayerOptionRandom)
  return selectPlayerOptionRandom
}

export const updateRoomStatus = async (roomNumber: string, game: GamesType, id: string) => {
  const socketsInRoomObj = await io.in(roomNumber).fetchSockets()

  //retrieves an array of all the players in the room
  const socketInRoomArray = socketsInRoomObj.map((socket) => socket.id)
  //calculates number of players
  const roomOccupancy = socketInRoomArray.length

  if (roomOccupancy > 1) {
    let assignedPlayer = null
    const gameRoomData = game[roomNumber]
    gameRoomData.roomStatus = roomOccupancy
    gameRoomData.gameStatus = 'Started'
    // other player already had their player role randomly assigned so the current player only has one option. This adds the player role to the games object
    if (gameRoomData.X) {
      gameRoomData.O = id
      assignedPlayer = 'O'
    } else {
      gameRoomData.X = id
      assignedPlayer = 'X'
    }

    return assignedPlayer
  } else {
    game[roomNumber] = {
      gameScore: Array(9).fill('_'),
      gameStatus: 'Not started',
      roomStatus: roomOccupancy,
      X: '',
      O: '',
    }
    const gameRoomData = game[roomNumber]
    const randomlyAssignedPlayer = randomPlayerTypeSelector()
    gameRoomData[randomlyAssignedPlayer] = id
    return randomlyAssignedPlayer
  }
}
