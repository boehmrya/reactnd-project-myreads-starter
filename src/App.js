import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookGrid from './BookGrid'
import Search from './Search'
import { Link } from 'react-router-dom'
import './App.css'

class BooksApp extends React.Component {

  state = {
    books: []
  }

  // get all books
  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }

  // update the shelf of a book
  updateBook = (book, shelf) => {
    this.setState((currentState) => ({
      books: currentState.books.map((b) => {
        if (b.id === book.id) {
          b.shelf = shelf
        }
      })
    }))
    BooksAPI.update(contact, shelf)
  }


  // helper function to filter books by category

  render() {
    const currentlyReading = books.filter((b) => (
        b.shelf === 'currentlyReading'
      ))

    const wantToRead = books.filter((b) => (
        b.shelf === 'wantToRead'
      ))

    const read = books.filter((b) => (
        b.shelf === 'read'
      ))

    return (
      <div className="app">
        // route element for search page
        <Route exact path='/' render={() => (
          <Main books={this.state.books} />
        )} />

        // route element for main page
        <Route path='/search' render={({ history }) => (
          <Search
            onCreateContact={(contact) => {
              this.createContact(contact)
              history.push('/')
            }}
          />
        )} />



        )}
      </div>
    )
  }
}

export default BooksApp
