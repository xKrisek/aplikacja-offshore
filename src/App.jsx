import { Routes, Route, NavLink } from 'react-router'
import Select, { components } from 'react-select'
import './App.css'
import { useState, useEffect } from 'react'
import Narzedzie from './components/Narzedzie'
import NarzedzieCopy from './components/Narzedziecopy.jsx'
import BazaWiedzy from './components/bazaWiedzy'
import homepageSvg from './assets/homepage.svg'
import bazaWiedzySvg from './assets/baza-wiedzy.svg'
import ocenaStanuTechSvg from './assets/ocena-stanu-tech.svg'
import languageSvg from './assets/language.svg'
import polandFlag from './assets/poland-flag-icon.svg'
import germanyFlag from './assets/germany-flag-icon.svg'
import britainFlag from './assets/britain-flag-icon.svg'
import logo_ciop from './assets/ciop.png'
import logo_ncbr from './assets/ncbr.jpg'
import data from './assets/data.json'
import { BsChevronCompactLeft } from "react-icons/bs";

function App() {

  const languageOptions = [
    {value: 'PL', label: 'Polski', icon: polandFlag},
    {value: 'EN', label: 'English', icon: britainFlag},
    {value: 'DE', label: 'Deutsch', icon: germanyFlag},
  ];

  document.getElementById('root')

  const [showLang, setShowLang] = useState(false);

  const { Option } = components;
  const IconOption = (props) => (
    <Option {...props}>
      <div style={{display: 'flex', alignItems: 'center', gap: '10px '}}>
        <img src={props.data.icon} style={{width: 30}} alt=""/>
        {props.label}
      </div>
    </Option>
  );

  const { SingleValue } = components;
  const IconValue = (props) => (
    <SingleValue {...props}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', height: '100%' }}>
        <img src={props.data.icon} style={{width: 20}} alt=""/>
        {props.data.label}
      </div>
    </SingleValue>
  )

  return (
    <div className="bg">
      <header>
        <h1>OFF-SHORE SAFETY</h1>
        <nav>
          <NavLink 
            to="/aplikacja-offshore/" 
            end
            className={({ isActive }) => isActive ? 'selected-location' : ''}
            onClick={() => {window.scrollTo(0, 0)}}
          >
            <div>
              <img src={homepageSvg} alt="Home" />
              <p>Strona główna</p>
            </div>
          </NavLink>

          <NavLink 
            to="/aplikacja-offshore/baza-wiedzy" 
            className={({ isActive }) => isActive ? 'selected-location' : ''}
            onClick={() => {window.scrollTo(0, 0)}}
          >
            <div>
              <img src={bazaWiedzySvg} alt="Baza" />
              <p>Baza wiedzy</p>
            </div>
          </NavLink>

          <NavLink 
            to="/aplikacja-offshore/narzedzie" 
            className={({ isActive }) => isActive ? 'selected-location' : ''}
            onClick={() => {window.scrollTo(0, 0)}}
          >
            <div>
               <img src={ocenaStanuTechSvg} alt="Narzędzie" /> 
              <p>Narzędzie</p>
            </div>
          </NavLink>

          <NavLink  
            to="/aplikacja-offshore/narzedziecopy" 
            className={({ isActive }) => isActive ? 'selected-location koncept2' : 'koncept2' }
            onClick={() => {window.scrollTo(0, 0)}}
          >
            <div>
               <img src={ocenaStanuTechSvg} alt="Narzędzie (koncept 2)" /> 
              <p>Narzędzie (koncept 2)</p>
            </div>
          </NavLink>
        </nav>

        <div id='language-container' tabIndex="0" onBlur={(e) => {!e.currentTarget.contains(e.relatedTarget) && setShowLang(false)}}>
          <div className='lang-button' onClick={() => setShowLang(!showLang)}>
            <img src={languageSvg} alt="Language" />
            <BsChevronCompactLeft style={{fontSize: '35px'}} className={showLang ? 'rotate' : ''}/>
          </div>
          <Select
            className={showLang ? '' : 'lang-hidden'}
            defaultValue={languageOptions[0]}
            options={languageOptions}
            components={{ Option: IconOption, SingleValue: IconValue }}
            isSearchable={false}
            styles={{
              control: (base) => ({
                ...base,
                borderRadius: '1rem 0 0 0',
                borderColor: '#000',
                backgroundColor: '#eee',
                height: '40px',
                marginTop: '20px',
                marginRight: '20px',
                display: 'flex',
                alignItems: 'center',
                padding: '0 8px',
                width: '200px',
                float: 'right',
              }),
              valueContainer: (base) => ({
                ...base,
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                padding: 0,
              }),
              singleValue: (base) => ({
                ...base,
                display: 'flex',
                alignItems: 'center',
                height: '100%',
              }),
              option: (base) => ({
                ...base,
                height: '30px',
                width: '200px',
                display: 'flex',
                alignItems: 'center',
                padding: '5px 10px',
                overflowX: 'hidden',
                overflowY: 'hidden',
              }),
              indicatorSeparator: (base) => ({
                ...base,
                height: '20px',
                marginTop: '10px',
              }),
              menu: (base) => ({
                ...base,
                width: '200px',
                borderRadius: '0 0 1rem 0',
                padding: '1rem 0 1rem 0',
                overflowX: 'hidden',
                overflowY: 'auto',
                position: 'absolute',
                right: '7.5rem',
                top: '3.5rem',
              }),
              menuList: (base) => ({
                ...base,
                overflowX: 'hidden'
              })
            }}
          />
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/aplikacja-offshore/" element={
            <div id='main-site-desc'>
              <h2><strong>Narzędzie wspierające decyzyjność</strong> w zakresie doboru i oceny stanu technicznego ŚOI stosowanych w obszarze off-shore i innych outdoorowych.</h2>
            </div>
          } />
          <Route path="/aplikacja-offshore/baza-wiedzy" element={<BazaWiedzy baza={data["knowledgeBase"]} />} />
          <Route path="/aplikacja-offshore/narzedzie/*" element={<Narzedzie data={data["conditionTool"]} />} />
          <Route path="/aplikacja-offshore/narzedziecopy/*" element={<NarzedzieCopy data={data}/>} />
        </Routes>
      </main>
      <footer>
        <div className='footer_img'>
          <a href="https://www.ciop.pl" target="_blank" rel="noopener noreferrer"><img src={logo_ciop} alt="CIOP_PIB" /></a>
          <a href="https://www.ncbr.gov.pl" target="_blank" rel="noopener noreferrer"><img src={logo_ncbr}alt="NCBR" /></a>
        </div>
        <table className='footer_table'>
          <thead>
            <tr>
              <th>OFF-SHORE SAFETY</th>
              <th>Szybkie linki</th>
              <th>Kontakt</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><p>Narzędzie wspierające ocenę i decyzyjność w zakresie ŚOI.</p></td>
              <td>
                <p><a href="/aplikacja-offshore/baza-wiedzy" target="_blank" rel="noopener noreferrer">Baza wiedzy</a></p>              
              </td>
              <td>
                <p>Email: przykład@email.com</p>
              </td>
            </tr>
            <tr>
                <td></td>
                <td><p><a href="/aplikacja-offshore/narzedzie" target="_blank" rel="noopener noreferrer">Narzędzie</a></p></td>
                <td><p>Telefon: +48 XXX XXX XXX</p></td>
            </tr>
            <tr>
                <td></td>
                <td><p><a href="/aplikacja-offshore/narzedziecopy" target="_blank" rel="noopener noreferrer">Narzędzie (koncept 2)</a></p></td>
                <td></td>
            </tr>
          </tbody>
        </table>
      </footer>
    </div>
  )
}

export default App