import React from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import Contacts from "../assets/Contacts.png";
import Buying from "../assets/Buying.png";
import { Link } from "react-router-dom";

const StyledDiv = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: grid;
  place-items: center;

  .close {
    color: #fff;
    font-size: 26px;
    position: absolute;
    top: 30px;
    left: 30px;
    padding: 5px;
    border: 0;
    cursor: pointer;
    background: transparent;
  }
  .content {
    background: #d9d9d9;
    border-radius: 25px;
    overflow: hidden;
    display: flex;

    .aside {
      background: #fff;
      padding: 44px 22px;
      button {
        border: 0;
        background: transparent;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 24px;
        cursor: pointer;

        &:nth-of-type(1) {
          margin: 50px 0 30px;
        }
      }
    }
    .form-container {
      flex-grow: 1;
      padding: 25px 30px;

      h3 {
        font-size: 40px;
        font-weight: normal;
        margin-bottom: 30px;
        text-align: center;
      }
      form {
        border-radius: 45px;
        padding: 20px 30px;
        background: #f9edfb;

        h4 {
          font-size: 32px;
          margin-bottom: 20px;
          font-weight: normal;
        }
        .form-row {
          display: flex;
          gap: 32px;
          font-size: 24px;
          margin: 14px 0;

          .lbl {
            min-width: 165px;
          }
          input:not([type="radio"]) {
            width: min(18vw, 400px);
            height: 40px;
            background: #d9d9d9;
            border: 0;
            margin-left: 80px;
          }
          input[type="radio"] {
            position: relative;
            margin-left: 8px;

            &::after,
            &::before {
              position: absolute;
              top: -8px;
              left: 0;
              border-radius: 50%;
              width: 27px;
              height: 27px;
              content: "";
              border: 2px solid #303030;
              background: #f9edfb;
            }
            &::after {
              width: 8px;
              height: 8px;
              background: #6a2447;
              top: 4px;
              left: 12px;
              border: 0;
              opacity: 0;
            }
            &:checked {
              &::after {
                opacity: 1;
              }
            }
          }
        }
        button {
          display: block;
          margin-right: auto;
          margin-top: 30px;
          width: 136px;
          background: rgba(92, 92, 92, 0.6);
          border: 0;
          border-radius: 20px;
          text-align: center;
          font-size: 24px;
          padding: 2px 5px;
          cursor: pointer;
          a {
            color: #fff;
          }
        }
      }
    }
  }

  @media screen and (max-width: 680px) {
    .content {
    
        .aside {
          padding: 33px 15px;

          .logo {
            width: 70px
          }
          button {
            font-size: 12px;
    
            &:nth-of-type(1) {
              margin: 40px 0 10px;
            }
            img {
                width: 15px;
            }
          }
        }
        .form-container {
          padding: 20px 15px;
    
          h3 {
            font-size: 16px;
            margin-bottom: 25px;
          }
          form {
            border-radius: 28px;
            padding: 15px 17px;
    
            h4 {
              font-size: 14px;
              margin-bottom: 20px;
            }
            .form-row {
              gap: 14px;
              font-size: 12px;
              margin: 10px 0;
    
              .lbl {
                min-width: 65px;
              }
              input:not([type="radio"]) {
                width: min(18vw, 100px);
                height: 23px;
                margin-left: 15px;
              }
              input[type="radio"] {
    
                &::after,
                &::before {
                  top: -1px;
                  left: -1px;
                  width: 14px;
                  height: 14px;
                }
                &::after {
                    width: 7px;
                    height: 7px;
                    top: 4.5px;
                    left: 4.5px;
                }
                }
            }
            }
            button {
              width: 62px;
              border: 0;
              font-size: 14px;
            }
          }
        }
  }
`;

const ProfileModal = ({ setIsShowModal }) => {
  return (
    <StyledDiv>
      <button className="close" onClick={() => setIsShowModal(false)}>
        ×
      </button>
      <section className="content">
        <aside className="aside">
          <img src={Logo} alt="فروشگاه لیلیا" className="logo" />
          <button>
            <img src={Contacts} alt="" />
            اطلاعات مشتری
          </button>
          <button onClick={() => setIsShowModal(false)}>
            <img src={Buying} alt="" />
            سبد خرید
          </button>
        </aside>
        <div className="form-container">
          <h3>پروفایل من</h3>
          <form action="">
            <h4>اطلاعات شخصی شما</h4>
            <div className="form-row">
              <span className="lbl">جنسیت:</span>
              <label htmlFor="female">
                <input type="radio" name="selectgender" id="female" />
                زن
              </label>
              <label htmlFor="male">
                <input type="radio" name="selectgender" id="male" />
                مرد
              </label>
            </div>
            <label htmlFor="fname" className="form-row">
              <span className="lbl">نام:</span>
              <input type="text" id="fname" />
            </label>
            <label htmlFor="lname" className="form-row">
              <span className="lbl">نام خانوادگی:</span>
              <input type="text" id="lname" />
            </label>
            <label htmlFor="email" className="form-row">
              <span className="lbl">ایمیل:</span>
              <input type="email" id="email" />
            </label>
            <label htmlFor="address" className="form-row">
              <span className="lbl">آدرس:</span>
              <input type="text" id="address" />
            </label>
            <button type="button">
              <Link to="/confirm-order">ثبت</Link>
            </button>
          </form>
        </div>
      </section>
    </StyledDiv>
  );
};

export default ProfileModal;
