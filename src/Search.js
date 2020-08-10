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

  // get all books
  componentDidMount() {
    this.props.getBooks()
  }

  updateShelfData = (books) => {
    let updatedBooks = []
    for (let book of books) {
      if (this.props.shelfIndex[book.id] != undefined) {
        book.shelf = this.props.shelfIndex[book.id]
        console.log(book.shelf)
      }
      else {
        book.shelf = 'none'
      }
      updatedBooks.push(book)
    }

    return updatedBooks
  }

  // get all books
  componentDidUpdate() {
    this._isMounted = true;

    if (this.state.query !== '') {
      BooksAPI.search(this.state.query)
        .then((books) => {
          if (this._isMounted) {
            //console.log(this.updateShelfData(books))
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

  updateQuery = (query) => {
    this.setState(() => ({
      query: query
    }))
  }

  render() {
    //console.log(this.props.books)
    //console.log(this.state.showingBooks)
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
