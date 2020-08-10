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


function BookShelfChanger(props) {
  const shelfTypes = [
    {
      value: "move",
      text: "Move To..."
    },
    {
      value: "currentlyReading",
      text: "Currently Reading"
    },
    {
      value: "wantToRead",
      text: "Want To Read"
    },
    {
      value: "read",
      text: "Read"
    },
    {
      value: "none",
      text: "None"
    }
  ]

  return (
    <div className="book-shelf-changer">
      <select
        onChange={(event) => props.onUpdateBook(props.book, event.target.value)}
        defaultValue={props.book.shelf}
      >
        {shelfTypes.map((shelf) => {
          return (
            <option
              key={shelf.value}
              value={shelf.value}
              disabled={shelf.value === 'move' ? 'disabled' : null}
            >
            {shelf.text}
            </option>
          );
        })}
      </select>
    </div>
  );
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
                <BookShelfChanger book={book} onUpdateBook={props.onUpdateBook} />
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
