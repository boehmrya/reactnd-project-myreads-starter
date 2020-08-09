import React, { Component } from 'react'
import BookGrid from './BookGrid'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class Search extends Component {
  _isMounted = false;

  state = {
    query: '',
    showingBooks: []
  }

  // update retrieved books from search function to match the shelf
  // in books array from main component
  updateBookShelf = (booksResults) => {
    this.setState(() => ({
      showingBooks: booksResults.map((b) => {
        this.props.books.map((book) => {
          if (b.id === book.id) {
            b.shelf = book.shelf
          }
          return b
        })
      })
    }))
  }

  // get all books
  componentDidUpdate() {
    this._isMounted = true;

    if (this.state.query !== '') {
      console.log(this.state.showingBooks)
      BooksAPI.search(this.state.query)
        .then((books) => {
          if (this._isMounted) {
            let booksResults = []
            if (books.length > 0) {
              booksResults = books
              this.updateBookShelf(booksResults)
            }
          }
        })
        .catch((e) => {
          if (this._isMounted) {
            this.setState(() => ({
              showingBooks: []
            }))
          }
        });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  updateQuery = (query) => {
    this.setState(() => ({
      query: query
    }))
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to='/'
            className='close-search'
          ></Link>
          <div className="search-books-input-wrapper">

              <input
                className='search-books'
                type='text'
                placeholder='Search by title or author'
                value={this.state.query}
                onChange={(event) => this.updateQuery(event.target.value)}
              />

            </div>
          </div>
        <div className="search-books-results">
          <BookGrid
            books={this.state.showingBooks}
            onUpdateBook={this.props.onUpdateBook}
          />
        </div>
      </div>
    )
  }
}

export default Search
