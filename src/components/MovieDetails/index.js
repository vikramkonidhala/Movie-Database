import {useState, useEffect} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import CastItem from '../CastItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
}

const MovieDetails = props => {
  const {match} = props
  const {params} = match
  const {id} = params
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [movieData, setMovieData] = useState({})
  const [castDetails, setCastDetails] = useState([])

  useEffect(() => {
    const getMovieData = async () => {
      const apiKey = '32ebf2a57379d3ebe7dd7baf7a315ffd'
      const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
      const response = await fetch(apiUrl)
      const data = await response.json()
      if (response.ok) {
        const results = {
          title: data.title,
          posterPath: data.poster_path,
          backdropPath: data.backdrop_path,
          duration: data.runtime,
          genres: data.genres.map(each => each.name),
          rating: data.vote_average,
          releaseDate: data.release_date,
          overview: data.overview,
        }
        setMovieData(results)
        setApiStatus(apiStatusConstants.success)
      }
    }

    const getMovieCastData = async () => {
      const apiKey = '32ebf2a57379d3ebe7dd7baf7a315ffd'
      const apiUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`
      const response = await fetch(apiUrl)
      const data = await response.json()
      if (response.ok) {
        const results = data.cast.map(each => ({
          id: each.id,
          name: each.name,
          title: each.title,
          profilePath: each.profile_path,
          characterName: each.character,
        }))
        setCastDetails(results)
      }
    }

    getMovieData()
    getMovieCastData()
  }, [id])

  const movieReleasedYear = String(
    new Date(movieData.releaseDate).getFullYear(),
  )

  const getMovieReleasedMonth = new Date(movieData.releaseDate).getMonth() + 1
  const movieReleasedMonth =
    getMovieReleasedMonth < 10
      ? String(0) + getMovieReleasedMonth
      : String(getMovieReleasedMonth)

  const getMovieReleasedDate = new Date(movieData.releaseDate).getDate()
  const movieReleasedDate =
    getMovieReleasedDate < 10
      ? String(0) + getMovieReleasedDate
      : String(getMovieReleasedDate)

  const movieGenres =
    movieData.genres !== undefined && movieData.genres.join(', ')

  const movieRating =
    movieData.rating !== undefined && movieData.rating.toFixed(1)

  const imageUrl = `https://image.tmdb.org/t/p/w500${movieData.posterPath}`

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
          <div className="movie-details-app">
            <div className="movie-details-section">
              <img
                src={imageUrl}
                alt={movieData.name}
                className="movie-poster"
              />
              <div className="movie-data">
                <h1 className="movie-title">
                  {movieData.title}{' '}
                  <span className="release-year">({movieReleasedYear})</span>
                </h1>
                <p className="movie-rating">⭐ {movieRating}</p>

                <p className="movie-text">
                  <span className="movie-heading">Genres: </span>
                  {movieGenres}
                </p>
                <p className="movie-text">
                  <span className="movie-heading">Release Date: </span>
                  {movieReleasedDate}/{movieReleasedMonth}/{movieReleasedYear}
                </p>
                <p className="movie-text">
                  <span className="movie-heading">Duration: </span>{' '}
                  {Math.floor(movieData.duration / 60)}h{' '}
                  {parseInt(movieData.duration) % 60}m
                </p>
                <p className="movie-text">
                  <span className="movie-heading">Overview: </span>
                  <br />
                  {movieData.overview}
                </p>
              </div>
            </div>
            <h4 className="cast-heading">Cast :</h4>
            <div className="cast-list">
              {castDetails.map(each => (
                <CastItem key={each.id} data={each} />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  )
}
export default MovieDetails
