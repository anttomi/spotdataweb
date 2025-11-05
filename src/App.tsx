import './styles/App.css'
import FileParser from './FileParser.tsx'
import Header from './Header.tsx'
import Footer from './Footer.tsx'

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
