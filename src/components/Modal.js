import React, { useEffect, useState, Fragment } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Backdrop from './Backdrop'

const ModalContainer = styled.div`
  position: fixed;
  top: ${props => (props.visible ? '50%' : '-30%')};
  left: 50%;
  z-index: 100;
  transform: translate(-50%, -50%);
  transition: all .35s;
  background: white;
  padding: 0 2rem;
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
      <ModalContainer visible={visible}>
        {quotes.map((item, i) => <p key={i}>{item}</p>)}
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
  }).isRequired,
  close: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
}