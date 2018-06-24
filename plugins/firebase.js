import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyDL74v9w6sB6XO-2RCTQaJUsojTkqtTZqE",
    authDomain: "axel-gallery.firebaseapp.com",
    databaseURL: "https://axel-gallery.firebaseio.com",
    projectId: "axel-gallery",
    storageBucket: "axel-gallery.appspot.com",
    messagingSenderId: "586204948365"
  })
}

export default firebase