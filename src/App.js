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

      </header>
      <section>
        { user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }
  return (
    <button onClick={signInWithGoogle}>Sign In With Google</button>
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
      <header>
        <img src={logo} alt='chatapp' />
        <SignOut />
      </header>
      <div>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
      </div>
      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
        <button type="submit">submit</button>
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
