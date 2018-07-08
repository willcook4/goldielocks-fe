import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 40px;

  .form-error {
    color: #da4531;
    font-size: 13px;
    text-align: center;
  }

  input {
    width: 100%;
    line-height: 36px;
    background-color: #ffffff;
    border: none;
    font-size: large;
    text-align: center;
    border-bottom: 1.4px solid #1b5f5e;
  }
  input:focus {
    outline: none;
  }

  .add-on-right {
    width: 40px;

    // svg:not(:root) {
    //   overflow: visible;
    // }
  }
`
export default Wrapper
