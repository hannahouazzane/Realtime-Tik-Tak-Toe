import React from 'react'
import ReactDOM from 'react-dom/client'

const App: React.FC = () => {
  return <div>Hello, world!</div>
}

const rootElement = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(rootElement)

root.render(<App />)
