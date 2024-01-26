import React, { useContext } from "react";
import styled from "styled-components";
import Logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";

const StyledHeader = styled.div`
  & > *:not(.top-header) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 30px;
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
    justify-content: center !important;
  }

  @media screen and (max-width: 680px) {
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
  }
`;

const PanelHeader = () => {
  return (
    <StyledHeader>
      <div className="mega">
        <p>پشتیبانی آنلاین 24/7</p>
        <p>تحویل رایگان سفارشات بالای 100 هزار تومان</p>
      </div>
      <div className="content">
        <Link to="/">
          <img src={Logo} alt="فروشگاه لیلیا" className="logo-icon" />
        </Link>
      </div>
    </StyledHeader>
  );
};

export default PanelHeader;
