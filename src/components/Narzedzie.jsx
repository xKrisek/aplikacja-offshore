import './Narzedzie.css'
import { Routes, Route, NavLink } from 'react-router';
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react';
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
    const [valuePoint, setValuePoint] = useState(1)

    const [path, setPath] = useState("")
    const [arrayPath, setArrayPath] = useState([])

    const location = useLocation();
    const [textPath, setTextPath] = useState("Ocena stanu technicznego")

    const [criteriasDone, setCriteriasDone] = useState("");

    useEffect(() => {
        if (location.pathname === "/" || location.pathname === "/aplikacja-offshore/narzedzie") {
            setTextPath("Ocena stanu technicznego");
            setArrayPath("");
            setPath("");
        } else {
            const pathSegments = location.pathname.split('/').filter(seg => seg);
            if (pathSegments.length > 0) {
                const urlPath = pathSegments[pathSegments.length - 1];
                Object.keys(props.data).forEach(key => {
                    if (toLink(key) === urlPath) {
                        setArrayPath(key);
                        setPath(toLink(key));
                        if (!textPath.includes(key))
                        {
                            setTextPath(textPath + '/' + key);   
                        }
                    }
                });
            }
        }
    }, [location.pathname]);

    function checkAllConditionHandler() {
        if (currentSOI == "Okulary, gogle, osłony twarzy")
        {
            if (criteriasDone.includes(1) && criteriasDone.includes(2) && criteriasDone.includes(3) && criteriasDone.includes(4))
            {
                setShowResult(true)
            }
            else
            {
                alert("Przejrzyj wszystkie opcje!!!")
            }
        }
        else
        {
            if (criteriasDone.includes(1) && criteriasDone.includes(2) && criteriasDone.includes(3))
            {
                setShowResult(true)
            }
            else
            {
                alert("Przejrzyj wszystkie opcje!!!")
            }
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

    const toLink = (str) => {
        return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[łŁ]/g, s => s === 'ł' ? 'l' : 'L')
            .replace(/[^a-zA-Z0-9\s-]/g, "")
            .trim()
            .replace(/\s+/g, "-")
            .toLowerCase();
    };

    return(
        <>
            <Routes>
                {/* Obiekty */}
                <Route index element={
                    <div className='narzedzie_container'>
                        <h2 id="narzedzie-title">{textPath}</h2>
                        {Object.entries(props.data).map(([key, value]) => {
                            const linkPath = toLink(key);
                            return (
                                <>
                                    <NavLink key={key} to={linkPath} onClick={() => {setPath(linkPath); setArrayPath(key)}}>
                                        <button id='narzedzie_button_blue'>{key}</button><br/>
                                    </NavLink>
                                </>
                            )
                        })}
                    </div>
                }/>

                {/* Obiekty z polimerów stałych */}
                <Route path={path} element={
                    <div className='narzedzie_container'>
                    <h2 id="narzedzie-title">{textPath}</h2>
                    {arrayPath != "" && Object.entries(props.data[arrayPath]).map(([key, value]) => {
                        const linkPath = toLink(key);
                        console.log(linkPath);
                        
                        return (
                            <NavLink key={key} to={linkPath} onClick={() => {setCurrentSOI(key); setPath(linkPath)}}>
                                <button id='narzedzie_button_blue'>{key}</button><br/>
                            </NavLink>
                        )
                    })}
                    </div>
                }/>

                {/* Hełmy ochronne */}
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
                                <label>Stopień zniszczeń: <input type="range" min={1} max={10} value={valuePoint} onChange={(e) => {setValuePoint(e.target.value)}} /> {valuePoint}</label>
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
                                <label>Stopień zniszczeń: <input type="range" min={1} max={10} value={valuePoint} onChange={(e) => {setValuePoint(e.target.value)}} /> {valuePoint}</label>
                                <button onClick={() => {setCriteria3(null)}}>OK</button>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                } />


                {/* Okulary, gogle, osłony twarzy */}
                <Route path="obiekty-z-polimerow-stalych/okulary-gogle-oslony-twarzy/" element={
                    <div className='narzedzie_container'>
                        <h2 id="narzedzie-title">Ocena stanu technicznego/Obiekty z polimerów stałych/Okulary, gogle, osłony twarzy</h2>
                        <NavLink to='ocena-wizjerow-soczewek/'>
                            {criteriasDone.includes(1) ? (
                                <>
                                    <button style={{backgroundColor: `${color_checked}`}}>Ocena wizjerów / soczewek</button><br/>
                                </>
                            ) : (
                                <>
                                    <button style={{backgroundColor: `${color_unchecked}`}}>Ocena wizjerów / soczewek</button><br/>
                                </>
                            )}
                        </NavLink>
                        <NavLink to='ocena-elementow-konstrukcyjnych/'>
                            {criteriasDone.includes(2) ? (
                                <>
                                    <button style={{backgroundColor: `${color_checked}`}}>Ocena elementów konstrukcyjnych</button><br/>
                                </>
                            ) : (
                                <>
                                    <button style={{backgroundColor: `${color_unchecked}`}}>Ocena elementów konstrukcyjnych</button><br/>
                                </>
                            )}
                        </NavLink>
                        <NavLink to='ocena-stanu-ochrony-bocznej/'>
                            {criteriasDone.includes(3) ? (
                                <>
                                    <button style={{backgroundColor: `${color_checked}`}}>Ocena stanu ochrony bocznej</button><br/>
                                </>
                            ) : (
                                <>
                                    <button style={{backgroundColor: `${color_unchecked}`}}>Ocena stanu ochrony bocznej</button><br/>
                                </>
                            )}
                        </NavLink>
                        <NavLink to='ocena-stabilności-i-utrzymania-na-głowie/'>
                            {criteriasDone.includes(4) ? (
                                <>
                                    <button style={{backgroundColor: `${color_checked}`}}>Ocena stabilności i utrzymania na głowie</button>
                                </>
                            ) : (
                                <>
                                    <button style={{backgroundColor: `${color_unchecked}`}}>Ocena stabilności i utrzymania na głowie</button>
                                </>
                            )}
                        </NavLink>
                        <div id="sprawdz_stan" style={{float: 'right'}}>
                            <p id='check_condition_p' style={{width: '25%'}}>Aby ocenić właściwy stan techniczny środków ochrony przejrzyj wszystkie pola</p>
                            <button id='check_condition_button' onClick={() => {checkAllConditionHandler()}}>Sprawdź stan techniczny</button>
                        </div>
                    </div>
                } />


                {/* Obiekty włókiennicze / tekstylne */}
                <Route path="obiekty-wlokiennicze-tekstylne/" element={
                    <div className='narzedzie_container'>
                    <h2 id="narzedzie-title">Ocena stanu technicznego/Obiekty włókiennicze / tekstylne</h2>
                    <p>Treść dla obiektów włókienniczych / tekstylnych</p>
                    </div>
                } />

                {/* Tekstylia */}
                
                {/* Obiekty metalowe */}
                <Route path="obiekty-metalowe/" element={
                    <div className='narzedzie_container'>
                    <h2 id="narzedzie-title">Ocena stanu technicznego/Obiekty metalowe</h2>
                    <p>Treść dla obiektów metalowych</p>
                    </div>
                } />

                {/* Metale */}

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