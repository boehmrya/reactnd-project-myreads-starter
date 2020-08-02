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

    return (
      <div className="app">
        // route element for search page
        <Route exact path='/' render={() => (
          <Main
            books={this.state.books}
            onUpdateBook={this.updateBook}
          />
        )} />

        // route element for main page
        <Route path='/search' render={({ history }) => (
          <Search
            onUpdateBook={this.updateBook}
          />
        )} />



        )}
      </div>
    )
  }
}

export default BooksApp
