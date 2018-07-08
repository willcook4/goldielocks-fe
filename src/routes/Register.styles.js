import styled from 'styled-components'

export const Wrapper = styled.div`
  .content {
    width: 90%;
    height: 300px;
    margin: 0 auto;
    margin-top: 90px;
    max-width: 320px;

    .title {
      text-align: center;
      margin-bottom: 2em;
      font-size: 30px;
    }

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
