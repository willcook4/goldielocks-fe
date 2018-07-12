import styled from 'styled-components'

const Wrapper = styled.div`
  grid-column: span 3;
  
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-top: 30px;

    h5 {
      font-size: 1em;
      font-weight: lighter;
      color: white;
      span {
        font-weight: bold;
      }
    }
  }
  
  background-color: #da4531;
`

export default Wrapper