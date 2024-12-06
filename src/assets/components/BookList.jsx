import React from 'react'

function BookList({ books }) {
  return (
    <div className="book-list">
      <h2>Search Results:</h2>
      {books.map((book) => (
        <div key={book.key} className="book">
          <h3>{book.title}</h3>
          {book.author_name && <p>By {book.author_name.join(', ')}</p>}
          {book.first_publish_year && <p>First published: {book.first_publish_year}</p>}
        </div>
      ))}
    </div>
  )
}

export default BookList