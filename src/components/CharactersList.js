import React from 'react'
import CharacterItem from './CharacterItem'

const CharactersList = ({ characters }) => (
    <div>
      {characters.map(item => <CharacterItem key={item.id} character={item} />)}
    </div>
)

export default CharactersList
