import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

.main {
  flex: 1;
  padding: 20px;
}

@media (min-width: 768px) {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
}
`

export default Wrapper
