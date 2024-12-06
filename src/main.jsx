import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"

export default function BookSearch() {
  const [query, setQuery] = useState('')
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const suggestions = [
    "How to design",
    "The Great Gatsby",
    "To Kill a Mockingbird",
    "1984"
  ]

  const searchBooks = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`)
      if (!response.ok) {
        throw new Error('Failed to fetch books')
      }
      const data = await response.json()
      setBooks(data.docs.slice(0, 5))
    } catch (err) {
      setError('An error occurred while fetching books. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-8">
          <a href="#" className="text-2xl font-semibold text-violet-500">
            BookSeker
          </a>
          <div className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-800">
              Fiction
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              Non-Fiction
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              Classics
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              New Releases
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              Authors
            </a>
          </div>
        </div>
        <Button variant="ghost" className="text-violet-500">
          Sign in ▼
        </Button>
      </nav>

      {/* Search Section */}
      <div className="max-w-2xl mx-auto px-4 mt-32">
        <form onSubmit={searchBooks}>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search for books..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-violet-500 focus:ring-violet-500"
            />
            <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-violet-500 hover:bg-violet-600 text-white px-6 py-2 rounded-md">
              Search
            </Button>
          </div>
        </form>

        {/* Loading and Error States */}
        {loading && <p className="mt-4 text-center text-gray-600">Loading...</p>}
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}

        {/* Search Results */}
        {books.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Search Results:</h2>
            {books.map((book) => (
              <div key={book.key} className="mb-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <h3 className="text-lg font-semibold">{book.title}</h3>
                {book.author_name && <p className="text-gray-600">By {book.author_name.join(', ')}</p>}
                {book.first_publish_year && <p className="text-gray-500">First published: {book.first_publish_year}</p>}
              </div>
            ))}
          </div>
        )}

        
        {books.length === 0 && !loading && (
          <div className="mt-4 space-y-2">
            <h2 className="text-lg font-semibold mb-2">Popular Searches:</h2>
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 p-3 rounded-lg ${
                  index === 0 ? "bg-violet-50" : "hover:bg-gray-50"
                } cursor-pointer`}
                onClick={() => setQuery(suggestion)}
              >
                <Search className="h-4 w-4 text-gray-400" />
                <span className="text-gray-700">{suggestion}</span>
              </div>
            ))}
          </div>
        )}
      </div>

     
      <div className="fixed bottom-0 left-0 w-32 h-32 opacity-20">
        <div className="absolute bottom-0 left-0 w-full h-full bg-violet-200 transform rotate-45" />
      </div>
      <div className="fixed bottom-0 right-0 w-32 h-32 opacity-20">
        <div className="absolute bottom-0 right-0 w-full h-full bg-violet-200 transform -rotate-45" />
      </div>
    </div>
  )
}