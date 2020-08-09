import React, { Component } from 'react'


function BookCover(props) {
  if (props.book.imageLinks) {
    return (
      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("' + props.book.imageLinks.thumbnail + '")' }}></div>
    );
  }
  else {
    return (
      ''
    );
  }
}


function BookTitle(props) {
  if (props.book.title) {
    return (
      <div className="book-title">{props.book.title}</div>
    );
  }
  else {
    return (
      ''
    );
  }
}


function BookAuthors(props) {
  if (props.book.authors) {
    return (
      <div className="book-authors">{props.book.authors.join(', ')}</div>
    );
  }
  else {
    return (
      ''
    );
  }
}


function BookGrid(props) {
  if (props.books) {
    return (
      <ol className="books-grid">
        {props.books.map((book) => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <BookCover book={book} />

                <div className="book-shelf-changer">
                  <select onChange={(event) => props.onUpdateBook(book, event.target.value)}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>

              <BookTitle book={book} />
              <BookAuthors book={book} />
            </div>
          </li>
        ))}
      </ol>
    )
  }
  else {
    return (
      ''
    );
  }
}

export default BookGrid
