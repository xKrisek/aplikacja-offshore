import './Narzedzie.css'
import { Routes, Route, NavLink, useLocation } from 'react-router';
import { Link } from 'react-router-dom'
import { useState } from 'react';
import './bazaWiedzy.css';
import kask from '../assets/kask.png';

function Narzedzie(props) {

    const color_unchecked = 'white';
    const color_checked = '#78afbd';

    const [criteria1, setCriteria1] = useState(null);
    const [criteria2, setCriteria2] = useState(null);
    const [criteria3, setCriteria3] = useState(null);
    const [showResult, setShowResult] = useState(false)
    const [currentSOI, setCurrentSOI] = useState("");
    const [pointsSum, setPointsSum] = useState(0);
    const [isChecked, setIsChecked] = useState(false)

    const [criteriasDone, setCriteriasDone] = useState([]);

    function checkAllConditionHandler() {
        if (criteriasDone.includes(1) && criteriasDone.includes(2) && criteriasDone.includes(3))
        {
            setShowResult(true)
        }
        else
        {
            alert("Przejrzyj wszystkie opcje!!!")
        }
    }

    function handleCheckboxChange(checked, points) {
        if (!checked) {
            setPointsSum(prevPoints => prevPoints - points)
        }
        else
        {
            setPointsSum(prevPoints => prevPoints + points)
        }
    }

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
                        <button id='narzedzie_button_yellow' onClick={() => {setCurrentSOI("Hełm ochronny")}}>Hełmy ochronne</button>
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
                    <div className='narzedzie_container'>
                        <h2 id="narzedzie-title">Ocena stanu technicznego/Obiekty z polimerów stałych/Hełmy ochronne</h2>
                        <NavLink to='ocena-stanu-skorupy/'>
                            {criteriasDone.includes(1) ? (
                                <>
                                    <button style={{backgroundColor: `${color_checked}`}}>Ocena stanu skorupy</button><br/>
                                </>
                            ) : (
                                <>
                                    <button style={{backgroundColor: `${color_unchecked}`}}>Ocena stanu skorupy</button><br/>
                                </>
                            )}
                        </NavLink>
                        <NavLink to='ocena-stanu-wiezby-i-zaczepow/'>
                            {criteriasDone.includes(2) ? (
                                <>
                                    <button style={{backgroundColor: `${color_checked}`}}>Ocena stanu więźby i zaczepów</button><br/>
                                </>
                            ) : (
                                <>
                                    <button style={{backgroundColor: `${color_unchecked}`}}>Ocena stanu więźby i zaczepów</button><br/>
                                </>
                            )}
                        </NavLink>
                        <NavLink to='ocena-stanu-paska-podbrodkowego/'>
                            {criteriasDone.includes(3) ? (
                                <>
                                    <button style={{backgroundColor: `${color_checked}`}}>Ocena stanu paska podbródkowego</button>
                                </>
                            ) : (
                                <>
                                    <button style={{backgroundColor: `${color_unchecked}`}}>Ocena stanu paska podbródkowego</button>
                                </>
                            )}
                        </NavLink>
                        <div id="sprawdz_stan" style={{float: 'right'}}>
                            <p id='check_condition_p' style={{width: '25%'}}>Aby ocenić właściwy stan techniczny środków ochrony przejrzyj wszystkie pola</p>
                            <button id='check_condition_button' onClick={() => {checkAllConditionHandler()}}>Sprawdź stan techniczny</button>
                        </div>
                    </div>
                } />

                {/* Tekstylia */}
                {/* Metale */}

                {/* Hełmy ochronne - ocena stanu skorupy */}
                <Route path='obiekty-z-polimerow-stalych/helmy-ochronne/ocena-stanu-skorupy/' element={
                    <div className='narzedzie_container'>
                        <h2 id="narzedzie-title">Ocena stanu technicznego/Obiekty z polimerów stałych/Hełmy ochronne/Ocena stanu skorupy</h2>
                        <div style={{float: 'left', width: '30%'}}>
                            {Object.entries(props.data["Obiekty z polimerów stałych"]["Hełmy ochronne"]["Ocena stanu skorupy"]["symptoms"]).map(([symptom, items]) => (
                                    <div key={symptom} className='rating_condition'>
                                        <div style={{width: '30%'}}><input type="checkbox" onChange={(e) => {handleCheckboxChange(e.target.checked, items.points)}} /></div>
                                        <div style={{width: '40%'}}><p>{symptom}</p></div>
                                        <div style={{width: '30%'}}><button id='info_button' onClick={() => {setCriteria1(symptom);}}>?</button></div>
                                    </div>
                                ))} 
                            <Link to=".." relative="path">
                                <button onClick={() => {setCriteria1(null); setCriteriasDone((prevCriteriaDone) => [...prevCriteriaDone, 1])}}>Dalej</button>
                            </Link>
                        </div>
                        {criteria1 != null ? (
                            <div id='narzedzie-opis'>
                                <h2>{criteria1}</h2>
                                <hr style={{width: '90%'}}/>
                                <img src={kask} alt="dobry_stan" />
                                <img src={kask} alt="uszkodzony" />
                                <h3>Kryteria</h3>
                                <p>{props.data["Obiekty z polimerów stałych"]["Hełmy ochronne"]["Ocena stanu skorupy"]["symptoms"][criteria1]["information"]}</p>
                                <button onClick={() => {setCriteria1(null)}}>OK</button>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                } />

                {/* Hełmy ochronne - ocena stanu więźby i zaczepów */}
                <Route path='obiekty-z-polimerow-stalych/helmy-ochronne/ocena-stanu-wiezby-i-zaczepow/' element={
                    <div className='narzedzie_container'>
                        <h2 id="narzedzie-title">Ocena stanu technicznego/Obiekty z polimerów stałych/Hełmy ochronne/Ocena stanu więźby i zaczepów</h2>
                        <div style={{float: 'left', width: '30%'}}>
                            {Object.entries(props.data["Obiekty z polimerów stałych"]["Hełmy ochronne"]["Ocena stanu więźby i zaczepów"]["symptoms"]).map(([symptom, items]) => (
                                    <div key={symptom} className='rating_condition'>
                                        <div style={{width: '30%'}}><input type="checkbox" onChange={(e) => {handleCheckboxChange(e.target.checked, items.points)}} /></div>
                                        <div style={{width: '40%'}}><p>{symptom}</p></div>
                                        <div style={{width: '30%'}}><button id='info_button' onClick={() => {setCriteria2(symptom);}}>?</button></div>
                                    </div>
                                ))}
                            <Link to=".." relative="path">
                                <button onClick={() => {setCriteria2(null); setCriteriasDone((prevCriteriaDone) => [...prevCriteriaDone, 2])}}>Dalej</button>
                            </Link>
                        </div>
                        {criteria2 != null ? (
                            <div id='narzedzie-opis'>
                                <h2>{criteria2}</h2>
                                <hr style={{width: '90%'}}/>
                                <img src={kask} alt="dobry_stan" />
                                <img src={kask} alt="uszkodzony" />
                                <h3>Kryteria</h3>
                                <p>{props.data["Obiekty z polimerów stałych"]["Hełmy ochronne"]["Ocena stanu więźby i zaczepów"]["symptoms"][criteria2]["information"]}</p>
                                <button onClick={() => {setCriteria2(null)}}>OK</button>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                } />

                {/* Hełmy ochronne - ocena stanu paska podbródkowego */}
                <Route path='obiekty-z-polimerow-stalych/helmy-ochronne/ocena-stanu-paska-podbrodkowego/' element={
                    <div className='narzedzie_container'>
                        <h2 id="narzedzie-title">Ocena stanu technicznego/Obiekty z polimerów stałych/Hełmy ochronne/Ocena stanu paska podbródkowego</h2>
                        <div style={{float: 'left', width: '30%'}}>
                            {Object.entries(props.data["Obiekty z polimerów stałych"]["Hełmy ochronne"]["Ocena stanu paska podbródkowego"]["symptoms"]).map(([symptom, items]) => (
                                    <div key={symptom} className='rating_condition'>
                                        <div style={{width: '30%'}}><input type="checkbox" onChange={(e) => {handleCheckboxChange(e.target.checked, items.points)}} /></div>
                                        <div style={{width: '40%'}}><p>{symptom}</p></div>
                                        <div style={{width: '30%'}}><button id='info_button' onClick={() => {setCriteria3(symptom);}}>?</button></div>
                                    </div>
                                ))}
                            <Link to=".." relative="path">
                                <button onClick={() => {setCriteria3(null); setCriteriasDone((prevCriteriaDone) => [...prevCriteriaDone, 3])}}>Dalej</button>
                            </Link>
                        </div>
                        {criteria3 != null ? (
                            <div id='narzedzie-opis'>
                                <h2>{criteria3}</h2>
                                <hr style={{width: '90%'}}/>
                                <img src={kask} alt="dobry_stan" />
                                <img src={kask} alt="uszkodzony" />
                                <h3>Kryteria</h3>
                                <p>{props.data["Obiekty z polimerów stałych"]["Hełmy ochronne"]["Ocena stanu paska podbródkowego"]["symptoms"][criteria3]["information"]}</p>
                                <button onClick={() => {setCriteria3(null)}}>OK</button>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                } />

            </Routes>
            {showResult && 
                <div className='wynik_koncowy_black'>
                    <div className='wynik_koncowy'>
                        <h2>OCENA STANU TECHNICZNEGO</h2>
                        <h3 style={{color: '#ffb700'}}>WYNIK OCENY</h3>
                        <p>Stan twojego środka ochrony <strong>({currentSOI})</strong> jest</p>
                        {pointsSum <= 30 ? (<><h3 style={{color: '#78afbd'}}>POPRAWNY</h3><p>Brak przeciwskazań w użytkowaniu</p></>) : (<></>)}
                        {pointsSum > 30 && pointsSum <= 50 ? (<><h3 style={{color: '#ffb700'}}>DOPUSZCZALNY</h3><p>Zalecana ocena stanu technicznego przed każdym użyciem</p></>) : (<></>)}
                        {pointsSum > 50 ? (<><h3 style={{color: 'darkred'}}>NEGATYWNY</h3><p>Wycofaj z użytkowania</p></>) : (<></>)}
                        <Link to="/aplikacja-offshore/narzedzie">
                            <button onClick={() => {setShowResult(false); setCriteria1(null); setCriteria2(null); setCriteria3(null); setCriteriasDone([]); setPointsSum(0); setSelectedSymptoms(new Set()); console.log(criteria1)}}>Powrót</button>
                        </Link>
                    </div>
                </div>
            }
        </>
    )
}

export default Narzedzie