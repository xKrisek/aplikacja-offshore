import { useState } from 'react'
import { Routes, Link, Route } from 'react-router'
import './App.css'
import Narzedzie from './components/Narzedzie'
import BazaWiedzy from './components/BazaWiedzy'

function App() {

  return (
    <>
      <header>
        <h1>Off-Shore Application Name</h1>
        <nav>
          <Link to="/aplikacja-offshore/">
            <div>
              <img src="./assets/Strona_glowna.png" alt="" />
              Strona główna
            </div>
          </Link>
          <Link to="/aplikacja-offshore/baza-wiedzy">
            <div>
              <img src='./src/assets/Baza_wiedzy.png' alt="coś się wykrzaczyło :("/>
              Baza wiedzy
            </div>
          </Link>
          <Link to="/aplikacja-offshore/narzedzie">
            <div>
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
