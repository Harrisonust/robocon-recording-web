import firebase from "firebase/app";
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyAoJZdsj4eWE6Oml7y4mM5mEr7JPh4aiG8",
  authDomain: "recording-735b7.firebaseapp.com",
  databaseURL: "https://recording-735b7-default-rtdb.firebaseio.com/",
  projectId: "recording-735b7",
  storageBucket: "recording-735b7.appspot.com",
  messagingSenderId: "713174885144",
  appId: "1:713174885144:web:cf5dcff96f195a231eb46d",
};

var fire = firebase.initializeApp(firebaseConfig);

export default fire;
