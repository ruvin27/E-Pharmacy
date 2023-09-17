const express = require('express')
const cors = require('cors');
const app = express();
const { getDatabase } = require('firebase-admin/database');

app.use(express.json(),cors({
  origin: 'http://localhost:3000',
  methods: 'GET,POST,PUT,DELETE', 
  optionsSuccessStatus: 204,
}));

app.listen(4000, () =>{
    console.log('listening!')
})

var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://e-pharmacy-e4d2e-default-rtdb.firebaseio.com"
});

app.post('/register', async (req,res) =>{
  try{
    const {email,password,name,address,phone} = req.body;
    
    const user = await admin.auth().createUser({
      email,
      password,
      displayName:name
    });
    console.log(user.uid);
    const db = getDatabase();
    const ref = db.ref('/');
    const usersRef = ref.child('users/' + user.uid);
    usersRef.set({
      email: email,
      name: name,
      address: address,
      phone: phone
    });
    
    res.json(user);
    
  }
  catch (error) {
    console.error(error);
    res.status(500).json({error: "Failed"});
  }
});


