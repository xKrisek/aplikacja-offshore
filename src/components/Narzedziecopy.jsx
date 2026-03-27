import './Narzedzie.css';
import { useEffect, useState, useRef } from 'react';
import { BsArrowReturnLeft, BsCaretDown, BsArrowDownLeft } from "react-icons/bs";

const GRANICE_PUNKTOWE = [100, 150]
// INDEX 0 - granica średniego zużycia
// INDEX 1 - granica krytycznego zużycia
// <<<------------------------------------------------------------------------------------------------------------------------------------------

function NarzedzieCopy({data}) {
    const toolData = data["conditionTool"];
    const [uncoveredH3, setUncoveredH3] = useState("");
    const [toolPath, setToolPath] = useState("");
    const [categs, setCategs] = useState(0);
    const [openedCategs, setOpenedCategs] = useState([]);
    const [testPoints, setTestPoints] = useState({});
    const [endOfTest, setEndOfTest] = useState(false);
    const [showSubmit, setShowSubmit] = useState(false);
    const [result, setResult] = useState("");

    const pathParts = toolPath.split(';-;');
    const mainKey = pathParts[0];
    const toolKey = pathParts[1];
    const currentCatKey = pathParts[2];
    const symptomKey = pathParts[3];
    const isSymptomView = pathParts.length == 4;
    const isToolSelected = pathParts.length >= 2;

    const symptomData = (isSymptomView && toolData[mainKey]?.[toolKey]) 
        ? toolData[mainKey][toolKey][currentCatKey]?.["symptoms"]?.[symptomKey] 
        : null;
    const allCategories = (isSymptomView && toolData[mainKey]?.[toolKey]) 
        ? Object.keys(toolData[mainKey][toolKey]) 
        : [];
    const currentPointState = isSymptomView ? testPoints[currentCatKey]?.[symptomKey] : null;
    const currentCatSymptoms = isSymptomView ? Object.keys(toolData[mainKey][toolKey][currentCatKey].symptoms).filter(s => s !== "") : [];
    const isLastCategory = isSymptomView && allCategories.indexOf(currentCatKey) === allCategories.length - 1;
    const isLastSymptom = isSymptomView && currentCatSymptoms.indexOf(symptomKey) === currentCatSymptoms.length - 1;

    const prevDataRef = useRef(data);

    // Mapowanie starej ścieżki do nowej przy zmianie pliku JSON
    useEffect(() => {
        if (prevDataRef.current !== data && toolPath !== "") {
            const oldData = prevDataRef.current["conditionTool"];
            const newData = data["conditionTool"];

            // 1. Znajdź indeksy starej ścieżki w starym pliku JSON
            const oldMainKeys = Object.keys(oldData);
            const mainIdx = oldMainKeys.indexOf(mainKey);
            
            const oldToolKeys = Object.keys(oldData[mainKey] || {});
            const toolIdx = oldToolKeys.indexOf(toolKey);

            // 2. Mapuj na nowe klucze na podstawie indeksów
            const newMainKey = Object.keys(newData)[mainIdx];
            const newToolKeys = Object.keys(newData[newMainKey] || {});
            const newToolKey = newToolKeys[toolIdx];

            // Sprawdzenie: czy nowe klucze istnieją
            if (!newMainKey || !newToolKey) {
                setToolPath("");
                return;
            }

            let newPath = [newMainKey, newToolKey];

            if (pathParts.length >= 3) {
                const oldCatKeys = Object.keys(oldData[mainKey][toolKey]);
                const catIdx = oldCatKeys.indexOf(currentCatKey);
                const newCatKeys = Object.keys(newData[newMainKey][newToolKey]);
                
                // Sprawdzenie: czy indeks istnieje w nowej strukturze
                if (catIdx < 0 || catIdx >= newCatKeys.length) {
                    setToolPath([newMainKey, newToolKey].join(';-;'));
                    return;
                }
                
                const newCatKey = newCatKeys[catIdx];

                newPath.push(newCatKey);

                if (pathParts.length === 4) {
                    const oldSympKeys = Object.keys(oldData[mainKey][toolKey][currentCatKey].symptoms);
                    const sympIdx = oldSympKeys.indexOf(symptomKey);
                    const newSympKeys = Object.keys(newData[newMainKey][newToolKey][newCatKey].symptoms);
                    
                    // Sprawdzenie: czy indeks symptomu istnieje w nowej strukturze
                    if (sympIdx >= 0 && sympIdx < newSympKeys.length) {
                        const newSympKey = newSympKeys[sympIdx];
                        if (newSympKey) {
                            newPath.push(newSympKey);
                        }
                    }
                }
            }

            // 3. Zaktualizuj ścieżkę i punkty bez ich zerowania
            setToolPath(newPath.join(';-;'));
            
            // Mapowanie punktów (zachowanie mnożników)
            setTestPoints(prevPoints => {
                const newPoints = {};
                const newToolObj = newData[newMainKey][newToolKey];
                
                Object.keys(newToolObj).forEach((catKey, cIdx) => {
                    newPoints[catKey] = {};
                    const oldCatKey = Object.keys(oldData[mainKey][toolKey])[cIdx];
                    
                    Object.keys(newToolObj[catKey].symptoms).forEach((sKey, sIdx) => {
                        if (sKey === "") return;
                        const oldSKey = Object.keys(oldData[mainKey][toolKey][oldCatKey].symptoms)[sIdx];
                        
                        newPoints[catKey][sKey] = {
                            points: newToolObj[catKey].symptoms[sKey].points || 0,
                            multiplier: prevPoints[oldCatKey]?.[oldSKey]?.multiplier || 0
                        };
                    });
                });
                return newPoints;
            });

            // Mapowanie otwartych kategorii
            setOpenedCategs(prev => prev.map(oldCat => {
                const idx = Object.keys(oldData[mainKey][toolKey]).indexOf(oldCat);
                const newCatKeys = Object.keys(newData[newMainKey][newToolKey]);
                return newCatKeys[idx] || oldCat;
            }));
            
            // Mapowanie aktywnego nagłówka
            if (uncoveredH3 !== "") {
                const newCatKeys = Object.keys(newData[newMainKey][newToolKey]);
                if (Object.keys(oldData[mainKey][toolKey]).includes(uncoveredH3)) {
                    const idx = Object.keys(oldData[mainKey][toolKey]).indexOf(uncoveredH3);
                    setUncoveredH3(newCatKeys[idx] || "");
                } else if (Object.keys(oldData).includes(uncoveredH3)) {
                    const idx = Object.keys(oldData).indexOf(uncoveredH3);
                    setUncoveredH3(Object.keys(newData)[idx] || "");
                }
            }
        }
        prevDataRef.current = data;
    }, [data]);

    useEffect(() => {
        if (!isToolSelected) {
            setOpenedCategs([]);
            setShowSubmit(false);
            setTestPoints({});
            setCategs(0);
            setEndOfTest(false);
            return;
        }

        const selectedTool = toolData[mainKey]?.[toolKey];

        if (selectedTool) {
            const categoryKeys = Object.keys(selectedTool);
            setCategs(categoryKeys.length);
            isSymptomView
            
            const initialPoints = {};
            categoryKeys.forEach(catKey => {
                initialPoints[catKey] = {};
                const symptoms = selectedTool[catKey].symptoms;
                
                if (symptoms) {
                    Object.entries(symptoms).forEach(([sKey, data]) => {
                        if (sKey !== "") {
                            initialPoints[catKey][sKey] = {
                                points: data.points || 0,
                                multiplier: 0 
                            };
                        }
                    });
                }
            });

            setTestPoints(prev => {
                const prevKeys = Object.keys(prev);
                if (prevKeys.length === 0 || prevKeys.length !== categoryKeys.length) {
                    return initialPoints;
                }
                return prev;
            });
        }
    }, [toolPath, mainKey, toolKey]);

    const handleNext = () => {
        const categorySymptoms = toolData[mainKey]?.[toolKey]?.[currentCatKey]?.symptoms;
        if (!categorySymptoms) return;

        const symptomKeys = Object.keys(categorySymptoms).filter(k => k !== "");
        const currentIndex = symptomKeys.indexOf(symptomKey);

        if (currentIndex < symptomKeys.length - 1) {
            const nextSymptom = symptomKeys[currentIndex + 1];
            setToolPath([mainKey, toolKey, currentCatKey, nextSymptom].join(';-;'));
        } 
        else {
            const allCategories = Object.keys(toolData[mainKey][toolKey]);
            const currentCatIndex = allCategories.indexOf(currentCatKey);

            if (currentCatIndex < allCategories.length - 1) {
                const nextCat = allCategories[currentCatIndex + 1];
                const nextCatFirstSymptom = Object.keys(toolData[mainKey][toolKey][nextCat].symptoms)[0];
                
                setUncoveredH3(nextCat);
                if (!openedCategs.includes(nextCat)) {
                    setOpenedCategs(prev => [...prev, nextCat]);
                }
                setToolPath([mainKey, toolKey, nextCat, nextCatFirstSymptom].join(';-;'));
            } else {
                setToolPath([mainKey, toolKey].join(';-;'));
                setUncoveredH3("")
            }
        }
    };

    const handleSubmit = () => {
        let pointsSum = 0;

        Object.entries(testPoints).forEach(([key, item]) => {
            Object.entries(item).forEach(([cKey, data]) => {
                pointsSum += data.points*data.multiplier;
            });
        });

        if(pointsSum >= GRANICE_PUNKTOWE[1]){
            setResult('k') // krytyczny
        }else if(pointsSum >= GRANICE_PUNKTOWE[0] && pointsSum < GRANICE_PUNKTOWE[1]){
            setResult('s') // średni
        }else{
            setResult('d') // dobry
        }

        setShowSubmit(true);
    }

    useEffect(() => {
        setEndOfTest(categs > 0 && openedCategs.length === categs);
    }, [openedCategs])
    
    if (!data || !data.knowledgeBase) {
        return <div className="loading">Ładowanie bazy wiedzy...</div>;
    }

    return (
        <div className='narzedzie_container'>
            <div className='menu'>
                {!isToolSelected ? 
                <>
                    <h2>Wybierz ŚOI do sprawdzenia</h2><hr/>
                    <div>
                        {Object.entries(toolData).map(([key, items]) => (
                            <div className='categ-wrapper' key={key}>
                                <h3 onClick={() => uncoveredH3 === key ? setUncoveredH3("") : setUncoveredH3(key)}>
                                    {key} <BsCaretDown className={uncoveredH3 === key ? 'uncover-arrow rotated-arrow' : 'uncover-arrow'}/>
                                </h3>
                                <ul className={uncoveredH3 !== key ? "categ-hidden" : "" }>
                                    {Object.entries(items).map(([key2]) => (
                                        <li onClick={() => setToolPath(key + ';-;' + key2)} key={key2}>{key2}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </>
                :
                <>
                    <BsArrowReturnLeft onClick={() => setToolPath("")} className='return-arrow'/>
                    <h2>{toolKey}</h2><hr/>
                    <div className='shadow' style={{transform: 'scale(1, -1)'}}/>
                    <div className='total-categs-wrapper'>
                        {Object.entries(toolData[mainKey][toolKey]).map(([key, items]) => (
                            <div className='categ-wrapper' key={key}>
                                <h3 className={openedCategs.includes(key) ? "read" : ""} 
                                    onClick={() => {
                                        uncoveredH3 === key ? setUncoveredH3("") : setUncoveredH3(key);
                                        if (!openedCategs.includes(key)) setOpenedCategs([...openedCategs, key]);
                                    }}>
                                    {key}
                                    <BsCaretDown className={uncoveredH3 === key ? 'uncover-arrow rotated-arrow' : 'uncover-arrow'}/>
                                </h3>
                                <ul className={uncoveredH3 !== key ? "categ-hidden" : "" }>
                                    {Object.keys(testPoints).length > 0 && Object.entries(items["symptoms"]).map(([sKey]) => (
                                        <li className={[testPoints[key]?.[sKey]?.multiplier > 0 ? "checked" : "",
                                            (symptomKey === sKey && currentCatKey === key) ? "bold" : ""
                                            ].join(' ').trim()} key={sKey}
                                            onClick={() => setToolPath([mainKey, toolKey, key, sKey].join(';-;'))}
                                        >{sKey}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className='shadow'/>
                    <div id='submit-condition-btn' className={openedCategs.length === categs && categs > 0 ? "" : "disable"} onClick={() => openedCategs.length === categs && categs > 0 && handleSubmit()}>
                        Sprawdź stan techniczny
                    </div>
                </>
                } 
            </div>

            <div className='right-panel'>
                <div className="information">
                    {isSymptomView ?
                    <>
                        <div className='information-content'>
                            <h3>{toolKey} / {currentCatKey}</h3>
                            <h2>{symptomKey}</h2>
                            <p>{symptomData?.information}</p>
                        </div>
                        
                        <label htmlFor='check' id='check-btn'>
                            <input type='checkbox' id='check' checked={!!currentPointState?.multiplier} 
                                onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    const newMultiplier = isChecked ? 1 : 0;

                                    setTestPoints(prev => ({
                                        ...prev,
                                        [currentCatKey]: {
                                            ...prev[currentCatKey],
                                            [symptomKey]: {
                                                ...prev[currentCatKey][symptomKey],
                                                multiplier: newMultiplier
                                            }
                                        }
                                    }));
                                }}
                            />
                            Zaznacz symptom 
                        </label>

                        {symptomData?.hasRange === 1 && (
                            <div id='symptom-range' style={{ opacity: currentPointState?.multiplier > 0 ? 1 : 0 }}>
                                <p>Nasilenie</p>
                                <div className='range-wrapper' style={{'--range-val': Math.round((currentPointState?.multiplier || 0.1) * 10) - 1,
                                    '--green-color': currentPointState?.multiplier || 0.1
                                }}>
                                    
                                    <div className="range-bubble">
                                        {Math.round((currentPointState?.multiplier || 0) * 10)}
                                    </div>

                                    <input 
                                        type='range' 
                                        min={1} 
                                        max={10} 
                                        step={1}
                                        value={Math.round((currentPointState?.multiplier || 0) * 10) || 10}
                                        onChange={(e) => {
                                            setTestPoints(prev => ({
                                                ...prev,
                                                [currentCatKey]: {
                                                    ...prev[currentCatKey],
                                                    [symptomKey]: {
                                                        ...prev[currentCatKey][symptomKey],
                                                        multiplier: parseInt(e.target.value) / 10
                                                    }
                                                }
                                            }));
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                        <div id='continue-btn' onClick={handleNext}>{isLastSymptom && isLastCategory ? "Zakończ badanie" : "Dalej"}</div>
                    </>
                    :
                    <div className='information-message'>
                        { !isToolSelected ?
                            <><h3>Narzędzie do oceny stanu technicznego ŚOI</h3><hr/>
                            Wybierz ŚOI z listy po lewej stronie i wypełnij formularz, aby sprawdzić stan techniczny swojego środka ochrony.</>
                        :
                            <>
                                {endOfTest ? 
                                    <>
                                    <h3>Narzędzie do oceny stanu technicznego ŚOI</h3><hr/>
                                    Skończyłeś wypełnianie formularza. Aby poznać wynik kliknij przycisk po lewej.<BsArrowDownLeft/></>
                                :
                                    <>
                                    <h3>Narzędzie do oceny stanu technicznego ŚOI</h3><hr/>
                                    Aby poznać wynik przejrzyj wpierw wszystkie kategorie, zaznacz wszystkie występujące symptomy z listy i określ ich nasilenie.
                                    </>
                                }
                            </>
                        }
                    </div>
                    }
                </div>
            </div>
            {showSubmit &&
                <div id='submit-msg'>
                    <div className='wrapper'>
                        <h3 className={result}>{data["textUI"][result]["title"]}</h3>
                        {<p>
                            {data["textUI"][result]["text"].split(';-;')[0]}
                            <b>({toolKey})</b>
                            {data["textUI"][result]["text"].split(';-;')[1]}
                            
                            <button className={result} onClick={() => { setToolPath(""); setShowSubmit(false); }}>OK</button>
                        </p>}
                    </div>
                </div>
            }
        </div>
    )
}

export default NarzedzieCopy