import { useState, useEffect } from 'react'
import './bazaWiedzy.css'


/*
 * Dokumentacja komponentu `BazaWiedzy`
 * -----------------------------------
 * Opis:
 *  - Komponent wyświetla spis treści oraz szczegóły wybranego tematu z
 *    przekazanej listy `props.baza`.
 *
 * Props:
 *  - `props.baza` : Array<{ title: string, content: string }>
 *      Lista obiektów reprezentujących tematy. Każdy element powinien zawierać
 *      `title` (tekst tytułu) i `content` (tekstowy opis).
 *
 * Lokalne zmienne / stany:
 *  - `topics` : Array<string> — wygenerowana lista tytułów z `props.baza`.
 *  - `selectedTopic`, `setSelectedTopic` : wybrany temat. Domyślnie pierwszy
 *      tytuł z listy lub `'WSTĘP'` gdy brak danych.
 *
 * Renderowanie:
 *  - Lewy panel: przyciski reprezentujące spis treści. Kliknięcie ustawia
 *    `selectedTopic`.
 *  - Główna zawartość: znajduje obiekt `selectedItem` z `props.baza` i dzieli
 *    `selectedItem.content` na linie używając `'/n'` jako separatora, tworząc
 *    akapity (`<p>`).
 */

function BazaWiedzy(props) {
    console.log(props.data)
    
    const topics = props.data.knowledgeBase.map(item => item.title); {/* pobieranie tematów bazy z plików .json */}

    const [selectedTopic, setSelectedTopic] = useState(topics[0]); {/* useState od wyboru tematu w bazie */}

    if (!props.data || !props.data.knowledgeBase) {
        return <div className="loading">Ładowanie bazy wiedzy...</div>;
    }

    useEffect(() => {
        if (props.data?.knowledgeBase?.length > 0) {
            setSelectedTopic(props.data.knowledgeBase[0].title);
        }
    }, [props.data]);

    return(
        <div className='knowledge-base'>
            <div id='baza-wiedzy-spis'>
                <h2>Spis treści</h2>
                <hr/>
                {/* wypisywanie tematów */}
                {topics.map((topic) => {
                    return(
                        <><button className='knowledge-base-button' id={selectedTopic === topic ? 'button-selected' : ''} onClick={() => setSelectedTopic(topic)}>{topic}</button><br/></>
                    )
                })}
            </div>
            <h2 id='baza-wiedzy-title'>{props.data.textUI.knowledgeBase.title}</h2>
            <div id='baza-wiedzy-tresc'>
                {/* wypisywanie treści */}
                {(() => {
                    const selectedItem = props.data.knowledgeBase.find(item => item.title === selectedTopic);                    
                    return selectedItem ? <div>{selectedItem.content.split('/n').map(line => <p>{line}</p>)}</div> : <div>Brak treści dla wybranego tematu.</div>;
                })()}
            </div>
        </div>        
    )
}

export default BazaWiedzy