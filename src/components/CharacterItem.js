import React, { useState, useEffect, memo } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

const CharacterItem = ({ character, showModal }) => {
  const [quote, setQuote] = useState('')
  const [fetchError, setFetchError] = useState('')
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(character.randQuote)
      if (res.statusText !== 'OK') {
        setFetchError('Unable to fetch quotes')
        return
      }
      setFetchError('')
      setQuote(res.data[0].quote)
    }
    fetchData()
  }, [])
  
  return (
    <div onClick={() => showModal(character.id)}>
      <h3>
        {character.name}
      </h3>
      <span>
        {quote}
      </span>
    </div>
  )
}

export default memo(CharacterItem)

CharacterItem.propTypes = {
  character: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    randQuote: PropTypes.string.isRequired,
    quotesList: PropTypes.string.isRequired,
  }).isRequired,
  showModal: PropTypes.func.isRequired,
}