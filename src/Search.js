import React, { Component } from 'react'
import BookGrid from './BookGrid'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'

class Search extends Component {
  _isMounted = false;

  state = {
    query: '',
    showingBooks: []
  }

  // get all books with a designated shelf when
  // the component initially mounts
  componentDidMount() {
    this.props.getBooks()
  }


  /**
    * @description updates shelf indices of books
    * @param {array} books
    * @returns {array} new books array with updates shelf indices
  */
  updateShelfData = (books) => {
    let updatedBooks = []
    for (let book of books) {
      if (this.props.shelfIndex[book.id] !== undefined) {
        book.shelf = this.props.shelfIndex[book.id]
      }
      else {
        book.shelf = 'none'
      }
      updatedBooks.push(book)
    }

    return updatedBooks
  }

  // get all books from the search query
  // and update showingBooks state variable
  componentDidUpdate() {
    this._isMounted = true;

    if (this.state.query !== '') {
      BooksAPI.search(this.state.query)
        .then((books) => {
          if (this._isMounted) {
            let booksResults = []
            if (books.length > 0) {
              booksResults = books
            }
            this.setState(() => ({
              showingBooks: this.updateShelfData(booksResults)
            }))
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

  // updates the state variable query, which triggers
  // a search request when component mounts again
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
