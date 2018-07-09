import styled from 'styled-components'

const Wrapper = styled.div`
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
`

export default Wrapper
