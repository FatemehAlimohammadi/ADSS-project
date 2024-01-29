import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchApi } from "../../utils/FetchApi";
import styled from "styled-components";
import { cartItemsContext } from "../../contexts/cartItemsContext";

const StyledDiv = styled.section`
  display: flex;
  flex-flow: column wrap;
  gap: 25px 50px;
  padding: 44px max(25px, 0.45vw);
  max-height: calc(100vh - 200px);
  align-content: center;
  justify-content: space-between;

  .product-image {
    width: clamp(250px, 20vw, 425px);
    object-fit: cover;
    flex-grow: 1;
  }

  .product-name {
    color: #853565;
    font-weight: bold;
    font-style: italic;

    h1 {
      font-size: 36px;
    }
    h2 {
      margin: 36px 0;
      font-size: 20px;
    }
  }

  .price-part {
    border-top: 1px solid;
    width: clamp(200px, 50vw, 800px);
    text-align: left;

    .add-to-cart {
      color: #680079;
      cursor: pointer;
      padding: 15px 50px;
      background-color: #e1e1e1;
      font-weight: bold;
      border: 0;
      font-size: 20px;
    }
    .product-price {
      color: #2d2c2c;
      margin: 28px 0;
      display: block;
    }
  }

  @media screen and (max-width: 680px) {
    flex-flow: column nowrap;
    max-height: unset;
    align-items: center;
    padding: 42px 11px;

    .product-name {
      order: -1;
      align-self: flex-start;

      h1 {
        font-size: 16px;
      }
      h2 {
        font-size: 11px;
        margin: 17px 50px 17px 0;
      }
    }
    .price-part {
      width: 80%;
      margin-top: 14px;
    }
  }
`;

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { cartItems, dispatch } = useContext(cartItemsContext);

  const addProductToCart = () => {
    // check if product exist in cart, then update instead of adding to cart
    const isItemExist = cartItems.find((item) => item.id == id);
    if (isItemExist) {
      dispatch({
        type: "INCREASE_IN_CART",
        payload: { id: id },
      });
    } else {
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          count: 1,
          ...product,
        },
      });
    }
  };

  useEffect(() => {
    fetchApi("products/"+id)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return !product ? (
    <div>چیزی برای نمایش وجود ندارد.</div>
  ) : (
    <StyledDiv>
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-name">
        <h1>{product.name}</h1>
        <h2>{product.description}</h2>
      </div>
      <div className="price-part">
        <strong className="product-price">{product.price} تومان</strong>
        <button className="add-to-cart" onClick={addProductToCart}>
          افزودن به سبد خرید
        </button>
      </div>
    </StyledDiv>
  );
};

export default ProductPage;
