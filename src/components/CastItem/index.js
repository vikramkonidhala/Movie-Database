import './index.css'

const CastItem = props => {
  const {data} = props
  const {name, profilePath, characterName} = data

  const imageUrl = `https://image.tmdb.org/t/p/w500${profilePath}`

  return (
    <div className="cast-item">
      <img src={imageUrl} alt={name} className="actor-img" />
      <div className="actor-details">
        <h2 className="actor-name">{name}</h2>
        <p className="char-name">{characterName}</p>
      </div>
    </div>
  )
}

export default CastItem
