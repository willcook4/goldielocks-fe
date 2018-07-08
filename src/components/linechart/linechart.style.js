import styled from 'styled-components'

const Wrapper = styled.div`
  .linechart {
    ${'' /* padding: 30px; */}
  }

  .linechart-path {
    stroke-width: 3;
    fill: none;
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
    fill: cadetblue;
    stroke: none;
    opacity: .4;
  }

  .linechart-label {
   fill: #64B5F6;
   font-weight: 700;
  }

  .hover-line {
    stroke: #7D95B6;
    stroke-width: 44px;
    opacity: 0.2;
  }

  ${'' /* .linechart * {
    box-sizing: content-box;
  } */}
`

export default Wrapper
