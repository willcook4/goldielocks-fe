import styled from 'styled-components'

const Wrapper = styled.div`
  /* Mobile first queries */
  padding: 20px;
  background-color: #936;
  grid-column: 1 / -1;
  grid-row: 4 / 5;

  /* Larger than mobile */
  @media (min-width: 400px) {}

  /* Larger than phablet */
  @media (min-width: 550px) {}

  /* Larger than tablet */
  @media (min-width: 750px) {}

  /* Larger than desktop */
  @media (min-width: 1000px) {
    grid-column: 1 / 2;
    grid-row: 3 / 4;
  }

  /* Larger than Desktop HD */
  @media (min-width: 1200px) {
    grid-column: 3 / 4;
    grid-row: 2 / 3;
  }

  @media (min-width: 1400px) {
    
  }
`

export default Wrapper