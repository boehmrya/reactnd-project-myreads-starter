import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class Search extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
  }
  state = {
    query: ''
  }
  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim()
    }))
  }
  clearQuery = () => {
    this.updateQuery('')
  }
  render() {
    const { query } = this.state
    const { books } = this.props

    const showingBooks = query === ''
      ? books
      : BooksAPI.search(query)

    return (
      <div className="search-books">
        <div className="search-books-bar">
        <Link
          to='/create'
          className='close-search'
        >Add Contact</Link>
        <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author"/>

            <input
              className='search-books'
              type='text'
              placeholder='Search by title or author'
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {showingBooks.map((book) => (
              <li key={contact.id} className='contact-list-item'>
                <div
                  className='contact-avatar'
                  style={{
                    backgroundImage: `url(${contact.avatarURL})`
                  }}
                ></div>
                <div className='contact-details'>
                  <p>{contact.name}</p>
                  <p>{contact.handle}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default ListContacts
