import React, { useState } from 'react'
import { Board } from '../Components/Board/Board'
import DialogBox from '../Components/DialogBox/DialogBox'

import '../styles/global.css'

export const Game: React.FC = () => {
  const [result, setResult] = useState(['Not started'])

  return (
    <div className="game-container">
      <Board gameResult={result} setGameResult={setResult} />
      <DialogBox result={result} />
    </div>
  )
}
