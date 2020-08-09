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

  // get all books
  componentDidUpdate() {
    this._isMounted = true;

    if (this.state.query !== '') {
      BooksAPI.search(this.state.query)
        .then((books) => {
          if (this._isMounted) {
            if (books.length > 0) {
              this.setState(() => ({
                showingBooks: books
              }))
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
    //console.log(this.state.showingBooks)

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to='/'
            className='close-search'
          ></Link>
          <div className="search-books-input-wrapper">
              {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}

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
