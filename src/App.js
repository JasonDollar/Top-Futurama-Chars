import React, { useState, useCallback } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { CHARACTERS } from './constants'
import CharactersList from './components/CharactersList'
import Modal from './components/Modal'

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 62.5%;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-size: 1.6rem;
    width: 100%;
  }

  *, *::after, *::before {
    box-sizing: inherit;
  }
`

const AppContainer = styled.div`
  max-width: 114rem;
  margin: 0 auto;
  .header {
    text-align: center;
  }
`

function App() {
  const [characters] = useState(CHARACTERS)
  const [chosenCharacter, setChosenCharacter] = useState(null)
  const [modalVisibility, toggleModalVisibility] = useState(false)
  const showModal = useCallback(id => {
    const char = characters.find(item => item.id === id)
    
    setChosenCharacter(char)
    toggleModalVisibility(true)
  }, [])
  return (
    <AppContainer>
      <GlobalStyle />
      <h1 className="header">Top 10 Futurama Characters</h1>
      <CharactersList characters={characters} showModal={showModal} />
      <Modal visible={modalVisibility} close={() => toggleModalVisibility(false)} character={chosenCharacter} />
    </AppContainer>
  )
}

export default App
