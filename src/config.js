import firebase from 'firebase';
require('firebase/firestore');

let config = {
  apiKey: 'AIzaSyCsHPGB0Zmv3468gMFuk4dbKmuXoacid0U',
  authDomain: 'my-gps-94a6c.firebaseapp.com',
  databaseURL: 'https://my-gps-94a6c.firebaseio.com',
  projectId: 'my-gps-94a6c',
  storageBucket: 'my-gps-94a6c.appspot.com',
  messagingSenderId: '720146341436',
  appId: '1:720146341436:web:0ad186d8ee073c47baad39',
};
firebase.initializeApp(config);
const db = firebase.firestore();
export default db;
