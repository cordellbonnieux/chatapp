

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
/*
const functions = require("firebase-functions");

const Filter = require('bad-words');

const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();
*/
/*
on create not accepting a function as param


exports.detectEvilUsers =
functions.firestore.document(`messages/{msgId}`).onCreate(create(doc, ctx));

async function create(doc, ctx) {
    const filter = new filter();
    const { text, uid } = doc.data();

    if (filter.isProfane(text)) {
        const cleaned = filter.clean(text);
        await doc.ref.update({text: 'I got banned for saying naughty words'});
        await db.collection('banned').doc(uid).set({});
    }
}
*/
