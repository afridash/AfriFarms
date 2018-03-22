import * as firebase from 'firebase'
//Copy and paste project config from firebase
  var config = {
  //  apiKey: Enter API KEY  ,
  //  authDomain: Enter Domain ,
  //  databaseURL: DB URL,
    //projectId:  Enter projectId,
  //  storageBucket: Enter storageBucket ,
  //  messagingSenderId: Enter messagingSenderId
  }
  export const Firebase = firebase.initializeApp(config)
