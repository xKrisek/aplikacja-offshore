import { useState } from 'react'
import { Routes, Link, Route } from 'react-router'
import './App.css'
import Narzedzie from './components/Narzedzie'
import BazaWiedzy from './components/BazaWiedzy'
import knowledgeBase from './assets/knowledgeBase.json'

function App() {

  return (
    <>
      <header>
        <h1>Off-Shore Application Name</h1>
        <nav>
          <Link to="/aplikacja-offshore/">
            <div>
              <img src="./src/assets/homepage.png" /><br/>
              Strona główna
            </div>
          </Link>
          <Link to="/aplikacja-offshore/baza-wiedzy">
            <div>
              <img src='./src/assets/baza-wiedzy.png'/><br/>
              Baza wiedzy
            </div>
          </Link>
          <Link to="/aplikacja-offshore/narzedzie">
            <div>
               <img src="./src/assets/ocena-stanu-tech.png"/><br/>
              Narzędzie
            </div>
          </Link>
        </nav>
        <select>
          <option value="jezyk">Język</option>
          <option value="pl">Polski</option>
          <option value="...">...</option>
        </select>
      </header>
      <main>
        <Routes>
          <Route path="/aplikacja-offshore/" element={<h1>Strona główna</h1>} />
          <Route path="/aplikacja-offshore/baza-wiedzy" element={<BazaWiedzy />} />
          <Route path="/aplikacja-offshore/narzedzie" element={<Narzedzie />} />
        </Routes>
      </main>
    </>
  )
}

export default App
