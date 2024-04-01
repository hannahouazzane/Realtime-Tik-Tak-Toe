import express from 'express'
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'
import { updateRoomStatus } from './manageRoom'
import { calculateResult } from './calculateResult'
import { GamesType, PlayerType } from './types/types'
const app = express()
const httpServer = createServer(app)
export const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
})

const games: GamesType = {}
const Players: PlayerType = new Map()

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
      player = await updateRoomStatus(room, games, socket.id)
      console.log(player)
      Players.set(socket.id, { name: name, room: room, player: player })
      console.log(Players)
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
    console.log(square)
    console.log(games[room].gameScore)
    console.log(games)
    games[room].gameScore[square] = player

    const gameData = games[room]
    calculateResult(gameData, player)

    console.log(gameData.gameStatus)
    console.log('i have run with the scores')
    io.to(room).emit('gameResults', {
      gameScore: gameData.gameScore,
      gameStatus: gameData.gameStatus,
    })
  })

  socket.on('disconnect', () => {
    const userData = Players.get(socket.id)

    if (userData) {
      const player = userData.player
      const room = userData.room
      console.log(socket.id)
      games[room][player] = ''
      const currentStatus = games[room]['roomStatus']
      games[room]['roomStatus'] = currentStatus - 1
      Players.delete(socket.id)
      console.log(Players)
      console.log(games)
      socket.emit('disconnected')
    }
  })
})

httpServer.listen(3000, () => {
  console.log('I am running')
})
