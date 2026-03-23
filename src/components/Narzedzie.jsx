import './Narzedzie.css'
import { Routes, Route, NavLink, useLocation } from 'react-router';
import { useState } from 'react';

function Narzedzie() {

    const color_unchecked = 'white';
    const color_checked = '#78afbd';

    return(
        <>
            <Routes>
                <Route index element={
                    <div className='narzedzie_container'>
                        <h2 id="narzedzie-title">Ocena stanu technicznego</h2>
                        <NavLink to="obiekty-z-polimerow-stalych/">
                            <button id='narzedzie_button_blue'>Obiekty z polimerów stałych</button><br/>
                        </NavLink>

                        <NavLink to="obiekty-wlokiennicze-tekstylne/">
                            <button id='narzedzie_button_yellow'>Obiekty włókiennicze / tekstylne</button><br/>
                        </NavLink>

                        <NavLink to="obiekty-metalowe/">
                            <button id='narzedzie_button_gray'>Obiekty metalowe</button>
                        </NavLink>

                    </div>
                } />

                <Route path="obiekty-z-polimerow-stalych/" element={
                    <div className='narzedzie_container'>
                    <h2 id="narzedzie-title">Ocena stanu technicznego/Obiekty z polimerów stałych</h2>
                    <NavLink to="helmy-ochronne/">
                        <button id='narzedzie_button_yellow'>Hełmy ochronne</button>
                    </NavLink>
                    <NavLink to="okulary_gogle_oslony_twarzy/">
                        <button id='narzedzie_button_blue'>Okulary, gogle, osłony twarzy</button><br/>
                    </NavLink>
                    <NavLink to="ochronniki-sluchu/">
                        <button id='narzedzie_button_blue'>Ochronniki słuchu</button>
                    </NavLink>
                    <NavLink to="przylbice-spawalnicze/">
                        <button id='narzedzie_button_yellow'>Przyłbice spawalnicze</button>
                    </NavLink>
                    </div>
                } />

                <Route path="obiekty-wlokiennicze-tekstylne/" element={
                    <div className='narzedzie_container'>
                    <h2 id="narzedzie-title">Ocena stanu technicznego/Obiekty włókiennicze / tekstylne</h2>
                    <p>Treść dla obiektów włókienniczych / tekstylnych</p>
                    </div>
                } />
                
                <Route path="obiekty-metalowe/" element={
                    <div className='narzedzie_container'>
                    <h2 id="narzedzie-title">Ocena stanu technicznego/Obiekty metalowe</h2>
                    <p>Treść dla obiektów metalowych</p>
                    </div>
                } />

                <Route path="obiekty-z-polimerow-stalych/helmy-ochronne/" element={
                    <div className='narzedzie_ocena'>
                        <h2 id="narzedzie-title">Ocena stanu technicznego/Obiekty z polimerów stałych/Hełmy ochronne</h2>
                        <NavLink to='ocena-stanu-skorupy/'>
                            <button style={{backgroundColor: `${color_unchecked}`}}>Ocena stanu skorupy</button><br/>
                        </NavLink>
                        <NavLink to='ocena-stanu-wiezby-i-zaczepow/'>
                            <button style={{backgroundColor: `${color_unchecked}`}}>Ocena stanu więźby i zaczepów</button><br/>
                        </NavLink>
                        <NavLink to='ocena-stanu-paska-podbrodkowego/'>
                            <button style={{backgroundColor: `${color_unchecked}`}}>Ocena stanu paska podbródkowego</button>
                        </NavLink>
                        <div id="sprawdz_stan" style={{float: 'right'}}>
                            <p id='check_condition_p' style={{width: '25%'}}>Aby ocenić właściwy stan techniczny środków ochrony przejrzyj wszystkie pola</p>
                            <button id='check_condition_button'>Sprawdź stan techniczny</button>
                        </div>
                    </div>
                } />

                {/* Tekstylia */}
                {/* Metale */}

                <Route path='obiekty-z-polimerow-stalych/helmy-ochronne/ocena-stanu-skorupy/' element={
                    <div className='narzedzie_ocena'>
                        <h2 id="narzedzie-title">Ocena stanu technicznego/Obiekty z polimerów stałych/Hełmy ochronne/Ocena stanu skorupy</h2>
                        <div>
                            <label htmlFor="check"><input type="checkbox" name="check" id="check1" />Odkształcenia</label>
                        </div>
                        <div>
                            <label htmlFor="check"><input type="checkbox" name="check" id="check1" />Zmiany koloru</label>
                        </div>
                    </div>
                } />
            </Routes>
        </>
    )
}

export default Narzedzie