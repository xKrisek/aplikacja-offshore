import { useState } from 'react'
import './bazaWiedzy.css'

function BazaWiedzy() {
    
    const topics = ['WSTĘP', 'DLACZEGO TE JEST WAŻNE', 'CZYNNIKI STARZENIOWE', 'SŁOWNICZEK', 'KTO SKORZYSTA Z TEJ WIEDZY?', 'ZAWODY OFFSHORE I OUTDOOR', 'DOBÓR ŚOI']

    const [selectedTopic, setSelectedTopic] = useState('WSTĘP')


    return(
        <div className='knowledge-base'>
            <h1 id='baza-wiedzy-title'>Baza wiedzy</h1>
            <div id='baza-wiedzy-buttons'>
                {topics.map((topic) => {
                    return(
                        <button id={selectedTopic === topic ? 'baza-wiedzy-button_selected' : 'baza-wiedzy-button'} onClick={() => setSelectedTopic(topic)}>{topic}</button>
                    )
                })}
            </div>
            <div id='baza-wiedzy-tresc'>
                {selectedTopic === 'WSTĘP' && <div>Witamy w naszej bazie wiedzy, stworzonej z myślą o wszystkich zainteresowanych tematyką bezpieczeństwa w środowisku off-shore i outdoorowym. Naszym celem jest dostarczenie rzetelnych informacji, które pomogą zrozumieć, jak ważne jest odpowiednie dobieranie i ocenianie stanu technicznego ŚOI (Środków Ochrony Indywidualnej) stosowanych w tych wymagających warunkach.</div>}
            </div>
        </div>        
    )
}

export default BazaWiedzy