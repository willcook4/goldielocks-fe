import styled from 'styled-components'

const Wrapper = styled.div`

/* Mobile first queries */
background-color: lightgreen;
grid-template-columns: 1fr;
grid-template-rows: 80px auto auto 60px;

display: grid;
.main {
  grid-column: 1 / -1;
  min-height: 100vh;
}

/* Larger than mobile */
@media (min-width: 400px) {
  background-color: green;
  .main {
    grid-column: 1 / -1;
    grid-row: 3 / 4;
  }
}

/* Larger than phablet */
@media (min-width: 550px) {
  background-color: red;
}

/* Larger than tablet */
@media (min-width: 750px) {
  background-color: lightgrey;
}

/* Larger than desktop */
@media (min-width: 1000px) {
  background-color: yellow;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 80px 1fr 1fr 60px;
  .main {
    grid-column: 2 / -1;
    grid-row: 2 / 4;
    min-height: calc(100vh - 140px);
  }
}

/* Larger than Desktop HD */
@media (min-width: 1200px) {
  background-color: whitesmoke;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: 80px 1fr 60px;
  .main {
    padding: 20px;
    grid-row: 2 / 3;
    grid-column: 2 / 3;
  }
}
`

export default Wrapper
