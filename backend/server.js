const express = require('express')
const firebaseConfig = require('../src/firebase')
const app = express()

app.listen(4000, () =>{
    console.log('listening!')
})

var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://e-pharmacy-e4d2e-default-rtdb.firebaseio.com"
});

// const db = admin.database();
// const ref = db.ref('users'); // Replace with the path you want to query

// ref.once('value', (snapshot) => {
//   const data = snapshot.val();
//   console.log(data);
// })
// .catch((error) => {
//   console.error('Error fetching data:', error);
// });