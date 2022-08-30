import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyC1Dg0NF-CFsvuO-XvD9OIAuwRDoOy1IXc",
  authDomain: "todo-v2-11bf6.firebaseapp.com",
  projectId: "todo-v2-11bf6",
  storageBucket: "todo-v2-11bf6.appspot.com",
  messagingSenderId: "639354247966",
  appId: "1:639354247966:web:0bae51b55ff8d771a5470f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider()
export const db = getFirestore(app);


// export const signInWithGoogle = () => signInWithPopup(auth, provider)
export const signInWithGoogle = () => signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    //const credential = GoogleAuthProvider.credentialFromResult(result);
    //const token = credential.accessToken;
    // The signed-in user info.
    //const user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    //console.log(error.message)
    //const errorCode = error.code;
    //const errorMessage = error.message;
    // The email of the user's account used.
    //const email = error.customData.email;
    // The AuthCredential type that was used.
    //const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });