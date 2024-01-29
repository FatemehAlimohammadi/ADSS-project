import React, { useEffect } from "react";
import styled from "styled-components";
import { fetchApi } from "../../../utils/FetchApi";
import setAuthToken from "../../../helpers/setToken";
import axios from 'axios'
const StyledProducts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;

  input{
    text-align:center;
    color: orange;
    font-size:20px;
  }
  & > h2 {
    align-self: flex-start;
  }
  .add-product-form {
    padding: 27px 20px;
    background: #d9d9d9;
    border-radius: 15px;

    h5 {
      font-size: 12px;
      color: #3a3a3a;
      margin-bottom: 12px;
    }
    .form-row {
      font-size: 16px;
      font-weight: bold;
      margin: 8px 0;

      input {
        width: 40%;
        height: 31px;
        background: #7a707b;
        border-radius: 10px;
        border: 0;
        margin-right: 80px;
      }
      span {
        min-width: 105px;
        display: inline-block;
      }
    }
    .sub {
      border-radius: 10px;
      background: #3a3a3a;
      color: #fff;
      border: 0;
      cursor: pointer;
      padding: 5px 25px;
      display: block;
      margin: 22px auto 0 0;
    }
  }

  table {
    border-collapse: collapse;
    border-radius: 15px;
    overflow: hidden;

    thead {
      background: #8e8e8e;
      color: #fff;
      
      th {
        padding: 8px 0;
      }
    }
    tbody {
      background: #d9d9d9;
      color: #3a3a3a;
    }
    tr {
      font-size: 20px;
      font-weight: bold;

      td {
        padding: 12px 15px;
        text-align: center;
      }
    }
    tr + tr {
      margin-top: 15px;
    }
  }

  table,
  .add-product-form {
    min-width: 52vw;
  }

  @media screen and (max-width: 680px) {
    .add-product-form {
      padding: 20px 15px;
  
      h5 {
        font-size: 8px;
      }
      .form-row {
        font-size: 10px;
  
        input {
          height: 18px;
          margin-right: 48px;
        }
        span {
          min-width: 65px;
        }
      }
      .sub {
        font-size: 8px;
        padding: 5px 15px;
      }
    
    }
    table {
      tr {
        font-size: 10px;
  
        td {
          padding: 10px 15px;
        }
      }
      tr + tr {
        margin-top: 10px;
      }
    }
  
    table,
    .add-product-form {
      min-width: 80vw;
    }
  }
`;



const Products = ({ title }) => {
  const [products, setProducts] = React.useState([]);

  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [price, setPrice] = React.useState(0)
  const [count, setCount] = React.useState(2)


  
  function saveProduct() {
    const apiUrl = "http://localhost:8000/api/v1/";
    const url = apiUrl + "products";

    const formData = new FormData();
    formData.append('name', name);
    formData.append('category_id', 3);
    formData.append('image', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAA2FBMVEX////x7+Lf3dA7g4JNo6Tq6uo+PkBNTlDBwcAyMjeamppJSkzKyb/39edhYWE2NjnTpUeampZqamtEUFE/RUmgn5o5PkKQkItbW1pycXNDREb2ulDttVFXpqbu8OA5hIA9dnXYuHb215z179rRoTwzeHWizMbn8eg9j47Mzcinp6PS0tIAAACHh4K2t7AeHSH358P126vizJ/xx3b2tkDOp1PlyZXv5MjvvF7TrmTs2bDwy4XG0MWtv7adt7Fol5J9pJ/Q49e+2M15s6+SvrtWjIlCbW1JZGXWYqPUAAAEI0lEQVR4nO3bbVObTBiG4dKNiSklxEfbqjFEDQSftkatWm0lEEhS//8/KkveILyEezqBpb1Op+Po9IPH3LsL+bBv3iCEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhP6R/v/8gdwBsQ/7hVD2WnLD/5IbhOS6Sqyuyl8KsDQDhnx6ROhUbVJS67yvu9e0uEWWWwe0VfaJ0HVLDTjqri17KrccDyWFlERreMw1N7sezX6dW95T/7q3xIbHPqb5uQjMAZFCx7z9xDHvCsAcD6mDoWOGjWIwcou8yuiY9/6uAQYYYIABBhhggAEGGGBExWiS1L+9u/t2+1R5DKfc3XceHnT98Xs/+Dn4V0mMb7k863Q6Z+22rl88VR1z1+nMMT7nImGpVQnz9LzGtPVv2sZcqoW57IQxP/hCq+4yuw9j2u34OqsQpv8cweg/K405+4swUnQy7WpjXiKYx0rvGek2cprxl4AKY/ovD+uHJh9M7ueMNbLt0UgkjCY93S8x+mN8x6RjbIcZhjEbW+JguOby+aFzpuvti1tl/pscGMnuGYxnzATCBPvm8uX+x/ef8f2SipEstsywxcL4O6ffT/vUloixZmytEQ2zWnP5MJbDQo0loTDaxvctGMsxwhjDEwmTZMjCjCMWxhyRMJnFLTZjvahmJCYmPqSYZcRiOeJhNE1LAMUsszgmMhoxMLmWmZVkYY4lGkaTFNP1XDMT4xhJGGYLh1G8SbfbnbiR/xOhSCmW8GjEwChet8brRjQRyziZEnmpEQKjDGqLJmYKxu6lYRizRMKYk1otSRM+yFjsCZMwmtIxmuR2a6GmWgIm+SBbaSxhMF4t2iCO4W+XGcvMGAuCMQcbllrXkxZPzxUmdfMvNZ4IGMWdblr4kbYxmW0WxmYiYLxJ3LI+BJYH2VbL8gwoE2N63SSLr1GCdbY+yLZXNia+XdZHmrKajLUdws8Gu1yMkrjE5l0NlAXGTXmJieWWhvEXkXuVbvHzFI1jzFnWmRyezri8ySibT5ckTa6DbNWoJIyWsV2W+Qd00sfk9MYlYZKeLrEmrjQKLDk5vVEpGDdj64eaDjLfyGI5xWK0YOunPV1iXZEs/q4pfDLmNK+FjHGGrWInY+ZbYmRMsLHGRU6mr7i5x+KfZ1e5T7JF50cFXmzY/nSJYoiWXpEYc0qx0PcMOz8sDEPZLqJjbKpFXEzjcEa1iIxhfxGmcU61kE8z9qug06whv2Z/gPnTyfjPJOOwqNuADfnXTjF8MB+LwHxpBjebX2ddUrSX5vNXbqnf7PzmeX1+jVw+JHX0kVJ93s3erjH7TdLl+cUV+tM6OXXnq8zvXeOUnkq7Qx9coz/ZvcWfzfUJuf+onVwPi7D47RVQQRSEEEIIIYQQQgghhBBCCCGEEEIIIYQQQggh9C/1G8tw8kjtcM/VAAAAAElFTkSuQmCC');
    formData.append('price', price);
    formData.append('description', description);
    formData.append('is_active', true);


    const jsonData = {};
    formData.forEach((value, key) => {
      jsonData[key] = value;
    });

    return new Promise((resolve, reject) => {
      // Making a POST request with Axios
      setAuthToken()
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


  useEffect(() => {
    setAuthToken()
    fetchApi("products?skip=0&limit=100")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);


  async function handleSaveProduct(e) {
    e.preventDefault();
    try {
      await saveProduct()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <StyledProducts className="part">
      <h2 className="part-title">{title}</h2>
      <form className="add-product-form">
        <h5 className="title">+ اضافه کردن محصول جدید / ویرایش</h5>
        <div className="form-row">
          <span>نام محصول:</span>
          <input value={name} onChange={(e) => setName(e.target.value)} type="text" />
        </div>
        <div className="form-row">
          <span>مشخصات:</span>
          <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" />
        </div>
        <div className="form-row">
          <span>قیمت:</span>
          <input value={price} onChange={(e) => setPrice(e.target.price)} type="number" />
        </div>
        <div className="form-row">
          <span>موجودی:</span>
          <input value={count} onChange={(e) => setCount(e.target.value)} type="number" />
        </div>
        <button onClick={handleSaveProduct} className="sub">ثبت</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>نام محصول</th>
            <th>قیمت</th>
            <th>موجودی</th>
            <th></th>
          </tr>
        </thead>
        <tbody>

          {
            products.length > 0 && products.map(product => (
              <tr>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>2</td>
                <td>ویرایش</td>
              </tr>

            ))
          }
          <tr>
            <td>دسته گل ویژه</td>
            <td>200000</td>
            <td>4</td>
            <td>ویرایش</td>
          </tr>
        </tbody>
      </table>
    </StyledProducts>
  );
};

export default Products;
