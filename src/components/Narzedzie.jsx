import { useState } from 'react'
import './Narzedzie.css'

function Narzedzie() {

    const [obiekt, setObiekt] = useState(''); 

    return(
        <div className='knowledge-base'>
            <h1 id="narzedzie-title">Ocena stanu technicznego</h1>
            {obiekt === '' &&
                <div>
                    <button id='ob_pol' onClick={() => {setObiekt('ob_pol')}}>Obiekty z polimerów stałych</button><br/>
                    <button id='ob_wl' onClick={() => {setObiekt('ob_wl')}}>Obiekty włókiennicze / tekstylne</button><br/>
                    <button id='ob_met' onClick={() => {setObiekt('ob_met')}}>Obiekty metalowe</button>
                </div>
            }

            {obiekt === 'ob_pol' && 
            <div>
                <div id='div_narzedzie'>
                    Obiekty z polimerów stałych
                    <button id='go_back' onClick={() => {setObiekt('')}}>↩</button><br/>
                    <button id='narzedzie_button_yellow'>Hełmy ochronne</button>
                    <button id='narzedzie_button_blue'>Okulary, gogle, osłony twarzy</button><br/>
                    <button id='narzedzie_button_blue'>Ochronniki słuchu</button>
                    <button id='narzedzie_button_yellow'>Przyłbice spawalnicze</button>
                    <hr/>
                </div>
                
            </div>
            }
            {obiekt === 'ob_wl' && <div id='ob_wl_desc'>Obiekty włókiennicze / tekstylne</div>}
            {obiekt === 'ob_met' && <div id='ob_met_desc'>Obiekty metalowe</div>}
        </div> 
    )
}

export default Narzedzie