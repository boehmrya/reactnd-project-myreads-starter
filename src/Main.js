import React, { Component } from 'react'
import BookGrid from './BookGrid'
import { Link } from 'react-router-dom'


class Main extends Component {

  // get all books when component initially mounts
  componentDidMount() {
    this.props.getBooks()
  }

  render() {
    // books for currently reading shelf
    const currentlyReading = this.props.books.filter((b) => (
        b.shelf === "currentlyReading"
      ))

    // books for the want to read shelf
    const wantToRead = this.props.books.filter((b) => (
        b.shelf === "wantToRead"
      ))

    // books for the read shelf
    const read = this.props.books.filter((b) => (
        b.shelf === "read"
      ))

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <BookGrid
                  books={currentlyReading}
                  onUpdateBook={this.props.onUpdateBook}
                />
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <BookGrid
                  books={wantToRead}
                  onUpdateBook={this.props.onUpdateBook}
                />
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <BookGrid
                  books={read}
                  onUpdateBook={this.props.onUpdateBook}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default Main
