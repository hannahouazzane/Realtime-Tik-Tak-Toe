import express from 'express'
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'
import { updateRoomStatus } from './manageRoom'
import { calculateResult } from './calculateResult'
import { GamesType } from './types/types'
const app = express()
const httpServer = createServer(app)
export const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
})

const games: GamesType = {
  '1': { gameScore: Array(9).fill('_'), gameStatus: '', roomStatus: 0, player1: '', player2: '' },
}

interface UserInformation {
  room: string
  name: string
}

io.on('connection', (socket: Socket) => {
  socket.on('checkRoomAvailability', async ({ name, room }: UserInformation) => {
    console.log(name)
    let roomAvailable = true
    let player = ''

    if (games[room] && games[room].roomStatus > 1) {
      roomAvailable = false
    } else {
      socket.join(room)
      player = await updateRoomStatus(room, games)
      console.log(player)
    }

    const gameStatus = games[room].gameStatus
    console.log(gameStatus)
    socket.emit('roomAvailable', { roomAvailable: roomAvailable })
    console.log(player)
    console.log(games[room])
    socket.emit('gameInfo', { player: player, room: room })
    if (gameStatus === 'Started') {
      io.to(room).emit('gameStarted')
    }
  })

  socket.on('playMade', ({ square, player, room }) => {
    games[room].gameScore[square] = player

    const gameData = games[room]
    calculateResult(gameData, player)

    console.log(gameData.gameStatus)

    io.to(room).emit('gameResults', {
      gameScore: gameData.gameScore,
      gameStatus: gameData.gameStatus,
    })
  })
})

httpServer.listen(3000, () => {
  console.log('I am running')
})
