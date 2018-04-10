// setup database
import { db } from './models/database'
if (db) {
    console.log('Successfully connected to database')
}
else {
    console.log('Could not connect to the database. Exiting now...')
    process.exit()
}


// use Express as our router
import Express from 'express'
import BodyParser from 'body-parser'
import Cors from 'cors'

// create express app
const app = Express()
// allow requests from any domain, no cross site concerns
app.use(Cors())
// parse form data more easily
app.use(BodyParser.urlencoded({ extended: true }))
// parse JSON form data
app.use(BodyParser.json())


// our local code that will respond to URL requests
import Books from './controllers/books'

// list of URLs (and their protocols) that this server responds to
// retrieve all books
app.get('/books', Books.listBooks)
// add new book
app.post('/books', Books.addBook)
// delete given book
app.delete('/books/:key', Books.removeBook)
// nothing useful for root URL to do
app.get('/', (req, res) => {
    res.json({"message": 'Welcome to Book List Tracker!'})
    res.end()
})


// get important variables that change frequently
import { HOST, PORT } from './config'

// start server to listen for requests
app.listen(PORT, HOST, function() {
    console.log(`Server is listening on port http://${this.address().address}:${this.address().port}`);
})
