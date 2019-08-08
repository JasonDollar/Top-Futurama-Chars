import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import CharacterItem from './CharacterItem'

const List = styled.ul`
  list-style: none;
  margin: 1rem;
  margin-bottom: 1.5rem;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`

const CharactersList = ({ characters, showModal }) => (
  <List>
    {characters.map(item => <CharacterItem key={item.id} character={item} showModal={showModal} />)}
  </List>
)

export default CharactersList

CharactersList.propTypes = {
  characters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      randQuote: PropTypes.string.isRequired,
      quotesList: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  showModal: PropTypes.func.isRequired,
}