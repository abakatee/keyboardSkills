import './particles.css'
import React, { useEffect, useRef, useState } from 'react'



function Effects(props){


    const intervalRef = useRef(null)
    var nbDrop = 90;
    var i = 0
    var combo = 1
    var box = ""

function randRange( minNum, maxNum) {
    return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
  }


function handlerColor(){
    let drop = []
    
    //console.log(combo)
    if(combo == 1){
        drop = "linear-gradient(to bottom, rgba(255,255,255,0) 0%, white 100%)"
        box = "0 0 0.5px white"
    }else if(combo == 2){
        drop = "linear-gradient(to bottom, rgba(255,255,255,0) 0%, orange 100%)"
        box = "0 0 0.5px orange"
    }else if(combo == 3){
        drop = "linear-gradient(to bottom, rgba(255,255,255,0) 0%, #cc0085 100%)"
        box = "0 0 0.5px #cc0085"
    }else if(combo == 4){
        drop = "linear-gradient(to bottom, rgba(255,255,255,0) 0%,  red 100%)"
        box = "0 0 0.5px red"
    }

    return(drop)
}

  function createRain(){
    
    var dropLeft = randRange(0,350);
    let drop = document.createElement("DIV")
    drop.className = "drop"
    drop.style.left = `${dropLeft}px`
    let animDuration = Math.random()  * (3.5 -1.5 +1) + 1.5 
    drop.style.animationDuration = `${animDuration}s`
    drop.style.animationDelay = randRange(0,3)
    drop.id = `drop${i + props.nameClass}`
    drop.style.backgroundImage = handlerColor()
    drop.style.boxShadow = box
    let id = drop.id
    document.getElementById(props.nameClass).appendChild(drop)
    setTimeout(() =>{eraseDrop(id)},animDuration * 1000)
    i++

}

function eraseDrop(id){
   let drop = document.getElementById(id)
    if(drop !== null){
        drop.remove()
    }
  
}
    useEffect(()=>{
        setInterval(() => {
            combo += 1
            if(combo == 5) combo = 1 
        }, 6000);
       intervalRef.current =  setInterval(createRain,80)

       return function cleanTimer(){
           clearInterval(intervalRef.current)
        }
    },[])
    
    


        return(
        <div className={props.nameClass} id={props.nameClass}>

        </div>
            )
} 

export default Effects