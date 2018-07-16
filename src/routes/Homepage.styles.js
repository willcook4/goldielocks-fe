import styled from 'styled-components'

const Wrapper = styled.div`
  .container {
    min-height: calc(100vh - 140px);
    background: whitesmoke;

    display: grid;
    grid-template-rows: 3em 6.4em 1fr;
    grid-template-columns: 200px 1fr 200px;
  }

  .primary-btn {
    background-color: #da4531;
    color: #ffffff;
    height: 40px;
    width: 120px;
    font-size: large;
    border: none;
    border-radius: 5px;
  }
  .primary-btn:hover {
    opacity: 0.8;
    cursor: pointer;
  }

  .welcome {
    font-size: 1.4em;
    grid-row: 2 / 3;
    grid-column: 2 / 3;
    .wip {
      font-size: 0.8em;
      margin-top: 0.3em;
    }
  }

  .center {
    text-align: center;
  }

  .buttons {
    grid-row: 3 / 4;
    grid-column: 2 / 3;
    justify-self: center;
    .why {
      text-decoration: underline;
      text-align: center;
      margin-top: 1em;
    }
  }
`

export default Wrapper
