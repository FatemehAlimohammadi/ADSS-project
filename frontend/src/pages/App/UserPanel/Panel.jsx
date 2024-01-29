import React from "react";
import styled from "styled-components";
const StyledPanel = styled.div`
  .istatistic {
    font-size: 20px;
    color: #5c5c5c;
    margin-bottom: 25px;
    text-align: center;
  }
  .items-list {
    display: flex;
    justify-content: center;
    gap: 40px 130px;
    margin-bottom: 80px;
    flex-wrap: wrap;

    .item {
      padding: 18px 26px;
      background: #d9d9d9;
      width: 250px;
      border-radius: 15px;
      display: flex;
      flex-direction: column;
      font-weight: bold;
      font-size: 20px;
      color: #2d2c2c;

      .value {
        align-self: flex-start;
      }
      .label {
        margin: 40px 0;
      }
    }
  }
  @media screen and (max-width: 680px) {
    .istatistic {
      font-size: 13px;
    }
    .items-list {
      margin-bottom: 50px;
      flex-direction: column;
      align-items: center;

      .item {
        width: 150px;

        .value {
          font-size: 28px;
        }
        .label {
          font-size: 14px;
          margin: 47px 0 20px;
        }
      }
    }
  }
`;



const Panel = ({ title }) => {

  React.useEffect(()=>{
    
  },[])
  return (
    <>
    
      <StyledPanel className="part">
        <h2 className="part-title">{title}</h2>
        <h2 className="istatistic">آمار متداول</h2>
        <div className="items-list">
          <div className="item">
            <span className="value">0</span>
            <p className="label">سفارشات</p>
          </div>
          <div className="item">
            <span className="value">0</span>
            <p className="label">مشتریان ثبت نام کرده</p>
          </div>
          <div className="item">
            <span className="value">6</span>
            <p className="label">موجودی محصولات</p>
          </div>
        </div>
      </StyledPanel>
    </>

  );
};

export default Panel;
