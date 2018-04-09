// use Firebase as our database
import Firebase from 'firebase'

// configure database
var config = {
    apiKey: "AIzaSyALmW2B2aJOtwCbikL6fI3RyfZejpKvgYI",
    authDomain: "book-list-70bcc.firebaseapp.com",
    databaseURL: "https://book-list-70bcc.firebaseio.com",
    projectId: "book-list-70bcc",
    storageBucket: "book-list-70bcc.appspot.com",
    messagingSenderId: "167870498358"
}
// connect to database
export const db = Firebase.initializeApp(config).database()

// create useful endpoints within the database
export const booksRef = db.ref('books')

