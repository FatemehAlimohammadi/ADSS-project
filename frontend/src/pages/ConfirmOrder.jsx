import React, { useEffect } from "react";
import styled from "styled-components";
import axios from 'axios';
import setAuthToken from "../helpers/setToken";


const StyledDiv = styled.div`
  text-align: center;
  display: grid;
  place-items: center;
  background-color: #7a707b;
  height: 100vh;
  padding: 15px;

  .container {
    background-color: #d9d9d9;
    padding: 160px 100px;
    
    border-radius: 90px;
  }
  h1 {
    font-size: 32px;
    margin-bottom: 70px;
  }
  h3 {
    font-size: 16px;
    min-width:250px;
  }
  
  @media screen and (max-width: 680px) {
    .container {
      padding: 80px 32px 15px;
      border-radius: 20px;
    }
    h1 {
      font-size: 16px;
      margin=bottom: 35px;
    }
    h3 {
      font-size: 10px;
    }
  }
`;

const ConfirmOrder = () => {

  const [message,setMessage] = React.useState({type:'',message:''});
  
  
  function saveOrder(cart_id) {
    const apiUrl = "http://localhost:8000/api/v1/";
    const url = apiUrl + "orders";

    const formData = new FormData();
    formData.append('cart_id', cart_id);

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

  async function handleRegiserOrder(e){
    try {
      
      const cart_id = localStorage.getItem('cart_id');
      if(cart_id){
        setAuthToken()
        await saveOrder(cart_id)
        setMessage({type:'success',message:'سفارش شما با موفقیت ثبت شد.'})
      }else{
        setMessage({type:'error',message:'خطا در ثبت سفارش'})
      }
      localStorage.clear()
      
    } catch (error) {
      console.log(error)
      setMessage({type:'error',message:'خطا در ثبت سفارش'})
      localStorage.clear()
    }
  }

  useEffect(()=>{
    setAuthToken()
     handleRegiserOrder()
    return ()=>{}
  },[])

  return (
    <StyledDiv>
      <div className="container">
        <h1>{message.message}</h1>
        {
          message.type=='' && (
          <h3>
            <br />
          </h3>
          )
        }
        {
          message.type=='success' && (
          <h3>
            پس از تایید سفارش محصول ارسال میشود.
            <br />
            پرداخت درب منزل
          </h3>
          )
        }
      </div>
    </StyledDiv>
  );
};

export default ConfirmOrder;
