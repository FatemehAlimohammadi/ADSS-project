import React, { useEffect, useState } from "react";
import { fetchApi } from "../../utils/FetchApi";
import styled from "styled-components";
import { Link } from "react-router-dom";
import TutorialFlower from "../../assets/tutorial-flower.png";
import axios from 'axios'
import setAuthToken from "./../../helpers/setToken";
import Validation from '../../helpers/Validate';

import { useNavigate } from 'react-router-dom';


const StyledHome = styled.div`

  .flowers-container {
    display: flex;
    gap: 47px;
    justify-content: center;
    flex-wrap: wrap;
    margin: 15px 0 0;
    padding: 30px;

    .item {
      width: 265px;
      border-radius: 4px;
      background-color: #d9d9d9;
      padding: 20px 40px;

      img {
        max-width: 100%;
        margin: 0 auto;
        display: block;
      }
    }
  }

  .bottom-title {
    font-size: 14px;
    color: #737373;
    border-bottom: 1px solid #680079;
    width: 244px;
    margin: 3px auto;
    text-align: center;
    padding-bottom: 8px;
  }

  .bottom-section {
    display: flex;
    flex-wrap: wrap-reverse;
    gap: 60px 12vw;
    justify-content: center;
    margin: 45px 0 60px;

    .tutorial {
      display: flex;
      width: 450px;
      padding-left: 50px;
      gap: 20px;

      h2 {
        font-size: 11px;
        width: 144px;
        padding: 4px 20px 4px 4px;
        margin-bottom: 20px;
        border-bottom: 1px solid;

        p {
          font-weight: normal;
          margin-right: 5px;
        }
      }
      .left {
        position: relative;

        .backdrop {
          position: absolute;
          left: -33px;
          top: -42px;
          width: 152px;
          height: 63px;
          background-color: #8c60a1;
        }
        img {
          position: relative;
          z-index: 2;
        }
      }
      .text {
        font-size: 11px;
      }
    }
    .category {
      padding: 0 36px;

      h2 {
        font-size: 16px;
        margin-bottom: 17px;
      }
      ul {
        display: flex;
        gap: 20px 45px;
        flex-wrap: wrap;
        border-top: 1px solid #680079;
        padding: 25px 11px;
        width: fit-content;

        li {
          background-color: #d9d9d9;
          border-radius: 15px;

          a {
            color: #4f4f4f;
            padding: 30px;
            display: block;
          }
        }
      }
    }
  }
  @media screen and (max-width: 680px) {
    display: flex;
    flex-direction: column;

    .bottom-title {
      order: -1;
    }

    .flowers-container {
      align-items: center;
      flex-direction: column;
      gap: 22px;

      .item {
        width: 170px;
      }
    }
    .bottom-section {
      margin: 25px 0 30px;
      justify-content: center;
  
      .category{
        padding: 0 16px;
        ul  {
          gap: 15px;
          
          li a {
            padding: 20px;
            font-size: 13px;
          }
        }
      }
      .tutorial {
        display: flex;
        width: 100%;
        padding: 20px;

        div:first-child {
          max-width: 55vw;
        }
        h2 {
          font-size: 10px;
          width: 139px;
  
        }
        p.text {
          font-size: 8px;
        }
        .backdrop {
          left: -10px !important;
          top: -14px !important;
          width: 82px !important;
          height: 26px !important;
        }
        img {
         width: 90px;
        }
  }
}
`;

const Home = () => {
  const [flowers, setFlowers] = useState([]);

  const [categories ,setCategories] = React.useState([])
  const [errorMessage,setError] = React.useState('');

  function getCategoryList() {
    setAuthToken();

    let limit  = 100;
    let skip = 0;

    // const page= Math.floor(skip/limit);

    // Example API request
    axios.get(`http://localhost:8000/api/v1/categories?skip=${skip}&limit=${limit}`)
      .then(response => {
        // Handle the response
        console.log(response.data)
        setCategories(response.data);
      })
      .catch(error => {
        // Handle errors
        setError('خطا در  گرفتن اطلاعات کاربران')
      });
  }

  useEffect(()=>{
    getCategoryList();
  },[])

  useEffect(() => {
    const api = () => {
      fetchApi("/flowers")
        .then((res) => setFlowers(res.data))
        .catch((err) => console.log(err));
    };
    api();
  }, []);

  return (
    <StyledHome>
      <ul className="flowers-container">
        {flowers.map((flower) => (
          <li key={flower.id} className="item">
            <Link to={`/product-page/${flower.id}`}>
              <img src={flower.imgUrl} alt="" />
            </Link>
          </li>
        ))}
      </ul>
      <h2 className="bottom-title">جدیدترین گل ها</h2>
      <div className="bottom-section">
        <section className="category">
          <h2>دسته بندی محصولات</h2>
          
          <ul>
            {
              categories.length>0 && categories.map(category=>{
                return (
                  <li key={category.name}>
                    <Link to={`/category-page/${category.id}`}>{category.name} </Link>
                  </li>
                )
              })
            }
            {/* <li>
              <Link to="/category-page/pots">گلدان</Link>
            </li> */}
            
          </ul>
        </section>
        <section className="tutorial">
          <div>
            <h2>
              آموزش
              <p>نگهداری از گل</p>
            </h2>
            <p className="text">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
              نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
              کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان
              جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای
              طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان
              فارسی ایجاد کرد.
            </p>
          </div>
          <div className="left">
            <div className="backdrop"></div>
            <img src={TutorialFlower} alt="" />
          </div>
        </section>
      </div>
    </StyledHome>
  );
};

export default Home;
