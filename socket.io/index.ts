import express from 'express'
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'
import { currentRoomStatus } from './manageRoom'

import { GamesType } from './types/types'
const app = express()
const httpServer = createServer(app)
export const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
})

const games: GamesType = {
  '1': { gameScore: [''], gameStatus: '', roomStatus: 0, playerX: '', playerO: '' },
}

interface UserInformation {
  room: string
  name: string
}

io.on('connection', (socket: Socket) => {
  console.log('A connection has been made!')

  socket.on('checkRoomAvailability', async ({ name, room }: UserInformation) => {
    console.log(name)
    let roomAvailable = true
    if (games[room] && games[room].roomStatus > 1) {
      socket.emit('showRoomFullError', true)
      roomAvailable = false
    } else {
      socket.join(room)
      await currentRoomStatus(room, games)
      console.log(games)
    }

    socket.emit('roomAvailable', roomAvailable)
  })
})

httpServer.listen(3000, () => {
  console.log('I am running')
})
