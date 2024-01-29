import React, { useContext, useState } from "react";
import { cartItemsContext } from "../../contexts/cartItemsContext";
import styled from "styled-components";
import ProfileModal from "../../components/ProfileModal";
import { validation } from "../../helpers/Validate";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import setAuthToken from "../../helpers/setToken";
const StyledDiv = styled.div`
  padding: 0 30px;

  h1 {
    padding: 15px 50px;
    background: #d9d9d9;
    color: #3a3a3a;
    font-size: 32px;
    font-style: italic;
    width: fit-content;
    margin: 20px 0;
  }
  .cart-items-list {
    padding: 10px 6vw;

    .item {
      display: flex;
      gap: 25px;
      width: 100%;
      align-items: center;
      flex-wrap: wrap;
      padding: 15px 0;

      .name {
        font-size: 25px;
        color: #7a707b;
        font-weight: bold;
        flex-grow: 1;
      }
      img {
        width: 98px;
        height: 92px;
        object-fit: cover;
      }

      .controls {
        display: inline-flex;
        align-items: center;
        gap: 30px;
        color: #2d2c2c;
        background: #d9d9d9;
        border-radius: 20px;
        font-weight: bold;
        font-size: 20px;

        button {
          border: 0;
          background: transparent;
          padding: 1px 23px;
          cursor: pointer;
          font-size: inherit;
        }
      }
      .price {
        margin-right: 34px;
        color: #3a3a3a;
        font-size: 24px;
        min-width: 150px;
      }
    }
  }
  .remove {
    color: #ffd9d9;
    border: 0;
    background: transparent;
    font-size: 20px;
    cursor: pointer;
  }

  @media screen and (max-width: 680px) {
    padding: 0 15px;

    h1 {
      padding: 9px 18px;
      font-size: 15px;
      margin: 15px 0;
    }
    .cart-items-list {
      padding: 10px 6vw;

      .item {
        gap: 20px;
        padding: 10px 0;
        justify-content: space-between;

        .name {
          font-size: 15px;
          flex-grow: 0;
        }
        img {
          width: 125px;
          height: 120px;
          margin: 0 25vw;
          display: block;
        }
  
        .controls {
          gap: 20px;
          font-size: 15px;
  
          button {
            padding: 1px 18px;
          }
      }
      .price {
        margin-right: 20px;
        font-size: 11px;
        min-width: 80px;
      }
    }
  }
`;



const TotalPart = styled.div`
  border-top: 1px solid #680079;
  padding: 17px 8vw 50px;
  margin-top: 80px;

  .register-order {
    padding: 23px 50px;
    color: #fff;
    font-size: 24px;
    background: #9d9d9d;
    border-radius: 20px;
    width: fit-content;
    margin-right: auto;

    .total-price {
      margin-right: 80px;
    }

    button {
      margin-top: 70px;
      background: #d9d9d9;
      color: #5c5c5c;
      margin-right: auto;
      padding: 8px 17px;
      display: block;
      font-size: 14px;
      cursor: pointer;
      border: 0;
    }
  }

  @media screen and (max-width: 680px) {
    border-color: transparent;
    margin-top: 45px;

    .register-order {
      padding: 13px 24px;
      font-size: 12px;
      margin: 0 auto;

      .total-price {
        margin-right: 80px;
      }

      button {
        margin: 50px auto 0;
        padding: 8px 12px;
        font-size: 10px;
      }
    }
    
  }
`;

const Cart = () => {
  
  const navigate = useNavigate();
  const verified = validation();


  const { cartItems, dispatch } = useContext(cartItemsContext);
  const totalPrice = cartItems.reduce(
    (acc, current) => +(current.price * current.count) + acc,
    0
  );
  const [isShowModal, setIsShowModal] = useState(false);

  
  function saveProductToCart(product_id,count) {
    const apiUrl = "http://localhost:8000/api/v1/";
    const url = apiUrl + "carts";

    const formData = new FormData();
    formData.append('product_id', product_id);
    formData.append('count', count);

    const jsonData = {};
    formData.forEach((value, key) => {
      jsonData[key] = value;
    });

    return new Promise((resolve, reject) => {
      // Making a POST request with Axios
      axios.post(url, jsonData)
        .then(response => {
          // Handle the successful response here
          if (response.status != 200) {
            reject('login-error');
          }
          resolve(response.data)
        })
        .catch(error => {
          // Handle errors here
          reject('login-error')
        });
    });
  }


  async function handleRegiserCart(e){
    setAuthToken()
    try {
      e.preventDefault();
      if(!verified){
        setIsShowModal(true)
      }else{
        let cart
        //regiser cart products for user
        const result = await Promise.all(cartItems.map(cartItem=>{
          return saveProductToCart(cartItem.id,cartItem.count)
        }))
        const cart_id = result[0][0].id
        localStorage.setItem('cart_id',cart_id)
        navigate('/confirm-order')
      }
    } catch (error) {
      
    }
  }

  return (
    <StyledDiv>
      <h1>سبد خرید</h1>
      {!cartItems.length ? (
        <span>سبد خرید خالی است!</span>
      ) : (
        <>
          <ul className="cart-items-list">
            {cartItems.map((cartItem) => (
              <li key={cartItem.id} className="item">
                <img src={cartItem.image} alt={cartItem.desc} />
                <span className="name">{cartItem.name}</span>
                <div className="controls">
                  <button
                    onClick={() =>
                      dispatch({
                        type: "INCREASE_IN_CART",
                        payload: { id: cartItem.id },
                      })
                    }
                  >
                    +
                  </button>
                  <span>{cartItem.count}</span>
                  <button
                    onClick={() =>
                      dispatch({
                        type: "DECREASE_IN_CART",
                        payload: { id: cartItem.id },
                      })
                    }
                  >
                    -
                  </button>
                </div>
                <span className="price">
                  {cartItem.price * cartItem.count} تومان
                </span>
                <button
                  className="remove"
                  onClick={() =>
                    dispatch({
                      type: "REMOVE_FROM_CART",
                      payload: { id: cartItem.id },
                    })
                  }
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
          <TotalPart className="total">
            <div className="register-order">
              <p>
                قیمت کل:
                <span className="total-price">{totalPrice}</span>
              </p>
              <button onClick={handleRegiserCart}>ثبت سفارش</button>
            </div>
          </TotalPart>
          {isShowModal && <ProfileModal setIsShowModal={setIsShowModal} />}
        </>
      )}
    </StyledDiv>
  );
};

export default Cart;
