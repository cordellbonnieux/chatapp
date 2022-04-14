import './App.css'
import React from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

import { useAuthState } from 'react-firebase-hooks/auth'
import { usecollectionData } from 'react-firebase-hooks/firestore'

firebase.initializeApp({
  apiKey: "AIzaSyBQLP75avSXbBL1ulKUmFDnSHvsLXVFCEU",
  authDomain: "chatapp-60ec8.firebaseapp.com",
  projectId: "chatapp-60ec8",
  storageBucket: "chatapp-60ec8.appspot.com",
  messagingSenderId: "297251340167",
  appId: "1:297251340167:web:2c6e56c3bdc7eceffadd22",
  measurementId: "G-61P4VE8G99"
})

const auth = firebase.aurth()
const firestore = firebase.firestore()

function App() {

  const [user] = useAuthState(auth)

  return (
    <div className="App">
      <header className="App-header">

      </header>
      <section>
        { user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleauthProvider()
  }

  return (
    <button onClick={signInWithGoogle}>Sign In With Google</button>
  )
}

export default App
