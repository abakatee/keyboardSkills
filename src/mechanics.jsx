import React, { useRef, useState } from 'react';
import Particle from 'react-particles-js'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Effects from './particles'



function Mechanics(props) {
    const testee = props.score
    const [character, setCharacter] = useState('X')
    const [multiplier, setMultiplier] = useState(0)
    const [isMultiplier, setIsMultiplier] = useState(false)
    const [finalScore, setFinalScore] = useState(0)
    const [score, setScore] = useState(0)
    const [combo,setCombo] = useState(0)
    const [isActive, setIsActive] = useState(false)
    const [progress,setProgress] = useState(100)
    const finalRef = useRef(null)
    const listRef = useRef(null)
    const timerRef = useRef(null)


    const all = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    var currentChar = ''
    var currentProgress = 100
    var currentActive = false
    var currentMultiplierNum = 0
    var currentMultiplier = 0


    function handleStart() {
        if (isActive === true) {

        } else {
            setFinalScore(0)
            currentActive = true
            finalRef.current.classList.remove("collapse")
            finalRef.current.classList.add("collapse")
            setIsActive(currentActive)
            handleGenerator()
            listRef.current = window.addEventListener('keyup', handleVerification)
            timerRef.current = setInterval(handleStop, 50)
            
        }
    }
    function handleGenerator(){
        currentChar = all[Math.floor(Math.random() * all.length)]
        setCharacter(currentChar)
        let n = Math.floor(Math.random() * 6)
        if(n === 5 ){
            currentMultiplier = true
            currentMultiplierNum = Math.floor(Math.random() * 7 +3)

            setMultiplier(currentMultiplierNum)
            setIsMultiplier(currentMultiplier)
            console.log('multiplayer' + isMultiplier)
    
        }
    }
   


    function handleVerification(event) {
        if(currentActive === true){
            if (event.key.toUpperCase() === currentChar) {
                if(currentMultiplier){
                    console.log('chegou')
                    currentMultiplierNum -= 1
                    setMultiplier(currentMultiplierNum)
                    currentProgress += 5
                    setProgress(currentProgress)
                    if(currentMultiplierNum === 0){
                        console.log('chegou no 0')
                        currentMultiplier = false
                        setIsMultiplier(currentMultiplier)
                        setCombo(combo => combo + 1)
                        setScore(score => score + 1)
                        setFinalScore(finalScore => finalScore + 1)
                        handleGenerator()

                        
                    }
                }else{
                handleGenerator()
                setScore(score => score + 1)
                setFinalScore(finalScore => finalScore + 1)
                setCombo(combo => combo + 1)
                console.log(finalScore)
                currentProgress += 13
                setProgress(currentProgress)
                }  
            }else{
                setCombo(0)
            }
        }

      
    }
    function handleStop(){
        currentProgress -= 1
        setProgress(currentProgress)
        
        if(currentProgress <= 0 ){
            currentActive = false
            setIsActive(currentActive)
            console.log('acabou')
            clearInterval(timerRef.current)
            currentProgress = 100
            setProgress(currentProgress)
            setCharacter("X")
            currentMultiplier = false
            setIsMultiplier(currentMultiplier)
            setScore(0)
            setCombo(0)
            finalRef.current.classList.remove("collapse")
            
        }
    }



    return (
        <>
        <Effects nameClass="main" currentCombo={combo}></Effects>
        <div className="container text-center">
       
            <h1 className="display-3">Keyboard Skills</h1>
            <div className="d-flex justify-content-center ">
            <div className="comboAdjust"></div>
            <div className="alinharv">
                <h1>Contador:</h1>
                <div className={isActive ? " glow counter mb-4 mt-4 " : "counter mb-4 mt-4"}>
                    <p>{character }{isMultiplier ? <span className="text-primary text-left text-nowrap">{" x" + multiplier}</span> : ""}</p>
    
                </div>
                <p>Pontuação: {score}</p>
                <button className={isActive ? "btn btn-primary" : "btn btn-success"} onClick={handleStart }>{isActive ? <span className="spinner-border"></span>  : "Iniciar"}</button>
            </div>
            <div className="combo">
            <p className="">{combo}</p>
            </div>
            </div>
            <div className="progress mt-4 mx-auto">
                    <div className="progress-bar" role="progressbar" 
                        aria-valuemin="0" aria-valuemax="100" style={{width:progress+"%"}}>
                        <span className="sr-only">70% Complete</span>
                    </div>
                </div>
                <h2 ref={finalRef} className={"mt-4 collapse"}>Sua pontuação final foi :{finalScore}</h2>
             
        </div>
        <div className="bg"></div>
        <Effects nameClass="mainRight" currentCombo={combo}></Effects>
        </>
        
    );
}

export default Mechanics;
