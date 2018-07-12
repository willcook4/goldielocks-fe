import styled from 'styled-components'

const Wrapper = styled.div`
  .linechart {
    ${'' /* padding: 30px; */}
  }

  .linechart-path {
    stroke-width: 3;
    fill: none;
    stroke-linejoin: round;
  }

  .linechart-axis {
    stroke: blue;
  }

  .linechart-point {
    fill: #fff;
    stroke-width: 2;
  }

  .linechart-area {
    padding: 8px;
    fill: #1b5f5e;
    stroke: none;
    opacity: .4;
  }

  .linechart-label {
   fill: #64B5F6;
   font-weight: 700;
  }

  .hover-line {
    stroke: #1b5f5e;
    stroke-width: 44px;
    opacity: 0.2;
  }

  ${'' /* .linechart * {
    box-sizing: content-box;
  } */}
`

export default Wrapper
