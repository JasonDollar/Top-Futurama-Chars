import React, { useEffect, useState, Fragment } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Backdrop from './Backdrop'

const ModalContainer = styled.div`
  position: fixed;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  top: ${props => (props.visible ? '50%' : '-100%')};
  left: 10%;
  right: 10%;
  z-index: 100;
  transform: translateY(-50%);
  transition: all .35s;
  background: white;
  padding: 0 2rem;
  border-radius: 10px;
  @media (min-width: 766px) {
    left: 50%;
    right: auto;
    transform: translate(-50%, -50%);
    overflow-y: auto;
  }
  .name {
    text-align: center;
  }
  .quote {
    font-style: italic;
    @media (min-width: 576px) {
      font-size: 2rem;
    }
  }
  .buttonClose {
    display: block;
    font-size: 2.4rem;
    color: white;
    text-transform: uppercase;
    background: #c54242;
    padding: .8rem 1.5rem;
    border: none;
    border-radius: 100px;
    margin: 0 auto;
    margin-bottom: 1rem;
  }
`

const Modal = ({ character, close, visible }) => {
  const [quotes, setQuotes] = useState([])
  const [fetchError, setFetchError] = useState('')
  useEffect(() => {
    const fetchQuotes = async () => {
      if (!character) return
      const res = await axios.get(character.quotesList)
      if (res.statusText !== 'OK') {
        setFetchError('Unable to fetch quotes')
        return
      }
      setFetchError('')
      const quotes5 = res.data.map(item => item.quote)
      setQuotes(quotes5)
    }
    fetchQuotes()
  }, [character])
  
  return (
    <Fragment>
      <Backdrop onClick={close} visible={visible} />
      <ModalContainer visible={visible} role="dialog" aria-labelledby="dialogName" aria-modal="true">
        <h2 className="name" id="dialogName">{character && character.name}'s quotes</h2>
        {quotes.map((item, i) => <p key={i} className="quote">- {item}</p>)}
        {fetchError && <p>{fetchError}</p>}
        <button type="button" className="buttonClose" onClick={close}>
          Close
        </button>
      </ModalContainer>
    </Fragment>
  )
}

export default Modal

Modal.propTypes = {
  character: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    randQuote: PropTypes.string.isRequired,
    quotesList: PropTypes.string.isRequired,
  }),
  close: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
}

Modal.defaultProps = {
  character: {},
}