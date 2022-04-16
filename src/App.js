import './App.css'
import React from 'react'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection, useCollectionData } from 'react-firebase-hooks/firestore'

firebase.initializeApp({
  apiKey: "AIzaSyBQLP75avSXbBL1ulKUmFDnSHvsLXVFCEU",
  authDomain: "chatapp-60ec8.firebaseapp.com",
  projectId: "chatapp-60ec8",
  storageBucket: "chatapp-60ec8.appspot.com",
  messagingSenderId: "297251340167",
  appId: "1:297251340167:web:2c6e56c3bdc7eceffadd22",
  measurementId: "G-61P4VE8G99"
})

const auth = firebase.auth()
const firestore = firebase.firestore()
const logo = ''

function App() {

  const [user] = useAuthState(auth)

  return (
    <div className="App">
      <header>
        <h1>Chat App</h1>
        { user ? <SignOut /> : <SignIn />}
      </header>
      <section>
        { user ? <ChatRoom /> : <Landing />}
      </section>
    </div>
  );
}

function Landing() {
  return (
    <div>
      <h2>A project by Cordell Bonnieux</h2>
      <p>
        This is a demonstration of a fullstack React.js application using a NoSQL
        database via Firebase. Sign in with your Google account to leave a message, but please
        don't leave any nasty messages!
      </p>
    </div>
  )
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }
  return (
    <button onClick={signInWithGoogle}>
      <span>Sign In With Google</span>
    </button>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom() {
  const messagesRef = firestore.collection('messages')
  const query = messagesRef.orderBy('createdAt').limit(25)

  const [ messages ] = useCollectionData(query, {idField: 'id'})
  const [ formValue, setFormValue ] = React.useState('')

  const sendMessage = async(e) => {
    e.preventDefault()
    const { uid, photoURL } = auth.currentUser

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('')
  }

  return (
    <>
      <div id="messages">
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
      </div>
      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
        <button type="submit">send</button>
      </form>
    </>
  )
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'recevied'

  const img = <img src={photoURL} alt={`user's image`} />

  return (
    <div className={`message ${messageClass}`}>
      {img}
      <p>{text}</p>
    </div>
  )
}

export default App
