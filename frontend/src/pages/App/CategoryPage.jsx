import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchApi } from "../../utils/FetchApi";

const StyledDiv = styled.div`
  padding: 25px 35px;

  h1 {
    font-size: 24px;
    color: #680079;
    margin-bottom: 10px;
  }

  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, 250px);
    justify-content: center;
    gap: 41px max(8vw, 24px);
    padding: 0 2vw;

    .item {
      padding: 16px 30px;
      background-color: #d9d9d9;

      img {
        width: 193px;
        height: 215px;
        object-fit: cover;
        object-position: center;
      }
    }
  }
  .pagination {
    font-size: 13px;
    margin: 30px 0 10px;
    color: #3a3a3a;
    font-weight: bold;
    display: flex;
    gap: 5px;
    justify-content: center;

    li.active {
      opacity: 0.35;
      pointer-events: none;
    }
    li:not(.active):hover {
      opacity: 0.35;
      cursor: pointer;
    }
  }

  @media screen and (max-width: 680px) {
    h1 {
      font-size: 14px;
    }
  }
`;

const CategoryPage = () => {
  const { id } = useParams();
  const [productsByCategory, setProductsByCategory] = useState([]);
  const [page, setPage] = useState(0);
  const itemsPerPage = 6;
  const startIndex = page * itemsPerPage;
  const endIndex = (page + 1) * itemsPerPage;

  const [pageTitle,setPageTitle] = React.useState('')


  useEffect(() => {
    fetchApi(`categories/${id}/products`)
      .then((res) => {
        setPageTitle(res.data.name)
        setProductsByCategory(res.data.products);
      })
      .catch((err) => console.log(err));
   
  }, []);

  return (
    <StyledDiv>
      <h1>{pageTitle}</h1>
      <ul className="gallery">
        {productsByCategory && Object.keys(productsByCategory).length>0 && productsByCategory.map(porduct=>(
            <li className="item" key={porduct.id}>
              <p>{porduct.name}</p>
              <Link to={`/product-page/${porduct.id}`}>
                <img src={porduct.image} title={porduct.name} />
              </Link>
            </li>
          )
          )
      }
      </ul>
      {/* <ul className="pagination">
        {
          //create array from 1..n, based on itemsPerPage
          Array.from(
            Array(Math.ceil(productsByCategory.length / itemsPerPage)).keys()
          ).map((i) => (
            <li
              key={i + 1}
              className={page === i ? "active" : ""}
              onClick={() => setPage(i)}
            >
              {i + 1}
            </li>
          ))
        }
        <li
          onClick={() => {
            if (
              page + 1 !==
              Math.ceil(productsByCategory.length / itemsPerPage)
            )
              setPage(page + 1);
          }}
        >
          - صفحه بعدی
        </li>
      </ul> */}
    </StyledDiv>
  );
};

export default CategoryPage;
