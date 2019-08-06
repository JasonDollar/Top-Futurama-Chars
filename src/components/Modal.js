import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'


const Modal = ({ character, close }) => {
  const [quotes, setQuotes] = useState([])
  const [fetchError, setFetchError] = useState('')
  useEffect(() => {
    const fetchQuotes = async () => {
      const res = await axios.get(character.quotesList)
      if (res.statusText !== 'OK') setFetchError('Unable to fetch quotes')
      const quotes5 = res.data.map(item => item.quote)
      setQuotes(quotes5)
    }
    fetchQuotes()
  }, [character])
  
  return (
    <div onClick={close}>
      {quotes.map((item, i) => <p key={i}>{item}</p>)}
    </div>
  )
}

export default Modal

Modal.propTypes = {
  character: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    randQuote: PropTypes.string.isRequired,
    quotesList: PropTypes.string.isRequired,
  }).isRequired,
  close: PropTypes.func.isRequired,
}