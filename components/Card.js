import React from 'react'

const Card = ({ thumbnail }) => {
  return (
    <img className='card' src={thumbnail.url} alt="Thumbnail"></img>
  )
}

export default Card