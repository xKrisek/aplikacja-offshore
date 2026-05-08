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
import appLogo from './assets/logo.svg'
import { BsChevronCompactLeft } from "react-icons/bs";

function App() {

  /*
   * Dokumentacja pliku App.jsx
   * ========================================
   * Opis:
   *  - Główny komponent aplikacji. Zarządza wyborem języka (PL/EN/DE), dynamicznie
   *    ładuje odpowiedni plik danych JSON (`data-{lang}.json`), renderuje nagłówek
   *    z nawigacją, selector języka (react-select z ikonami), główną zawartość
   *    (Routes) oraz stopkę.
   *
   * Props:
   *  - Brak; komponent pobiera dane z plików JSON
   *
   * Importy/zasoby:
   *  - `data-{lang}.json` : pliki danych ładowane dynamicznie na podstawie wybranego `lang`
   *    (PL, EN, DE). Każdy plik zawiera strukturę:
   *      { knowledgeBase: [...], conditionTool: {...}, textUI: {...} }
   *  - Ikony (ikonki flag, SVG) importowane statycznie
   *  - `react-select` : biblioteka do wielofunkcyjnych selectów (z komponentami)
   *  - `react-router` : routing aplikacji
   *
   * Stan (główne zmienne):
   *  - `languageOptions` : tablica predefiniowanych opcji { value, label, icon }
   *  - `lang`, `setLang` : wybrany język (inicjalizowany z localStorage 'app_lang', domyślnie 'PL')
   *  - `data`, `setData` : załadowany plik JSON dla wybranego języka (null do czasu załadowania)
   *  - `showLang` : boolean sterujący widocznością dropdownu języków
   *
   * Hooki / efekty:
   *  - `useEffect` (ładowanie danych) : uruchamia się przy zmianie `lang`. Dynamicznie
   *    importuje plik `./assets/data-{lang}.json` i ustawia `data`. W razie błędu
   *    loguje komunikat do konsoli.
   *  - `useEffect` (localStorage) : uruchamia się przy zmianie `lang`, zapisuje
   *    wybrany język do localStorage dla zapamiętania między sesjami.
   *
   * Komponenty pomocnicze:
   *  - `IconOption(props)` : renderuje opcję listy z ikoną (flex, 10px gap)
   *  - `IconValue(props)` : renderuje wybraną wartość z ikoną
   *
   * Struktura Routes:
   *  - `/aplikacja-offshore/` : strona główna (tymczasowy layout)
   *  - `/aplikacja-offshore/baza-wiedzy` : komponent `BazaWiedzy` z danymi z `data`
   *  - `/aplikacja-offshore/narzedzie/*` : komponent `Narzedzie` z `data.conditionTool`
   *  - `/aplikacja-offshore/narzedziecopy/*` : komponent `NarzedzieCopy` z całym `data`
   *
   * UI:
   *  - Header: logo, nawigacja (3 linki), selector języka (react-select z ikonami flag)
   *  - Main: Routes (warunkowo renderowane jeśli `data` jest załadowana)
   *  - Footer: linki do CIOP/NCBR, tabela z linkami i kontaktami
   *  - Loading screen: jeśli `data === null` lub `data.knowledgeBase` brakuje
   */

  const languageOptions = [
    {value: 'PL', label: 'Polski', icon: polandFlag},
    {value: 'EN', label: 'English', icon: britainFlag},
    {value: 'DE', label: 'Deutsch', icon: germanyFlag},
  ];

  document.getElementById('root')

  const [showLang, setShowLang] = useState(false);
  const [lang, setLang] = useState(() => { //UseState do wyboru języka i ewewntualnego pobrania z localStorage
    return localStorage.getItem('app_lang') || 'PL';
  });
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const module = await import(`./assets/data-${lang}.json`);
        setData(module.default);
        console.log(data)
      } catch (error) {
        console.error("Nie udało się załadować pliku językowego:", error);
      }
    };

    loadData();
  }, [lang]);

useEffect(() => {
    localStorage.setItem('app_lang', lang);
  }, [lang]);

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
  
  if (!data || !data.knowledgeBase) {
      return <div className="loading">Ładowanie bazy wiedzy...</div>;
  }

  return (
    <div className="bg">
      <header>
        <h1>
          {/*  Nawigacja do stony głównej */}
          <NavLink 
            to="/aplikacja-offshore/" 
            end
            onClick={() => {window.scrollTo(0, 0)}}
          >
            <img src={appLogo}/>OFF-SHORE<br/>SAFETY
          </NavLink></h1>
        <nav>
          {/*  Nawigacja do stony bazy wiedzy */}
          <NavLink 
            to="/aplikacja-offshore/baza-wiedzy" 
            className={({ isActive }) => isActive ? 'selected-location' : ''}
            onClick={() => {window.scrollTo(0, 0)}}
          >
            <div>
              <img src={bazaWiedzySvg} alt={data.textUI.knowledgeBase.title} />
              <p>{data.textUI.knowledgeBase.title}</p>
            </div>
          </NavLink>
          {/*  Nawigacja do pierwszego konceptu stony narzędzia */}
          <NavLink 
            to="/aplikacja-offshore/narzedzie" 
            className={({ isActive }) => isActive ? 'selected-location' : ''}
            onClick={() => {window.scrollTo(0, 0)}}
          >
            <div>
               <img src={ocenaStanuTechSvg} alt={data.textUI.conditionTool.title} /> 
              <p>{data.textUI.conditionTool.title}</p>
            </div>
          </NavLink>
          {/*  Nawigacja do drugiego konceptu stony narzędzia */}
          <NavLink  
            to="/aplikacja-offshore/narzedziecopy" 
            className={({ isActive }) => isActive ? 'selected-location' : '' }
            onClick={() => {window.scrollTo(0, 0)}}
          >
            <div>
               <img src={ocenaStanuTechSvg} alt={data.textUI.conditionTool.title} /> 
              <p>{data.textUI.conditionTool.title} 2</p>
            </div>
          </NavLink>
        </nav>

        {/* Wybór języka na stronie */}
        <div id='language-container' tabIndex="0" onBlur={(e) => {!e.currentTarget.contains(e.relatedTarget) && setShowLang(false)}}>
          <div className='lang-button' onClick={() => setShowLang(!showLang)}>
            <img src={languageSvg} alt="Language" />
            <BsChevronCompactLeft style={{fontSize: '35px'}} className={showLang ? 'rotate' : ''}/>
          </div>
          <Select
            className={showLang ? '' : 'lang-hidden'}
            defaultValue={languageOptions[0]}
            value={languageOptions.find(option => option.value === lang)}
            options={languageOptions}
            components={{ Option: IconOption, SingleValue: IconValue }}
            isSearchable={false}
            onChange={(selected) => setLang(selected.value)}
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
          {/* Strona główna */}
          {data ?
            <>
              <Route path="/aplikacja-offshore/" element={
                <>
                  <div id='main-site-desc'>
                    <h2><strong>Narzędzie wspierające decyzyjność</strong> w zakresie doboru i oceny stanu technicznego ŚOI stosowanych w obszarze off-shore i innych outdoorowych.</h2>
                  </div>
                  <div id='main-site-desc'/>
                  <div id='main-site-desc'/>
                  <div id='main-site-desc'/>
                </>
              } />
              {/* Strona bazy wiedzy */}
              <Route path="/aplikacja-offshore/baza-wiedzy" element={<BazaWiedzy data={data} />} />
              {/* Pierwszy koncept narzędzia */}
              <Route path="/aplikacja-offshore/narzedzie/*" element={<Narzedzie data={data?.conditionTool} />} />
              {/* Drugi koncept narzędzia */}
              <Route path="/aplikacja-offshore/narzedziecopy/*" element={<NarzedzieCopy data={data} />}/>
            </>
          :
            <>WCZYTYWANIE DANYCH</>
          }
        </Routes>
      </main>
      <footer> {/* Stopka */}
        <div className='footer_img'>
          <a href="https://www.ciop.pl" target="_blank" rel="noopener noreferrer"><img src={logo_ciop} alt="CIOP_PIB" /></a>
          <a href="https://www.ncbr.gov.pl" target="_blank" rel="noopener noreferrer"><img src={logo_ncbr}alt="NCBR" /></a>
        </div>
         {/* Tabela z informacjami do stopki (Krótki opis, Szybkie linki i Kontakt) */}
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