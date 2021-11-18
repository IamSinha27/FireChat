import React from 'react';
import {GoogleOutlined, FacebookOutlined} from '@ant-design/icons';
import firebase from 'firebase';
import { useHistory } from 'react-router';

import {auth} from "../firebase";  //it is the auth object that we are exporting from the firebase.js file 
 const Login = () => {

    const history=useHistory();


    return (
        <div id="login-page">
            <div id="login-card">
                <h2>Welcome to FireChat!</h2>

                <div 
                className="login-button google"
                onClick={()=>auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())} 
                >
                    <GoogleOutlined/> Sign In with Google
                </div>

                <br/> <br/>

                {/* <div 
                className="login-button facebook"
                // onClick={()=>auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider() )}
                >
                    <FacebookOutlined/> Sign In with Facebook
                </div> */}

                {/* <div
                className="login-button facebook"
                onClick={()=>history.push('/time')}
                >Check Time</div> */}
            </div>
        </div>
    )
}

export default Login;