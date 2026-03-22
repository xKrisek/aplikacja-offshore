import { useState } from 'react'
import './bazaWiedzy.css'

function BazaWiedzy() {
    
    const topics = ['WSTĘP', 'DLACZEGO TE JEST WAŻNE', 'CZYNNIKI STARZENIOWE', 'SŁOWNICZEK', 'KTO SKORZYSTA Z TEJ WIEDZY?', 'ZAWODY OFFSHORE I OUTDOOR', 'DOBÓR ŚOI']

    const [selectedTopic, setSelectedTopic] = useState('WSTĘP')


    return(
        <div className='knowledge-base'>
            <div id='baza-wiedzy-buttons'>
                <h2>Spis treści</h2>
                <hr/>
                {topics.map((topic) => {
                    return(
                        <><button className='knowledge-base-button' id={selectedTopic === topic ? 'button-selected' : ''} onClick={() => setSelectedTopic(topic)}>{topic}</button><br/></>
                    )
                })}
            </div>
            <h2 id='baza-wiedzy-title'>Baza wiedzy</h2>
            <div id='baza-wiedzy-tresc'>
                {selectedTopic === 'WSTĘP' && <div>Witamy w naszej bazie wiedzy, stworzonej z myślą o wszystkich zainteresowanych tematyką bezpieczeństwa w środowisku off-shore i outdoorowym. Naszym celem jest dostarczenie rzetelnych informacji, które pomogą zrozumieć, jak ważne jest odpowiednie dobieranie i ocenianie stanu technicznego ŚOI (Środków Ochrony Indywidualnej) stosowanych w tych wymagających warunkach.</div>}
            </div>
        </div>        
    )
}

export default BazaWiedzy