import { useState } from 'react'
import './bazaWiedzy.css'


function BazaWiedzy(props) {
    
    const topics = props.baza.map(item => item.title);

    const [selectedTopic, setSelectedTopic] = useState(topics[0] || 'WSTĘP')


    return(
        <div className='knowledge-base'>
            <div id='baza-wiedzy-spis'>
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
                {(() => {
                    const selectedItem = props.baza.find(item => item.title === selectedTopic);                    
                    return selectedItem ? <div>{selectedItem.content.split('/n').map(line => <p>{line}</p>)}</div> : <div>Brak treści dla wybranego tematu.</div>;
                })()}
            </div>
        </div>        
    )
}

export default BazaWiedzy