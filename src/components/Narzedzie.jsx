import './Narzedzie.css'
import { NavLink } from 'react-router';

function Narzedzie() {

    return(
        <div className='knowledge-base'>
            <h1 id="narzedzie-title">Ocena stanu technicznego</h1>
            <NavLink to="/aplikacja-offshore/narzedzie/obiekty-z-polimerow-stalych/">
                <button id='ob_pol'>Obiekty z polimerów stałych</button><br/>
            </NavLink>

            <NavLink to="/aplikacja-offshore/narzedzie/obiekty-wlokiennicze-tekstylne/">
                <button id='ob_wl'>Obiekty włókiennicze / tekstylne</button><br/>
            </NavLink>

            <NavLink to="/aplikacja-offshore/narzedzie/obiekty-metalowe/">
                <button id='ob_met'>Obiekty metalowe</button>
            </NavLink>
        </div>


    )
}

export default Narzedzie