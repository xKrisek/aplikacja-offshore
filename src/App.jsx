import { useState } from 'react'
import { BrowserRouter, Routes, Link, Route } from 'react-router'
import './App.css'

function App() {

  return (
    <BrowserRouter>
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/baza-wiedzy">About</Link>
        <Link to="/narzedzie">Contact</Link>
      </nav>
    </header>
    <main>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/baza-wiedzy" element={<bazaWiedzy />} />
        <Route path="/narzedzie" element={<Narzedzie />} />
      </Routes>
    </main>

    </BrowserRouter>
  )
}

export default App
