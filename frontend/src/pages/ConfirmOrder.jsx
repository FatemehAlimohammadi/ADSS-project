import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  text-align: center;
  display: grid;
  place-items: center;
  background-color: #7a707b;
  height: 100vh;
  padding: 15px;

  .container {
    background-color: #d9d9d9;
    padding: 160px 100px;
    border-radius: 90px;
  }
  h1 {
    font-size: 32px;
    margin-bottom: 70px;
  }
  h3 {
    font-size: 16px;
  }
  
  @media screen and (max-width: 680px) {
    .container {
      padding: 80px 32px 15px;
      border-radius: 20px;
    }
    h1 {
      font-size: 16px;
      margin=bottom: 35px;
    }
    h3 {
      font-size: 10px;
    }
  }
`;
const ConfirmOrder = () => {
  return (
    <StyledDiv>
      <div className="container">
        <h1>سفارش شما با موفقیت ثبت شد.</h1>
        <h3>
          پس از تایید سفارش محصول ارسال میشود.
          <br />
          پرداخت درب منزل
        </h3>
      </div>
    </StyledDiv>
  );
};

export default ConfirmOrder;
