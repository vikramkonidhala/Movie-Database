import {useState, useEffect} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import MovieItem from '../MovieItem'

import '../Popular/index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
}

const SearchResults = props => {
  const {match} = props
  const {params} = match
  const {searchInput} = params
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [searchedMovieData, setSearchedMovieData] = useState({
    results: [],
    totalPages: 0,
  })
  const [page, setPage] = useState(1)

  useEffect(() => {
    const getSearchedMovieData = async () => {
      const apiKey = '32ebf2a57379d3ebe7dd7baf7a315ffd'
      const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchInput}&page=1`
      const response = await fetch(apiUrl)
      const data = await response.json()
      if (response.ok) {
        const results = data.results.map(each => ({
          id: each.id,
          title: each.title,
          posterPath: each.poster_path,
          backdropPath: each.backdrop_path,
          rating: each.vote_average,
        }))
        const totalPages = data.total_pages
        setSearchedMovieData({results, totalPages})
        setApiStatus(apiStatusConstants.success)
      }
    }

    getSearchedMovieData()
  }, [page, searchInput])

  const onPageIncrement = () => {
    if (page < searchedMovieData.totalPages) {
      setPage(prev => prev + 1)
    }
  }

  const onPageDecrement = () => {
    if (page > 1) {
      setPage(prev => prev - 1)
    }
  }

  return (
    <>
      <Header />
      {apiStatus === apiStatusConstants.initial && (
        <div className="loader">
          <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
        </div>
      )}
      {apiStatus === apiStatusConstants.success && (
        <>
          <h3 className="search-heading">Search Results for {searchInput}</h3>
          <div className="movie-list">
            {searchedMovieData.results.map(eachMovie => (
              <MovieItem key={eachMovie.id} data={eachMovie} />
            ))}
          </div>
          <div className="pagintation-container">
            <button className="prv-btn" onClick={onPageDecrement} type="button">
              Prev
            </button>
            <p className="page-details"> {page} </p>
            <button className="nxt-btn" onClick={onPageIncrement} type="button">
              Next
            </button>
          </div>
        </>
      )}
    </>
  )
}
export default SearchResults
