import React from 'react'
import PropTypes from 'prop-types'

import CharacterItem from './CharacterItem'

const CharactersList = ({ characters, showModal }) => (
    <div>
      {characters.map(item => <CharacterItem key={item.id} character={item} showModal={showModal} />)}
    </div>
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