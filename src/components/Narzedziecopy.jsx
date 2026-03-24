import './Narzedzie.css';
import { useEffect, useState } from 'react';
import { BsArrowReturnLeft, BsCaretDown } from "react-icons/bs";

function NarzedzieCopy({toolData}) {

    const [uncoveredH3, setUncoveredH3] = useState("");
    const [toolPath, setToolPath] = useState("");
    useEffect(() => {
        return () => {
            console.log(toolPath)
        };
    }, [toolPath]);

    return(
        <div className='narzedzie_container'>
            <div className='menu'>
                {toolPath.split('/').length < 2 ? 
                <>
                    <h2>Wybierz ŚOI do sprawdzenia</h2><hr/>
                    {Object.entries(toolData).map(([key, items]) => (
                        <div className='categ-wrapper' key={key}>
                            <h3 onClick={() => {
                                uncoveredH3 == key ? 
                                setUncoveredH3("") :
                                setUncoveredH3(key)
                            }}>{key} <BsCaretDown className={uncoveredH3 == key ? 'uncover-arrow rotated-arrow' : 'uncover-arrow'}/></h3>
                            <ul className={uncoveredH3 != key ? "categ-hidden" : "" }>{Object.entries(items).map(([key2, items2]) => (
                                <li onClick={() => setToolPath(key+'/'+key2)} key={key2}>{key2}</li>
                            ))}</ul>
                        </div>
                    ))}
                </>
                :
                <>
                    <BsArrowReturnLeft onClick={() => setToolPath("")} className='return-arrow'/><h2>{toolPath.split('/')[1]}</h2><hr/>
                    {Object.entries(toolData[toolPath.split('/')[0]][toolPath.split('/')[1]]).map(([key, items]) => (
                        <div className='categ-wrapper' key={key}>
                            <h3 onClick={(e) => {
                                uncoveredH3 == key ? 
                                setUncoveredH3("") :
                                setUncoveredH3(key)
                                e.target.className = "read"
                            }}>{key} <BsCaretDown className={uncoveredH3 == key ? 'uncover-arrow rotated-arrow' : 'uncover-arrow'}/></h3>
                            <ul className={uncoveredH3 != key ? "categ-hidden" : "" }>{Object.entries(items["symptoms"]).map(([key2, items2]) => (
                                <li onClick={() => {
                                    if(toolPath.split('/').length < 4){
                                        setToolPath([...toolPath.split('/'), key, key2].join('/'));
                                    }else{
                                        setToolPath([...toolPath.split('/').splice(0,2), key, key2].join('/'))
                                    }
                                }} key={key2}>{key2}</li>
                            ))}</ul>
                        </div>
                    ))}
                    <div id='submit-condition-btn'>Sprawdź stan techniczny</div>
                </>
               } 
                
            </div>
            <div className='information'>
                {
                    toolPath.split('/').length == 4 ?
                    <>
                        <h2>{toolPath.split('/').splice(1,3).join('/')}</h2>
                        <p>{toolData[toolPath.split('/')[0]][toolPath.split('/')[1]][toolPath.split('/')[2]]["symptoms"][toolPath.split('/')[3]]["information"]}</p>
                        
                        <label htmlFor='check' id='check-btn'><input type='checkbox' id='check'/>Zaznacz symptom</label>
                        <div id='continue-btn'>Dalej</div>
                    </>
                    :
                    <>
                    EOEO
                    </>
                }
            </div>
        </div>
    )
}

export default NarzedzieCopy