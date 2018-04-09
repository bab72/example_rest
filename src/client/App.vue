<template>
<div id="app" class="container">
    <div class="page-header">
        <h1>My Favorite Books</h1>
    </div>
    <!-- Use component's template instead of writing it directly, pass parameters as attributes -->
    <new-book-form
        :inputFields="newBookInput"
        :onSubmit="addBook">
    </new-book-form>
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">Book List</h3>
        </div>
        <div class="panel-body">
            <table class="table">
                <thead>
                    <tr>
                        <th class="first"></th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Year</th>
                        <th></th>
                    </tr>
                </thead>
                <!-- Use component's template instead of writing it directly, pass parameters as attributes -->
                <book-info v-for="book in books"
                    :key="book.title"
                    :book="book"
                    :onRemove="removeBook">
                </book-info>
            </table>
        </div>
    </div>
</div>
</template>

<script>
import { API_URL } from './config'
// use local components, note .vue extension is assumed so not necessary to include
import NewBookForm from './components/NewBookForm'
import BookInfo from './components/BookInfo'

// export anonymous object from this module so it can be accessed by others when imported
export default {
    name: 'app',
    // NOTE in a component, data must be a function that returns a NEW version of the values
    data () {
        return {
            books: [],
            newBookInput: {
                title: '',
                author: ''
            }
        }
    },
    // components (HTML, CSS, and JS) used by this app
    components: {
        NewBookForm,
        BookInfo
    },
    // functions you want to be called from HTML code
    methods: {
        // get books from database using REST API
        listBooks () {
            fetch(`${API_URL}/books`, { method: 'GET' })
                .then(response => response.json())
                .then(data => this.books = data)
                .catch(error => console.log(error))
        },
        // add book to database using REST API
        // NOTE, must list results after request succeeds
        addBook () {
            fetch(`${API_URL}/books`, {
                method: 'POST',
                body: JSON.stringify(this.newBookInput),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(response => this.listBooks())
              .catch(error => console.log(error))
            this.resetInputValues()
        },
        // remove book from database using REST API
        // NOTE, must list results after request succeeds
        removeBook (book) {
            fetch(`${API_URL}/books/${book['.key']}`, { method: 'DELETE' })
                .then(response => this.listBooks())
                .catch(error => console.log(error))
        },
        // clear input form to prepare for the next entry
        resetInputValues () {
            this.newBookInput.title = ''
            this.newBookInput.author = ''
        }
    },
    mounted () {
        this.listBooks()
    }
}
</script>

<style lang="scss" scoped>
/* load global variable definitions so colors can be managed in a single place if needed */
@import "./assets/css/theme.scss";

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: $formColor;
    margin-top: 20px;
}

.table {
    color: $tableColor;
}
</style>
