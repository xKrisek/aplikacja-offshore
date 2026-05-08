import { useState, useEffect } from 'react'
import './bazaWiedzy.css'


/*
 * Dokumentacja komponentu `BazaWiedzy`
 * -----------------------------------
 * Opis:
 *  - Komponent wyświetla spis treści oraz szczegóły wybranego tematu z
 *    `props.data.knowledgeBase`. Obsługuje dynamiczne ładowanie danych i
 *    zmianę języka (data przychodzi jako dynamicznie załadowany JSON).
 *
 * Props:
 *  - `props.data` : object zawierający:
 *      - `props.data.knowledgeBase` : Array<{ title: string, content: string }>
 *          Lista obiektów reprezentujących tematy.
 *      - `props.data.textUI` : object zawierający teksty interfejsu
 *
 * Lokalne zmienne / stany:
 *  - `topics` : Array<string> — wygenerowana lista tytułów z `props.data.knowledgeBase`.
 *  - `selectedTopic`, `setSelectedTopic` : wybrany temat. Ustawiane domyślnie na
 *      pierwszy element `props.data.knowledgeBase`.
 *
 * Hooki:
 *  - `useEffect` : uruchamia się gdy zmieni się `props.data` (np. zmiana języka).
 *    Resetuje `selectedTopic` na pierwszy temat nowych danych, aby uniknąć
 *    referencji do nieistniejącego tematu.
 *
 * Walidacja:
 *  - Loading state: jeśli `!props.data || !props.data.knowledgeBase`, pokazuje
 *    komunikat "Ładowanie bazy wiedzy...".
 *
 * Renderowanie:
 *  - Lewy panel: przyciski reprezentujące spis treści. Kliknięcie ustawia
 *    `selectedTopic`.
 *  - Tytuł: pobiera tekst z `props.data.textUI.knowledgeBase.title`.
 *  - Główna zawartość: znajduje `selectedItem` w `props.data.knowledgeBase` i dzieli
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