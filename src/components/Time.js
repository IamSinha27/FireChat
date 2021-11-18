import React, { useState } from 'react'
import Navbar from './Navbar';
import { useHistory } from 'react-router';
import Speech from 'react-speech';


const Time = () => {
  
    const history=useHistory();

    const d= new Date();

    const[currentTime,setTime]=useState(d.toLocaleTimeString())

    const updateTime=()=>{
        const date= new Date();
        const newTime= date.toLocaleTimeString();
        setTime(newTime);

    }

    setInterval(updateTime,1000);
    
    return (
        <div>
          <Navbar
              clicked={()=>history.push('/')}
              logoName="FireTime"
              text="Go Home"
          />

          <div id="login-card">
               <h1 style={{backgroundColor:"Orange", borderRadius:"20px"}}>{currentTime}</h1>
          </div>
        </div>

        
    )
}

export default Time;
