import React, {useRef, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

function Counter(props) {
  const [count,setCount] = useState(0)
  const [isActive,setIsActive] = useState(false)
  const countRef = useRef(null)


  function handleStart(){
    if (isActive){ handlePause()
    return
    }
    countRef.current = setInterval(()=>{setCount(count => count + 1)},1000)
    setIsActive(true)
    
  }
  function handlePause(){
    setIsActive(false)
    clearInterval(countRef.current)
  }
  function handleRestart(){
    clearInterval(countRef.current)
    setIsActive(false)
    setCount(0)
  }

  
  return (
    <div className="container text-center">
      
     <div className="alinharv">
      <h1>Contador:</h1>
      <div className={ isActive ? " glow counter mb-4 mt-4 " : "counter mb-4 mt-4"}>
      <p>{count}</p>
      </div>
      <button className={isActive ? "btn btn-danger" : "btn btn-success"} onClick={handleStart}>{isActive ?"Pausar" : "Iniciar"}</button>
      <button className="btn btn-primary ml-4" onClick={handleRestart}>Reiniciar</button>
    
    </div>
    </div>
  );
}

export default Counter;
