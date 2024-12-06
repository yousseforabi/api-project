import React from 'react'

function Suggestions({ onSuggestionClick }) {
  const suggestions = [
    "How to design",
    "The Great Gatsby",
    "To Kill a Mockingbird",
    "1984"
  ]

  return (
    <div className="suggestions">
      <h2>Popular Searches:</h2>
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index} onClick={() => onSuggestionClick(suggestion)}>
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Suggestions;