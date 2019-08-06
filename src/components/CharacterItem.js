import React, { useState, useEffect, memo } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import placeholderImg from '../img/placeholder.png'

const ListItem = styled.li`
  cursor: pointer;
  border: 1px solid red;
  display: grid;
  grid-template-columns: 30% 1fr;
  grid-template-rows: 1fr auto;

  .imgContainer {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    height: 15rem;
    /* flex: 0 0 90%; */
    overflow: hidden;
    margin: .5rem;
    display: flex;
    justify-content: center;
    @media (min-width: 576px) {
      grid-row: 1 / -1;
      margin: 1rem;
    }
    & .charImg {
      display: block;
      height: 100%;
      margin: 0 auto;
    }
  }
  .name {
    margin: 0 1rem;
    grid-column: 2 / 3;
    grid-row: 1 / 2 ;
    justify-self: center;
    align-self: center;
  }
  .message {
    margin: .5rem;
    /* margin-bottom: .5rem; */
    font-style: italic;
    grid-column: 1 / -1;
    grid-row: 2 / 3 ;
    justify-self: center;
    @media (min-width: 576px) {
      grid-column: 2 / 3;
    }
  }
`

const CharacterItem = ({ character, showModal }) => {
  const [quote, setQuote] = useState('')
  const [image, setImage] = useState('')
  const [fetchError, setFetchError] = useState('')
  const [loadingQuote, toggleLoadingQuote] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(character.randQuote)
      console.log(res)
      toggleLoadingQuote(false)
      if (res.statusText !== 'OK') {
        setFetchError('Unable to fetch quotes')
        return
      }
      setFetchError('')
      setQuote(res.data[0].quote)
      setImage(res.data[0].image)
    }
    fetchData()
  }, [])

  return (
    <ListItem onClick={() => showModal(character.id)}>
      <div className="imgContainer">
        <img src={image || placeholderImg} alt={character.name} className="charImg" />
      </div>

      <h3 className="name">
        {character.name}
      </h3>

      {loadingQuote ? <p className="message">Loading quote...</p> : <p className="message">{quote}</p>}
      {fetchError && <p className="message">{fetchError}</p>}

    </ListItem>
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