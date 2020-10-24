import React, { useRef, useState } from 'react';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Effects from './particles'



function Mechanics(props) {
    const [character, setCharacter] = useState('X')
    const [multiplier, setMultiplier] = useState(0)
    const [isMultiplier, setIsMultiplier] = useState(false)
    const [finalScore, setFinalScore] = useState(0)
    const [score, setScore] = useState(0)
    const [combo, setCombo] = useState(0)
    const [isActive, setIsActive] = useState(false)
    const [progress, setProgress] = useState(100)
    const [particles,SetParticles] = useState(true)
    const finalRef = useRef(null)
    const listRef = useRef(null)
    const timerRef = useRef(null)
    const scoreRef = useRef(null)


    const all = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    var currentChar = ''
    var currentProgress = 100
    var currentActive = false
    var currentMultiplierNum = 0
    var currentMultiplier = 0
    var currentCombo = 0


    function handleStart() {
        if (isActive === true) {

        } else {
            setFinalScore(0)
            currentActive = true
            finalRef.current.classList.remove("collapse")
            finalRef.current.classList.add("collapse")
            setIsActive(currentActive)
            handleGenerator()
            listRef.current = window.addEventListener('keydown', handleVerification)
            timerRef.current = setInterval(handleProgress, 47)

        }
    }
    function handleGenerator() {
        let num = currentCombo
        num = num.toString()
        if (parseInt(num[num.length - 1]) === 0 && num.length !== 1) {
            console.log('aqui')
            currentChar = 'Space'
            setCharacter(currentChar)
            return
        }

        currentChar = all[Math.floor(Math.random() * all.length)]
        setCharacter(currentChar)

        handleMultiplier()
    }

    function handleMultiplier() {
        let n = Math.floor(Math.random() * 6)
        if (n === 5) {
            currentMultiplier = true
            currentMultiplierNum = Math.floor(Math.random() * 7 + 3)

            setMultiplier(currentMultiplierNum)
            setIsMultiplier(currentMultiplier)
        }
    }


    function handleScore(plus){
        currentProgress += plus
        setProgress(currentProgress)
        if(plus !== -10){
        setScore(score => score + 1)
        setFinalScore(finalScore => finalScore + 1)
        setCombo(combo => combo + 1)
        currentCombo += 1
        handleGenerator()}
    }

    function handleVerification(event) {

        if (currentActive === true) {
            if (currentChar === 'Space' && event.key === " ") {
                handleScore(23)
                return
            } else if (currentChar === 'Space') {
                setCombo(0)
                currentCombo = 0
                handleScore(-10)
                return
            }

            if (event.key.toUpperCase() === currentChar) {
                if (currentMultiplier) {
                    console.log('chegou')
                    currentMultiplierNum -= 1
                    setMultiplier(currentMultiplierNum)
                    currentProgress += 5
                    setProgress(currentProgress)
                    if (currentMultiplierNum === 0) {
                        currentMultiplier = false
                        setIsMultiplier(currentMultiplier)
                        handleScore(4)

                    }
                } else {
                    handleScore(11)
                }
            } else {
                handleScore(-10)
                setCombo(0)
                currentCombo = 0
            }
        }


    }
    function handleProgress(){
        currentProgress -= 1
        setProgress(currentProgress)
        if (currentProgress <= 0) {
            gameOver()   
        }
    }

    function gameOver() {
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
    function handleParticles(){
        SetParticles(particles => particles = !particles)
    }



    return (
        <>
           {particles ? <Effects nameClass="main" currentCombo={combo}></Effects> : null}
            <div className="container text-center">

                <h1 className="display-3">Keyboard Skills</h1>
                <div className="d-flex justify-content-center ">
                    <div className="comboAdjust"></div>
                    <div className="alinharv">
                        <h1>Counter:</h1>

                        <div className={isActive ? " glow counter mb-4 mt-4 " : "counter mb-4 mt-4"}>
                            <p ref={scoreRef}>{character}{isMultiplier ? <span className="text-primary text-left text-nowrap">{" x" + multiplier}</span> : ""}</p>

                        </div>
                        <p>Score: {score}</p>
                        <button className={isActive ? "btn btn-primary" : "btn btn-success"} onClick={handleStart}>{isActive ? <span className="spinner-border"></span> : "Start"}</button>
                    </div>
                    <div className="combo">
                        <p className="">{combo}</p>
                    </div>
                </div>
                <div className="progress mt-4 mx-auto mb-2">
                    <div className="progress-bar" role="progressbar"
                        aria-valuemin="0" aria-valuemax="100" style={{ width: progress + "%" }}>
                        <span className="sr-only">70% Complete</span>
                    </div>
                </div>
                <h2 ref={finalRef} className={"mt-4 collapse"}>Your final score was :{finalScore}</h2>
                <p>Stop Particles:</p>
                    <label className="switch">
                        <input type="checkbox" onClick={handleParticles}></input>
                        <span className="slider round"></span>
                    </label>
            </div>
            <div className="bg"></div>
            {particles ? <Effects nameClass="mainRight" currentCombo={combo}></Effects> : null}
        </>

    );
}

export default Mechanics;
