import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookGrid from './BookGrid'
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

  // update shelf when book is moved


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

        // route element for main page


          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <BookGrid books={this.currentlyReading} />
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <BookGrid books={this.wantToRead} />
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <BookGrid books={this.read} />
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
