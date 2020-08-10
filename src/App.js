import React from 'react'
import * as BooksAPI from './BooksAPI'
import Main from './Main'
import Search from './Search'
import { Route } from 'react-router-dom'
import './App.css'


class BooksApp extends React.Component {

  state = {
    books: [],
    shelfIndex: {}
  }

  getBooks = () => {
    BooksAPI.getAll()
      .then((books) => {
        // create shelf index to add shelf data to search page
        let shelfIndex = {}
        for (var book of books) {
          shelfIndex[book.id] = book.shelf
        }

        this.setState(() => ({
          books: books,
          shelfIndex: shelfIndex
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
        return b
      })
    }))
    BooksAPI.update(book, shelf)
  }


  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <Main
            books={this.state.books}
            getBooks={this.getBooks}
            onUpdateBook={this.updateBook}
          />
        )} />

        <Route path='/search' render={() => (
          <Search
            books={this.state.books}
            getBooks={this.getBooks}
            shelfIndex={this.state.shelfIndex}
            onUpdateBook={this.updateBook}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
