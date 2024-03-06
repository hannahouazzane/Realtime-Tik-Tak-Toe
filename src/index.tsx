import React from 'react'
import ReactDOM from 'react-dom/client'
import { Board } from './Components/Board'
import './styles/global.css'
const App: React.FC = () => {
  return (
    <>
      <header>
        <h1>Welcome to Tiktaktoe</h1>
      </header>
      <main>
        <Board />
      </main>
    </>
  )
}

const rootElement = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(rootElement)

root.render(<App />)
