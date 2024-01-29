import React from "react";
import styled from "styled-components";
import axios from 'axios'
const StyledDiv = styled.div`
  .error-message{
    color:red;
    text-align:center;
    margin-top:10px;
  }
  display: grid;
  place-items: center;
  background-color: #7A707B;
  height: 100vh;
  padding: 45px;

  form {
    background-color: #d9d9d9;
    padding: 40px 42px 64px;
    border-radius: 90px;
    width: 100%;
    max-width: 644px;
    
    h1 {
      font-size: 32px;
      margin-bottom: 30px;
      text-align: center;
      color: #3a3a3a;
    }

    input {
      width: 100%;
      background-color: #BCBCBC;
      padding: 15px 23px;
      border: 0;
      font-weight: 300;
      font-size: 24px;
      height: 65px;
      border-radius: 10px;

      &:nth-child(3) {
        margin: 45px 0 85px;
      }
    }
    button {
      background-color: #8237be;
      border-radius: 10px;
      color: #fff;
      font-size: 24px;
      font-weight: 300;
      padding: 10px;
      cursor: pointer;
      width: 196px;
      border: 0;
      margin: auto;
      display: block;
    }
  }

  @media screen and (max-width: 680px) {
    form {
      padding: 36px 22px 16px;
      border-radius: 40px;
      
      h1 {
        font-size: 24px;
        margin-bottom: 24px;
      }
  
      input {
        padding: 10px;
        font-size: 20px;
        height: 40px;
  
        &:nth-child(3) {
          margin: 30px 0 18px;
        }
      }
      button {
        border-radius: 0px;
        font-size: 20px;
        width: 90px;
      }
    }
  }

`;
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const navigate = useNavigate();

  function login(username, password) {
    const apiUrl = "http://localhost:8000/api/v1/";
    const url = apiUrl + "token";

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('gruant_type', null);
    formData.append('scope', null);
    formData.append('client_id', null);
    formData.append('client_secret', null);


    return new Promise((resolve, reject) => {
      // Making a POST request with Axios
      axios.post(url, formData)
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

  const [username,setUsername] = React.useState('')
  const [password,setPassword] = React.useState('')

  const [errorMessage,setError] = React.useState('')

  async function handleLogin(e){
   try {
    e.preventDefault();


    const response = await login(username,password)
    if(response && Object.keys(response)){

      localStorage.setItem('token', response.access_token)
      localStorage.setItem('role',response.role)
      if(response.role=='client'){

        navigate('/')
      }else{
        navigate('/user-panel')

      }

    }else{
      throw new Error('error')
    }
   } catch (error) {
      setError('خطا در برنامه')
   }
    
  }

  return <StyledDiv>
    <form>
      <h1>ورود/ثبت نام</h1>
      
      <input type="text" value={username} onChange={(e)=> setUsername(e.target.value)} placeholder="شماره همراه"/>
      <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)}  placeholder="کلمه عبور"/>
      <button onClick={handleLogin} type="button">ورود</button>
      {
        errorMessage.toString().length>0 &&
        <p className="error-message">{errorMessage}</p>
      }
    </form>
  </StyledDiv>;
};

export default Account;
