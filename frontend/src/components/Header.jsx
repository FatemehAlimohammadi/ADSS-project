import React, { useContext,useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import Cart from "../assets/shopping-cart.png";
import { Link } from "react-router-dom";
import { cartItemsContext } from "../contexts/cartItemsContext";
import { validation } from "../helpers/Validate";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const StyledHeader = styled.div`

  & > *:not(.top-header) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 30px;
  }
  .cart-button {
    position: relative;
    
    .count {
      font-size: 11px;
      width: 17px;
      height: 17px;
      border-radius: 4px;
      background: red;
      color: #fff;
      text-align: center;
      display: block;
      position: absolute;
      top: 7px;
      right: 0;
    }
  }
  .mega {
    background-color: #7a707b;
    font-size: 11px;
  }
  button {
    all: unset;
  }
  .content {
    height: 66px;

    .tools {
      display: flex;
      align-items: center;
      gap: 5px;

      a {
        font-size: 12px;
        color: #707b7b;
      }
    }
  }

  .search-box {
    height: 30px;
    display: flex;
    background-color: #9d9d9d;
    width: fit-content;

    button {
      border-left: 1px solid #853565;
      font-weight: bold;
      padding: 0 8px;
    }
    input {
      background-color: transparent;
      width: 305px;
      border: 0;
      padding: 0 8px;
    }
  }
  .top-header {
    text-align: center;
    padding: 20px;
    font-size: 48px;
    font-style: italic;
    margin-bottom: 17px;
    background-color: #dcd0da;
    color: #853565;
    font-weight: bold;
  }

  @media screen and (max-width: 680px) {
    .top-header {
      font-size: 24px;
      order: -2;
    }
    .cart-icon {
      width: 25px;
    }
    .logo-icon {
      width: 58px;
    }
    .mega,
    .content {
      font-size: 8px;
      height: 45px;
      padding: 8px 11px;
    }
    .mega {
      height: 35px;
    }
    .search-box {
      height: 15px;
      font-size: 8px;

      input {
        width: 105px;
      }
    }
  }
`;

const Header = () => {
  const {cartItems} = useContext(cartItemsContext);
  const verified = validation();
  const navigate = useNavigate();
 

  function logoutHandle(e){
    e.preventDefault();
    sessionStorage.clear();
    navigate('/account')

  }


  return (
    <StyledHeader>
      <div className="mega">
        <p>پشتیبانی آنلاین 24/7</p>
        <p>تحویل رایگان سفارشات بالای 100 هزار تومان</p>
      </div>
      <div className="content">
        <div className="tools">
          <button className="cart-button">
          <Link to="/cart">
            <img className="cart-icon" src={Cart} alt="سبد خرید" />
            <span className="count">{cartItems.length}</span>
          </Link>
          </button>

          {
            verified && (
              <button onClick={logoutHandle}>خروج</button>
            )
          }
          {
            !verified && (
              <Link to="/account">ورود/ثبت نام</Link>
            )
          }

        </div>
        <Link to="/">
          <img src={Logo} alt="فروشگاه لیلیا" className="logo-icon" />
        </Link>
        <form className="search-box">
          <button type="button">جستجو</button>
          <input type="search" />
        </form>
      </div>
      <div className="top-header">SALE 50%</div>
    </StyledHeader>
  );
};

export default Header;
