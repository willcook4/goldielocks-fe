import styled from 'styled-components'

const Wrapper = styled.div`


.main {
  padding: 20px;
  grid-row: 2 / 3;
  grid-column: 2 / 3;
  min-height: calc(100vh - 160px);
  // overflow: scroll;
}

@media (min-width: 768px) {
  display: grid;
  grid-template-columns: 200px auto 200px;
  grid-template-rows: 80px auto 80px;
}
`

export default Wrapper
