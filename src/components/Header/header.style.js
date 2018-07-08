import styled from 'styled-components'

const Wrapper = styled.div`
  // grid-column: span 3;

  text-align: center;
  color: white;
  height: 80px;
  width: 100%;
  background-color: #da4531;
  position: relative;

  h1 {
    position: absolute;
    top: 18px;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 18px;
  }

  svg {
    width: 75px;
    height: 75px;
    margin-top: 20px;
  }

  .golden-disc {
    width: 75px;
    height: 75px;
    margin-top: -90px;
    position: relative;
    z-index: -1;
    left: calc(50% - (75px / 2));
  }
}
`

export default Wrapper
