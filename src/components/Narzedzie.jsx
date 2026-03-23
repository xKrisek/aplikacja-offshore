import { useState } from 'react'
import './Narzedzie.css'
import { Routes, Route, NavLink } from 'react-router';

function Narzedzie() {

    const [obiekt, setObiekt] = useState(''); 

    return(
        <div className='knowledge-base'>
            <h1 id="narzedzie-title">Ocena stanu technicznego</h1>
            {obiekt === '' &&
                <NavLink to="/aplikacja-offshore/narzedzie/obiekty_z_polimerow_stalych">
                    <button id='ob_pol' onClick={() => {setObiekt('ob_pol')}}>Obiekty z polimerów stałych</button><br/>
                    {/* <button id='ob_wl' onClick={() => {setObiekt('ob_wl')}}>Obiekty włókiennicze / tekstylne</button><br/>
                    <button id='ob_met' onClick={() => {setObiekt('ob_met')}}>Obiekty metalowe</button> */}
                </NavLink>
            }

            {/* {obiekt === 'ob_pol' && 
            <div>
                <NavLink id='div_narzedzie'>
                    Obiekty z polimerów stałych
                    <button id='go_back' onClick={() => {setObiekt('')}}>↩</button><br/>
                    <button id='narzedzie_button_yellow'>Hełmy ochronne</button>
                    <button id='narzedzie_button_blue'>Okulary, gogle, osłony twarzy</button><br/>
                    <button id='narzedzie_button_blue'>Ochronniki słuchu</button>
                    <button id='narzedzie_button_yellow'>Przyłbice spawalnicze</button>
                    <hr/>
                </NavLink>
                
            </div>
            }
            {obiekt === 'ob_wl' && <div id='ob_wl_desc'>Obiekty włókiennicze / tekstylne</div>}
            {obiekt === 'ob_met' && <div id='ob_met_desc'>Obiekty metalowe</div>} */}
            <Routes>
                <Route path="/aplikacja-offshore/narzedzie/obiekty_z_polimerow_stalych"/>
            </Routes>
        </div> 
    )
}

export default Narzedzie