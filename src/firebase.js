import firebase from 'firebase/app';
import 'firebase/firestore';

// Your web app's Firebase configuration
//https://console.firebase.google.com/project/react-crud-firestore-hooks/settings/general/web:N2U3MWJlYTUtZjk5NC00MjI2LWE1Y2ItODk4ZmRkMWUwZGM4
const  firebaseConfig = {
    apiKey: "AIzaSyBP7i2DLbnJV-_tF9TN3vQfweFeEdkeiOc",
    authDomain: "react-crud-firestore-hooks.firebaseapp.com",
    databaseURL: "https://react-crud-firestore-hooks.firebaseio.com",
    projectId: "react-crud-firestore-hooks",
    storageBucket: "react-crud-firestore-hooks.appspot.com",
    messagingSenderId: "376930908581",
    appId: "1:376930908581:web:473e6933f5e98c7987104c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export {firebase};