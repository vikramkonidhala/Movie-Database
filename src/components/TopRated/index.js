import {useState, useEffect} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import MovieItem from '../MovieItem'

import '../Popular/index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
}

const TopRated = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [topRatedMovieData, setTopRatedMovieData] = useState({
    results: [],
    totalPages: 0,
  })
  const [page, setPage] = useState(1)

  useEffect(() => {
    const getTopRatedMovieData = async () => {
      const apiKey = '32ebf2a57379d3ebe7dd7baf7a315ffd'
      const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=${page}`
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
        setTopRatedMovieData({results, totalPages})
        setApiStatus(apiStatusConstants.success)
      }
    }

    getTopRatedMovieData()
  }, [page])

  const onPageIncrement = () => {
    if (page < topRatedMovieData.totalPages) {
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
          <h3 className="search-heading">Top-Rated Movies</h3>
          <div className="movie-list">
            {topRatedMovieData.results.map(eachMovie => (
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
export default TopRated
