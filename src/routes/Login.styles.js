import styled from 'styled-components'

const Wrapper = styled.div`
  .content {
    width: 90%;
    height: 300px;
    margin: 0 auto;
    margin-top: 90px;
    max-width: 320px;

    form {
      display: flex;
      flex-direction: column;
      align-items: center;

      .primary-btn {
        background-color: #da4531;
        color: #ffffff;
        height: 40px;
        width: 120px;
        font-size: large;
        border: none;
        border-radius: 5px;
        margin-top: 60px;
      }
      .link-tag {
        color: #757575;
        margin-top: 1em;
      }
    }
  }
`

export default Wrapper
