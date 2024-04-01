import React, { useState, useEffect } from 'react'
import { socket } from '..'

export const Lobby = () => {
  const [userData, setUserData] = useState({ name: '', roomNumber: '' })
  const [errorMessage, setErrorMessage] = useState('')

  const joinRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      socket.emit('checkRoomAvailability', { name: userData.name, room: userData.roomNumber })
      console.log('I have run!')
    } catch {
      setErrorMessage('Looks like something went wrong, please try again')
    }
  }

  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.id)
    })

    socket.on('roomAvailable', (isAvailable) => {
      console.log(isAvailable + 'has run on lobby page')
      if (!isAvailable) {
        setErrorMessage('Looks like that room is full, please try another room!')
      }
    })
  }, [])

  return (
    <form
      onSubmit={(e) => {
        joinRoom(e)
      }}
    >
      <label htmlFor="name">Please enter your name</label>
      <input
        id="name"
        name="name"
        value={userData.name}
        onChange={(e) => {
          setUserData((data) => {
            return { ...data, name: e.target.value }
          })
        }}
        type="text"
      />

      <label htmlFor="room-number">Please enter a room number</label>
      <input
        id="room-number"
        name="room-number"
        value={userData.roomNumber}
        required
        onChange={(e) => {
          setUserData((data) => {
            return { ...data, roomNumber: e.target.value }
          })
        }}
        type="text"
      />

      <button className="text-button" type="submit">Join room</button>

      {errorMessage && <p>{errorMessage}</p>}
    </form>
  )
}
