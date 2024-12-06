import React, { useState } from 'react'
import axios from 'axios'
import Navigation from './assets/components/Navigation.jsx'
import SearchBar from './assets/components/SearchBar.jsx'
import BookList from './assets/components/BookList.jsx'
import Suggestions from './assets/components/Suggestions.jsx'

function App() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (query) => {
    setLoading(true)
    setError('')
    try {
      const response = await axios.get(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`)
      setBooks(response.data.docs.slice(0, 5))
    } catch (err) {
      setError('An error occurred while fetching books. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <Navigation />
      <main>
        <SearchBar onSearch={handleSearch} />
        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}
        {books.length > 0 ? (
          <BookList books={books} />
        ) : (
          <Suggestions onSuggestionClick={handleSearch} />
        )}
      </main>
    </div>
  )
}

export default App;