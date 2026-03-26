import './Narzedzie.css';
import { useEffect, useState } from 'react';
import { BsArrowReturnLeft, BsCaretDown } from "react-icons/bs";

function NarzedzieCopy({toolData}) {
    const [uncoveredH3, setUncoveredH3] = useState("");
    const [toolPath, setToolPath] = useState("");
    const [categs, setCategs] = useState(0);
    const [openedCategs, setOpenedCategs] = useState([]);
    const [testPoints, setTestPoints] = useState({});

    const pathParts = toolPath.split(';-;');
    const mainKey = pathParts[0];
    const toolKey = pathParts[1];
    const currentCatKey = pathParts[2];
    const symptomKey = pathParts[3];
    const isSymptomView = pathParts.length === 4;
    const isToolSelected = pathParts.length >= 2;

    const symptomData = isSymptomView ? toolData[mainKey]?.[toolKey]?.[currentCatKey]?.["symptoms"]?.[symptomKey] : null;
    const currentPointState = isSymptomView ? testPoints[currentCatKey]?.[symptomKey] : null;
    const allCategories = isSymptomView ? Object.keys(toolData[mainKey][toolKey]) : [];
    const currentCatSymptoms = isSymptomView ? Object.keys(toolData[mainKey][toolKey][currentCatKey].symptoms).filter(s => s !== "") : [];
    const isLastCategory = isSymptomView && allCategories.indexOf(currentCatKey) === allCategories.length - 1;
    const isLastSymptom = isSymptomView && currentCatSymptoms.indexOf(symptomKey) === currentCatSymptoms.length - 1;

    useEffect(() => {
        if (!isToolSelected) {
            setOpenedCategs([]);
            setTestPoints({});
            setCategs(0);
            return;
        }

        const selectedTool = toolData[mainKey]?.[toolKey];

        if (selectedTool) {
            const categoryKeys = Object.keys(selectedTool);
            setCategs(categoryKeys.length);
            
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
            const newKeys = Object.keys(initialPoints);
            if (prevKeys.length === 0 || prevKeys[0] !== newKeys[0]) {
                return initialPoints;
            }
            return prev;
        });
        }
    }, [toolPath, toolData]);

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
                                        >
                                            {sKey}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className='shadow'/>
                    <div id='submit-condition-btn' className={openedCategs.length === categs && categs > 0 ? "" : "disable"}>
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
                                    const newMultiplier = isChecked ? (symptomData?.hasRange === 1 ? 0.1 : 1) : 0;

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
                                <div className='range-wrapper' style={{ '--range-pos': `${(Math.round((currentPointState?.multiplier || 0.1) * 10) - 1) * 11.11}%`,
                                                                        '--green-color': `${currentPointState?.multiplier}`}}>
                                    
                                    <div className="range-bubble">
                                        {Math.round((currentPointState?.multiplier || 0) * 10)}
                                    </div>

                                    <input 
                                        type='range' 
                                        min={1} 
                                        max={10} 
                                        step={1}
                                        value={Math.round((currentPointState?.multiplier || 0) * 10) || 1}
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
                    <div className='empty-info'>Wybierz symptom z listy po lewej, aby rozpocząć ocenę.</div>
                    }
                </div>
            </div>
        </div>
    )
}

export default NarzedzieCopy