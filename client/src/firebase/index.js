import firebase from "firebase/app";
import "firebase/storage";
// Initialize Firebase
var config = {
  apiKey: "AIzaSyBWQbkQkB-nOBlmtvjdsXpxHohoUduRZpc",
  authDomain: "fir-feedback-76914.firebaseapp.com",
  databaseURL: "https://fir-feedback-76914.firebaseio.com",
  projectId: "fir-feedback-76914",
  storageBucket: "fir-feedback-76914.appspot.com",
  messagingSenderId: "1057945168797"
};
firebase.initializeApp(config);

const storage = firebase.storage();

export { storage, firebase as default };
