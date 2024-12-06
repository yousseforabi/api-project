import React from 'react'

function Navigation() {
  return (
    <nav>
      <div className="nav-content">
        <a href="/" className="logo">BookSeker</a>
        <div className="nav-links">
          <a href="#">Fiction</a>
          <a href="#">Non-Fiction</a>
          <a href="#">Classics</a>
          <a href="#">New Releases</a>
          <a href="#">Authors</a>
        </div>
      </div>
      <button className="sign-in">Sign in ▼</button>
    </nav>
  )
}

export default Navigation;