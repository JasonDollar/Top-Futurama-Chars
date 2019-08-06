import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CharacterItem = ({ character }) => {
  const [quote, setQuote] = useState('')
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(character.randQuote)
      console.log(res)
      setQuote(res.data[0].quote)
    }
    fetchData()
  }, [])

  return (
    <div>
      <h3>
        {character.name}
      </h3>
      <span>
        {quote}
      </span>
    </div>
  )
}

export default CharacterItem
