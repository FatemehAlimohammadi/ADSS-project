import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Twitter from "../assets/Twitter.png";
import Telegram from "../assets/Telegram App.png";
import Instagram from "../assets/Instagram.png";

const StyledFooter = styled.footer`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(max(27vw, 200px), 1fr));
  background-color: #7a707b;
  padding: 17px 45px;
  gap: 36px;

  .col {
    color: #3a3a3a;
    font-size: 8px;

    li {
      padding: 5px 0;

      a {
        color: #171818;
      }
    }
    .title {
      font-size: 12px;
      margin-bottom: 12px;
    }
    .about-text {
      font-size: 12px;
    }

    .social-icons {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }
  @media screen and (max-width: 680px) {
    padding: 15px 23px;
    gap: 22px;

    .col {

      .about-text,
      .title {
        font-size: 10px !important;
      }
    }

  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <div className="col">
        <h4 className="title">درباره فروشگاه</h4>
        <p className="about-text">
          من یک پاراگراف هستم درمورد این بخش که شما می‌توانید به راحتی با دوبار
          کلیک برروی من، استایل و ابعاد و... من را تغییر دهید. من یک پاراگراف
          هستم درمورد این بخش که شما می‌توانید به راحتی با دوبار کلیک برروی من،
          استایل و ابعاد و... من را تغییر دهید.
        </p>
      </div>
      <div className="col">
        <h4 className="title">دسته بندی محصولات</h4>
        <ul>
          <li>
            <Link to="/category-page/flowers">دسته گل</Link>
          </li>
          <li>
            <Link to="/category-page/pots">گلدان</Link>
          </li>
          <li>
            <Link to="/category-page/baskets">سبد گل</Link>
          </li>
        </ul>
      </div>
      <div className="col">
        <h4 className="title">مارا دنبال کنید</h4>
        <p className="title">شبکه های اجتماعی</p>
        <ul className="social-icons">
          <li>
            <img src={Twitter} alt="Twitter" />
          </li>
          <li>
            <img src={Instagram} alt="Instagram" />
          </li>
          <li>
            <img src={Telegram} alt="Telegram" />
          </li>
        </ul>
      </div>
    </StyledFooter>
  );
};

export default Footer;
