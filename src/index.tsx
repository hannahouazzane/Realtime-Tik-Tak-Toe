import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { Board } from './Components/Board'
import './styles/global.css'
import DialogBox from './Components/DialogBox/DialogBox'
const App: React.FC = () => {
  const [result, setResult] = useState(['Pending'])

  return (
    <>
      <header>
        <h1>Welcome to Tiktaktoe</h1>
      </header>
      <main>
        <Board gameResult={result} setGameResult={setResult} />
        <DialogBox result={result} />
      </main>
    </>
  )
}

const rootElement = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(rootElement)

root.render(<App />)
