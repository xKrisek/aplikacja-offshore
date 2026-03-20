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
        <img src="./src/assets/logo.svg" alt="Logo" id='logo'/>
        <h1>OFF-SHORE SAFETY</h1>
        <nav>
          <Link to="/aplikacja-offshore/">
            <div>
              <img src="./src/assets/homepage.svg" /><br/>
              Strona główna
            </div>
          </Link>
          <Link to="/aplikacja-offshore/baza-wiedzy">
            <div>
              <img src='./src/assets/baza-wiedzy.svg'/><br/>
              Baza wiedzy
            </div>
          </Link>
          <Link to="/aplikacja-offshore/narzedzie">
            <div>
               <img src="./src/assets/ocena-stanu-tech.svg"/><br/>
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
          <Route path="/aplikacja-offshore/" element={
            <>
              <div id='main-site-desc'>
                <h2><strong>Narzędzie wspierające decyzyjność</strong> w zakresie doboru i oceny stanu technicznego ŚOI stosowanych w obszarze off-shore i innych outdoorowych.</h2>
              </div>
            </>
          } />
          <Route path="/aplikacja-offshore/baza-wiedzy" element={<BazaWiedzy />} />
          <Route path="/aplikacja-offshore/narzedzie" element={<Narzedzie />} />
        </Routes>
      </main>
    </>
  )
}

export default App
