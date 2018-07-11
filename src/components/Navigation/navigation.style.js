import styled from 'styled-components'

const Wrapper = styled.div`
  background-color: lightblue;

  /* Mobile first queries */

  /* Larger than mobile */
  @media (min-width: 400px) {
    grid-row: 2 / 3;
    grid-column: 1 / -1;
  }
  
  /* Larger than phablet */
  @media (min-width: 550px) {}
  
  /* Larger than tablet */
  @media (min-width: 750px) {}
  
  /* Larger than desktop */
  @media (min-width: 1000px) {
    grid-row: 2 / 3;
    grid-column: 1 / 2;
  }
  
  /* Larger than Desktop HD */
  @media (min-width: 1200px) {
    padding: 20px;
    grid-column: 1 / 2;
    grid-row: 2 / 3;
  
    .welcome {
      font-weight: bold;
    }
    .actions {
      margin-top: 3em;
      .action {
        color: #1b5f5e;
        font-weight: bold;
        margin-top: 1em;
        display: block;
      }
      .action:hover {
        color: #da4531;
      }
    }
  }
  
`

export default Wrapper
