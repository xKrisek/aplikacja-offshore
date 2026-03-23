import { Routes, Route, NavLink } from 'react-router'
import Select, { components } from 'react-select'
import './App.css'
import { useState, useEffect } from 'react'
import Narzedzie from './components/Narzedzie'
import BazaWiedzy from './components/bazaWiedzy'
import homepageSvg from './assets/homepage.svg'
import bazaWiedzySvg from './assets/baza-wiedzy.svg'
import ocenaStanuTechSvg from './assets/ocena-stanu-tech.svg'
import languageSvg from './assets/language.svg'
import polandFlag from './assets/poland-flag-icon.svg'
import germanyFlag from './assets/germany-flag-icon.svg'
import britainFlag from './assets/britain-flag-icon.svg'
import data from './assets/data.json'
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

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

  useEffect(() => {
    console.log(showLang)
  }, [showLang]);

  return (
    <div className="bg-dark">
      <header>
        <h1>OFF-SHORE SAFETY</h1>
        <nav>
          <NavLink 
            to="/aplikacja-offshore/" 
            end
            className={({ isActive }) => isActive ? 'selected-location' : ''}
          >
            <div>
              <img src={homepageSvg} alt="Home" />
              <p>Strona główna</p>
            </div>
          </NavLink>

          <NavLink 
            to="/aplikacja-offshore/baza-wiedzy" 
            className={({ isActive }) => isActive ? 'selected-location' : ''}
          >
            <div>
              <img src={bazaWiedzySvg} alt="Baza" />
              <p>Baza wiedzy</p>
            </div>
          </NavLink>

          <NavLink 
            to="/aplikacja-offshore/narzedzie" 
            className={({ isActive }) => isActive ? 'selected-location' : ''}
          >
            <div>
               <img src={ocenaStanuTechSvg} alt="Narzędzie" /> 
              <p>Narzędzie</p>
            </div>
          </NavLink>
        </nav>

        <div id='language-container'>
          <div className='lang-button' onClick={() => setShowLang(!showLang)}>
            <img src={languageSvg} alt="Language" />
            <BsChevronCompactLeft style={{fontSize: '35px'}} className={showLang ? 'rotate' : ''}/>
          </div>
          <Select
            className={showLang ? '' : 'hidden'}
            defaultValue={languageOptions[0]}
            options={languageOptions}
            components={{ Option: IconOption, SingleValue: IconValue }}
            isSearchable={false}
            styles={{
              control: (base) => ({
                ...base,
                borderRadius: '10px',
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
                marginLeft: '53px',
                marginTop: '70px',
                borderRadius: '1rem',
                paddingTop: '1rem',
                overflowX: 'hidden',
                overflowY: 'auto',
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
          <Route path="/aplikacja-offshore/narzedzie/*" element={<Narzedzie />} />
        </Routes>
      </main>
    </div>
  )
}

export default App