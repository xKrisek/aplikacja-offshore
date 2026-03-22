import { Routes, Route, NavLink } from 'react-router'
import './App.css'
import Narzedzie from './components/Narzedzie'
import BazaWiedzy from './components/bazaWiedzy'
import knowledgeBase from './assets/knowledgeBase.json'

function App() {

  return (
    <>
      <header>
        <h1>OFF-SHORE SAFETY</h1>
        <nav>
          <NavLink 
            to="/aplikacja-offshore/" 
            end
            className={({ isActive }) => isActive ? 'selected-location' : ''}
          >
            <div>
              <img src="./src/assets/homepage.svg" alt="Home" />
              <p>Strona główna</p>
            </div>
          </NavLink>

          <NavLink 
            to="/aplikacja-offshore/baza-wiedzy" 
            className={({ isActive }) => isActive ? 'selected-location' : ''}
          >
            <div>
              <img src='./src/assets/baza-wiedzy.svg' alt="Baza" />
              <p>Baza wiedzy</p>
            </div>
          </NavLink>

          <NavLink 
            to="/aplikacja-offshore/narzedzie" 
            className={({ isActive }) => isActive ? 'selected-location' : ''}
          >
            <div>
               <img src="./src/assets/ocena-stanu-tech.svg" alt="Narzędzie" /> 
              <p>Narzędzie</p>
            </div>
          </NavLink>
        </nav>

        <div id='language-container'>
          <img src='./src/assets/language.svg' alt="Language" />
          <select className="custom-select">
            <option value="jezyk">Język</option>
            <option value="pl">Polski</option>
            <option value="en">English</option>
          </select>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/aplikacja-offshore/" element={
            <div id='main-site-desc'>
              <h2><strong>Narzędzie wspierające decyzyjność</strong> w zakresie doboru i oceny stanu technicznego ŚOI stosowanych w obszarze off-shore i innych outdoorowych.</h2>
            </div>
          } />
          <Route path="/aplikacja-offshore/baza-wiedzy" element={<BazaWiedzy />} />
          <Route path="/aplikacja-offshore/narzedzie" element={<Narzedzie />} />
        </Routes>
      </main>
    </>
  )
}

export default App