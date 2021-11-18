import firebase from "firebase/app";   //is in our node modules folder which is installed using npm
import "firebase/auth";

// const firebaseConfig = {
//     apiKey: "AIzaSyDIf3UVgI2n8bM9ElrcgG1k9GVF38gKcUw",
//     authDomain: "chat-app-25325.firebaseapp.com",
//     projectId: "chat-app-25325",
//     storageBucket: "chat-app-25325.appspot.com",
//     messagingSenderId: "1079265663730",
//     appId: "1:1079265663730:web:996877e749253332d70e6b"
//   };

// the above code is what we copied from firebase, however we need to make some changes to it 
// DOUBT: IS THIS THE DEFAULT SYNTAX FOR THIS ??
export const auth = firebase.initializeApp({
    apiKey: "AIzaSyDIf3UVgI2n8bM9ElrcgG1k9GVF38gKcUw",
    authDomain: "chat-app-25325.firebaseapp.com",
    projectId: "chat-app-25325",
    storageBucket: "chat-app-25325.appspot.com",
    messagingSenderId: "1079265663730",
    appId: "1:1079265663730:web:996877e749253332d70e6b"
  }).auth();