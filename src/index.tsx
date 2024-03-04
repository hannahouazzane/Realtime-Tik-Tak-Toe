import React from 'react'
import ReactDOM from 'react-dom/client'
import { Board } from './Components/Board'
import './styles/global.css'
const App: React.FC = () => {
  return <Board />
}

const rootElement = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(rootElement)

root.render(<App />)
