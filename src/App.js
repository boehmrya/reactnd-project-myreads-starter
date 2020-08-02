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
        <Route exact path='/' render={() => (
          <Main books={this.state.books} />
        )} />

        // route element for main page
        <Route path='/search' render={({ history }) => (
          <CreateContact
            onCreateContact={(contact) => {
              this.createContact(contact)
              history.push('/')
            }}
          />
        )} />



        )}
      </div>
    )
  }
}

export default BooksApp
