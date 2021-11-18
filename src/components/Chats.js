// import React, {useRef,useEffect} from 'react'
// import { useHistory } from 'react-router';
// import {ChatEngine, getChat} from 'react-chat-engine';
// import { auth } from '../firebase';

// import { useAuth } from '../contexts/AuthContext';
// import { useState } from 'react';
// import axios from 'axios';
// import { Loading3QuartersOutlined } from '@ant-design/icons';

// const Chats = () => {

//     const history=useHistory();
//     // is an async function since it uses api calls through firebase

//     const {user}=useAuth();  //user object DOUBT, TO GET USER DATA FOR CHAT ENGINE from useauth

//     const[loading, setLoading]=useState(false);

//    const handleLogout= async()=>{
//        await auth.signOut();
//        history.push('/');  //will redirect to the homepage once logged out 
//    }

//    const getFile= async (url)=>{
//        const response= await fetch(url);
//        const data= await response.blob();

//        return new File([data], "userPhoto.jpeg", {type:'image/jpeg'})
//    }



//    //whenever the page loads
//    useEffect(()=>{
//        if(!user)
//        {
//            history.push('/');  //if no user then it will push it to
//            return ;  //DOUBT: WHY RETURN 
//        }

//     //    incase we have user

//     axios.get('https://api.chatengine.io/user.me/',{
//         headers:{
//             "project-id":'c33f9f71-f9d7-4836-b56f-29d48108e544',
//             "user-name": user.email, //comes from the useAuth context in line 15
//             "user-secret": user.uid,
//         }
//     })
//       .then(()=>{
//           setLoading(false);
//       })
//       .catch((e)=>{
//           let formdata= new FormData();        //DOUBT NEW KEYWORD, creates a constructor function 
//           formdata.append('email', user.email)   //appending properties to the FormData constructor function 
//           formdata.append('username', user.email);
//           formdata.append('secret', user.uid);

//           getFile(user.photoURL)
//           .then((avatar)=>{
//               formdata.append('avatar', avatar, avatar.name);

//               axios.post('https://api.chatengine.io/user/',
//               formdata,
//               {headers:{"private-key":"562af1f1-a835-4508-80d1-bc6bed62f42e"} }
//               )
//               .then(()=>setLoading(false))
//               .catch((error)=>console.log(error))
//           })
//       })
//    },[user,history]);

// if(!user || loading)
// {
//     return 'Loading...'
// }

//     return (
//         <div className="chats-page">
//             <div class="nav-bar">
//                 <div className="logo-tab">
//                     HiiighPower
//                 </div>
//                 <div onClick={handleLogout} className="logout-tab">   
//                     Logout
//                 </div>
//             </div>
//            {/* DOUBT */}
//           <ChatEngine    //the chat engine component that we imported 
//               height="calc(100vh-66px)"
//               projectID="c33f9f71-f9d7-4836-b56f-29d48108e544"  //copied from the project website
//               userName={user.email}
//               userSecret={user.uid}
//           />

          


//         </div>
//     )
// }

// export default Chats;



import React, { useRef, useState, useEffect } from "react"

import axios from 'axios'
import { useHistory } from "react-router-dom"
import { ChatEngine } from 'react-chat-engine'

import { useAuth } from "../contexts/AuthContext"

import { auth } from "../firebase"
import Navbar from "./Navbar"

export default function Chats() {
  const didMountRef = useRef(false)
  const [ loading, setLoading ] = useState(true)
  const { user } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    await auth.signOut()
    history.push("/")
  }

  async function getFile(url) {
    let response = await fetch(url);
    let data = await response.blob();
    return new File([data], "test.jpg", { type: 'image/jpeg' });
  }

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true

      if (!user || user === null) {
        history.push("/")
        return
      }
      
      // Get-or-Create should be in a Firebase Function
      axios.get(
        'https://api.chatengine.io/users/me/',
        { headers: { 
          "project-id": 'c33f9f71-f9d7-4836-b56f-29d48108e544',
          "user-name": user.email,
          "user-secret": user.uid
        }}
      )
      .then(() => setLoading(false))
      .catch(e => {                    //if user not existing, then will create a formdata const function and create the user which later will be uploaded by POST method
        let formdata = new FormData()
        formdata.append('email', user.email)
        formdata.append('username', user.email)
        formdata.append('secret', user.uid)


        getFile(user.photoURL)
        .then(avatar => {
          formdata.append('avatar', avatar, avatar.name)


          // POST
          axios.post(
            'https://api.chatengine.io/users/',
            formdata,
            { headers: { "private-key":"562af1f1-a835-4508-80d1-bc6bed62f42e"}}
          )
          .then(() => setLoading(false))
          .catch(e => console.log('e', e.response))
        })
      })
      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    }
  }, [user, history])
  

  if (!user || loading) return <div />

  return (
    <div className='chats-page'>
     <Navbar
       clicked={handleLogout}
       logoName="FireChat"
       text="Logout"
     />

      <ChatEngine 
        height='calc(100vh - 66px)'
        projectID='c33f9f71-f9d7-4836-b56f-29d48108e544'
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  )
}
