import styled from 'styled-components'

const Backdrop = styled.div`
  position: fixed;
  top: ${props => (props.visible ? '0' : '-100%')};
  bottom: ${props => (props.visible ? '0' : '100%')};
  left: 0;
  right: 0;
  z-index: 90;
  background: rgba(0,0,0,.7);
  transition: all .35s;
`

export default Backdrop