import {Link} from 'react-router-dom'

import './index.css'

const MovieItem = props => {
  const {data} = props
  const {id, title, posterPath, rating} = data

  const imageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`

  return (
    <div className="movie-item">
      <img src={imageUrl} alt={title} className="poster" />
      <div className="details">
        <h2 className="movie-name">{title}</h2>
        <div className="movie-item-section-1">
          <p className="rating">⭐ {rating.toFixed(1)}</p>
          <Link to={`/movie/${id}`}>
            <button className="view-btn" type="button">
              View details
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MovieItem
