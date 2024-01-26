import React from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Panel from "./Panel";
import Sales from "./Sales";
import Customers from "./Customers";
import Products from "./Products";
import PanelHeader from "./PanelHeader";
import Footer from "../../../components/Footer";
import styled from "styled-components";

const StyledDiv = styled.div`
  .navigation {
    display: flex;
    gap: 35px;
    padding: 40px 15px;
    justify-content: center;
    background: #dcd0da;

    li {
      a {
        font-size: 25px;
        font-weight: bold;
        color: #2D2C2C;
      }
    }
  }

  .part {
    padding: 28px 34px;

    .part-title {
      font-size: 32px;
      color: #2D2C2C;
      border-bottom: 1px solid #680079;
      margin-bottom: 11px;
      width: fit-content;
    }
  }

  @media screen and (max-width: 680px) {
    .part {
      padding: 13px 20px;
  
      .part-title {
        font-size: 16px;
      }
    }
    .navigation {
      gap: 16px;
      padding: 15px;
  
      li {
        a {
          font-size: 11px;
        }
      }
    }
  }
`;

const UserPanel = () => {
  return (
    <StyledDiv className="App">
      <PanelHeader />
      <div>
        <ul className="navigation">
          <li>
            <Link to="/user-panel">پیشخوان</Link>
          </li>
          <li>
            <Link to="./products">محصولات</Link>
          </li>
          <li>
            <Link to="./sales">فروش ها</Link>
          </li>
          <li>
            <Link to="./customers">مشتری ها</Link>
          </li>
        </ul>
        <div>
          <Routes>
            <Route path="/sales" element={<Sales title="فروش ها"/>} />
            <Route path="/products" element={<Products title="محصولات"/>} />
            <Route path="/customers" element={<Customers title="مشتری ها"/>} />
            <Route path="/" element={<Panel title="پیشخوان"/>} />
          </Routes>
        </div>
      </div>
      <Footer />
    </StyledDiv>
  );
};

export default UserPanel;
