import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: grid;
  place-items: center;
  background-color: #7A707B;
  height: 100vh;
  padding: 45px;

  form {
    background-color: #d9d9d9;
    padding: 40px 42px 64px;
    border-radius: 90px;
    width: 100%;
    max-width: 644px;
    
    h1 {
      font-size: 32px;
      margin-bottom: 30px;
      text-align: center;
      color: #3a3a3a;
    }

    input {
      width: 100%;
      background-color: #BCBCBC;
      padding: 15px 23px;
      border: 0;
      font-weight: 300;
      font-size: 24px;
      height: 65px;
      border-radius: 10px;

      &:nth-child(3) {
        margin: 45px 0 85px;
      }
    }
    button {
      background-color: #8237be;
      border-radius: 10px;
      color: #fff;
      font-size: 24px;
      font-weight: 300;
      padding: 10px;
      cursor: pointer;
      width: 196px;
      border: 0;
      margin: auto;
      display: block;
    }
  }

  @media screen and (max-width: 680px) {
    form {
      padding: 36px 22px 16px;
      border-radius: 40px;
      
      h1 {
        font-size: 24px;
        margin-bottom: 24px;
      }
  
      input {
        padding: 10px;
        font-size: 20px;
        height: 40px;
  
        &:nth-child(3) {
          margin: 30px 0 18px;
        }
      }
      button {
        border-radius: 0px;
        font-size: 20px;
        width: 90px;
      }
    }
  }

`;

const Account = () => {
  return <StyledDiv>
    <form>
      <h1>ورود/ثبت نام</h1>
      <input type="text" placeholder="شماره همراه"/>
      <input type="password" placeholder="کلمه عبور"/>
      <button type="button">ورود</button>
    </form>
  </StyledDiv>;
};

export default Account;
