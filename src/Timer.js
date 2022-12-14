import React, { useState, useEffect } from 'react';
import './App.css';

const Timer = () => {

  
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const USA =()=>{
 
    let USATime = new Date().toLocaleTimeString("en-US", 
    {timeZone:'America/Chicago',timestyle:'full'})
   
      
    const [thours, tminutes, tseconds] = USATime.split(':');
  
    let a= parseInt(thours)+parseInt(hours)
    let b= parseInt(tminutes)+parseInt(minutes)
    const [ttseconds, status] = tseconds.split(' ');
    let c= parseInt(ttseconds)+parseInt(seconds)
   
      return(alert("Timer will end "+ a +' : '+ b+' : '+ c +' '+ status +" in USA"))
   
   }
  
   const Aus =()=>{
   
    let AusTime = new Date().toLocaleTimeString("en-US", 
    {timeZone:'Australia/Brisbane',timestyle:'full'})
  
    const [thours, tminutes, tseconds] = AusTime.split(':');
    let a= parseInt(thours)+parseInt(hours)
    let b= parseInt(tminutes)+parseInt(minutes)
    const [ttseconds, status] = tseconds.split(' ');
    let c= parseInt(ttseconds)+parseInt(seconds)
   
      return(alert("Timer will end "+ a +' : '+ b+' : '+ c +' '+ status +" in Australia"))
   
   }
  
   const Japan =()=>{
   
    let JapanTime = new Date().toLocaleTimeString("en-US", 
    {timeZone:'Asia/Tokyo',timestyle:'full'})
    const [thours, tminutes, tseconds] = JapanTime.split(':');
    let a= parseInt(thours)+parseInt(hours)
    let b= parseInt(tminutes)+parseInt(minutes)
    const [ttseconds, status] = tseconds.split(' ');
    let c= parseInt(ttseconds)+parseInt(seconds)
   
      return(alert("Timer will end "+ a +' : '+ b+' : '+ c +' '+ status +" in Japan"))
   
   }
  
  function toggle() {
    setIsActive(!isActive);
    setIsDisabled(!isDisabled); //disable input on play
  
    if (seconds===0 && minutes===0 && hours===0)
    {
      setIsActive(isActive);
      alert("Enter Time as input!")
      setIsDisabled(isDisabled);
    }}
function reset(){
 
  setSeconds(0);
  setMinutes(0);
  setHours(0);
  
  if (seconds===0 && minutes===0 && hours===0)
  {
    setIsActive(isActive);
    alert("Enter Time as input!")
    
  }
}
 
  var interval;
  
 
  useEffect(() => {

           
    if (seconds<0 || minutes<0 || hours<0 || seconds>60 || minutes>60 || hours>24)
    {
      setSeconds(0);
      setMinutes(0);
      setHours(0);
      
     
      clearInterval(interval);
      return (alert("Wrong Input!"))
    }
    if (seconds===0 && minutes===0 && hours===0)
    {
      setIsDisabled(isDisabled);
      setSeconds(0);
      setMinutes(0);
      setHours(0);
      clearInterval(interval);
      setIsActive(false);
      alert('Timeout')
     
    }
     
    if (isActive) { 
      interval = setInterval(() => {

        setSeconds(seconds-1)
        if (seconds===0 && minutes>0)
        {
          setSeconds(59)
          setMinutes(minutes-1) 
        }
        if (seconds===0 && minutes>0 && hours>0)
{
  setSeconds(59)
  setMinutes(minutes-1)
 
}
        if (seconds===0 && minutes===0 && hours>=0)
{
  setSeconds(59)
  setMinutes(59)
  setHours(hours-1)
}


      }, 1000);
    } 
   else if (!isActive && seconds !==0) {
     
      clearInterval(interval);
      
    }
   
    return () => clearInterval(interval);
    

  }, [isActive, seconds, minutes, hours]);

  
  return (
    
    <div className="app">
      
      <div className="time">
      <span>Enter Hours : <input maxLength={2}  onChange={(e) => { if ((isNaN(e.target.value)))
         { 
          alert('Only Numbers are allowed')
          e. target. value = e. target. value. slice(0, e. target) }
          else ( setHours(e.target.value));}} disabled={isDisabled} placeholder='00'/> 
            </span>
      <span>Enter Minutes : <input maxLength={2}  onChange={(e) => { if ((isNaN(e.target.value)))
         { 
          alert('Only Numbers are allowed')
          e. target. value = e. target. value. slice(0, e. target) }
          else ( setMinutes(e.target.value));}}  disabled={isDisabled} placeholder='00'/>
        </span>
      <span>Enter Seconds : <input maxLength={2}  onChange={(e) => { if ((isNaN(e.target.value)))
         { 
          alert('Only Numbers are allowed')
          e. target. value = e. target. value. slice(0, e. target) }
          else ( setSeconds(e.target.value));}} 
          disabled={isDisabled}placeholder='00'/></span>

       </div>
      <h1 className="timeclock">{hours<10 ? "0"+ hours:hours} hrs : {minutes<10? "0"+ minutes:minutes} min : {seconds<10? "0" +seconds:seconds} sec</h1>
      <h1>Select Timezone :</h1>
      <select className="watches">
   <option value="USA" onClick={USA}>USA</option>
   <option value="Australia" onClick={Aus}>Australia</option>
   <option value="Japan" onClick={Japan}>Japan</option>
        </select>
  
    
     
      <div className="row">
        <button className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`} onClick={toggle}>
          {isActive ? 'Pause' : 'Play'}
        </button>
        <button className="button" onClick={reset} >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;