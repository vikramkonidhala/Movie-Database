import {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'

import './index.css'

const Header = () => {
  const [searchInput, setSearchInput] = useState('')
  const history = useHistory()

  const onChangeSearchInput = e => {
    setSearchInput(e.target.value)
  }

  const onSearchUserInput = () => {
    if (searchInput.trim() !== '') {
      history.push(`/search/${searchInput}`)
      setSearchInput('')
    }
  }

  return (
    <>
      <div className="nav-bar">
        <Link to="/" className="nav-links">
          <h1 className="title">movieDB</h1>
        </Link>
        <ul className="nav-items">
          <li>
            <Link to="/" className="nav-links">
              <h2 className="nav-buttons">Popular</h2>
            </Link>
          </li>
          <li>
            <Link to="/top-rated" className="nav-links">
              <h2 className="nav-buttons">Top Rated</h2>
            </Link>
          </li>
          <li>
            <Link to="/upcoming" className="nav-links">
              <h2 className="nav-buttons">Upcoming</h2>
            </Link>
          </li>
        </ul>
        <div className="search-container">
          <input
            type="search"
            className="search-box"
            placeholder="Search"
            value={searchInput}
            onChange={onChangeSearchInput}
          />
          <button
            type="button"
            onClick={onSearchUserInput}
            className="search-btn"
          >
            Search
          </button>
        </div>
      </div>
    </>
  )
}

export default Header
