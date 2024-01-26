import React from "react";
import styled from "styled-components";

const StyledProducts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;

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
  return (
    <StyledProducts className="part">
      <h2 className="part-title">{title}</h2>
      <form className="add-product-form">
        <h5 className="title">+ اضافه کردن محصول جدید / ویرایش</h5>
        <div className="form-row">
          <span>نام محصول:</span>
          <input type="text" />
        </div>
        <div className="form-row">
          <span>مشخصات:</span>
          <input type="text" />
        </div>
        <div className="form-row">
          <span>قیمت:</span>
          <input type="number" />
        </div>
        <div className="form-row">
          <span>موجودی:</span>
          <input type="number" />
        </div>
        <button className="sub">ثبت</button>
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
          <tr>
            <td>گلدان Aa</td>
            <td>200000</td>
            <td>2</td>
            <td>ویرایش</td>
          </tr>
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
