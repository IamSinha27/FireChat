

import React, {useContext,useState, useEffect} from 'react';
import { useHistory } from 'react-router';
import { auth } from '../firebase';

// this should have the same name as the context name(file name too)
const AuthContext=React.createContext();  //creates a context named AuthContext 

 export const useAuth=()=>useContext(AuthContext);  //passing the AuthContext through useContext

 export const AuthProvider=({children})=>{  //will import this in the app.js file in order to use it 
     const[loading,setLoading]=useState(true);
     const[user,setUser]=useState(null);
     const history=useHistory(); //useHistory hook

     useEffect(()=>{
       auth.onAuthStateChanged((user)=>{  //function by firebase, takes in a callback function which always takes user as a parameter
           setUser(user);
           setLoading(false);
           if(user) 
           {history.push('/chats');  //as soon as we have signed in , it will renavigate to chats
         }  //will only redirect to the chat if we have the user 
       })
     },[user,history]);  //will only be triggered if history or user is changed
     
     const value={user}; 
    
     return (
         <AuthContext.Provider value={value}>
             {!loading && children}   
         </AuthContext.Provider>
     )
 }
