import { useState } from 'react'
import './App.css'
import FileParser from './FileParser'
import Header from './Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Header />
      <FileParser />
    </div>
  )
}

export default App
