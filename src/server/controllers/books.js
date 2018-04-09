import fetch from 'node-fetch'
import { db, booksRef } from '../models/database'

// private function
// some URLs in the book data still refer to http directly instead of https, so convert them
function makeURLSecure (url) {
    return url.replace(/^http:/, 'https:')
}

// export anonymous object from this module so it can be accessed by others when imported
export default {
    // return all books in database as an Array for use in front end
    listBooks (req, res) {
        booksRef.once('value', snapshot => {
            var result = []
            snapshot.forEach(function(child) {
                var item = child.val()
                // add database KEY to each object so front end can use it for later operations
                item['.key'] = child.key
                result.push(item)
            })
            res.send(JSON.stringify(result))
            res.end()
            console.log(`${result.length} book(s) in database`)
        })
    },
    // add book to database after getting details from Google Books API
    addBook (req, res) {
        console.log(req.body)
        // get parameter values sent from front end
        var title = req.body.title,
            author = req.body.author,
            // encode user input for inclusion within URL
            encodedTitle = encodeURIComponent(title),
            encodedAuthor = encodeURIComponent(author),
            // get book details from API
            url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodedTitle}+inauthor:${encodedAuthor}&maxResults=1`
        // get JSON data to fill in specific book data
        fetch(url).then(response => response.json())
                  .then(data => {
                        // only one result is returned to reduce data load, but it still is returned as an Array
                        var bookInfo = data.items[0]
                        // include data retrieved from JSON API in book fields
                        var key = booksRef.push({
                            title: title,
                            author: author,
                            year: bookInfo.volumeInfo.publishedDate.split('-')[0],
                            description: bookInfo.volumeInfo.description,
                            url: makeURLSecure(bookInfo.volumeInfo.infoLink),
                            imgUrl: makeURLSecure(bookInfo.volumeInfo.imageLinks.thumbnail)
                        })
                        // must send some response back
                        res.send(key)
                        res.end()
                   })
                  .catch(error => console.log(error))
    },
    // remove book from database
    removeBook (req, res) {
        console.log(req.params)
        // get parameter values sent from front end
        booksRef.child(req.params['key']).remove()
        // must send some response back
        res.send(req.params['key'])
        res.end()
    }
}
