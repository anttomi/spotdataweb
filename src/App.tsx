import './styles/App.css'
import FileParser from './FileParser'
import Header from './Header'
import Footer from './Footer'
import { useState } from 'react'

function App() {

  return (
    <div className="App">
      <Header/>
      <FileParser/>
      <Footer />
    </div>
  )
}

export default App
