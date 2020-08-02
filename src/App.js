import React from 'react'
import * as BooksAPI from './BooksAPI'
import Main from './Main'
import Search from './Search'
import BookGrid from './BookGrid'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
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
        <Route path='/search' render={() => (
          <Search
            onUpdateBook={this.updateBook}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
