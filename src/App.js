import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { CHARACTERS } from './constants'
import CharactersList from './components/CharactersList'

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 62.5%;
    box-sizing: border-box;
  }

  body {
    font-size: 1.6rem;
    width: 100%;
  }

  *, *::after, *::before {
    box-sizing: inherit;
  }
`

function App() {
  return (
    <div>
      <GlobalStyle />
      <h1>Top 10 Futurama Characters</h1>
      <CharactersList characters={CHARACTERS} />
    </div>
  )
}

export default App
