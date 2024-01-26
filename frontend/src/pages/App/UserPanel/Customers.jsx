import React from "react";
import styled from "styled-components";

const StyledCustomers = styled.div`
  table {
    border-collapse: collapse;
    border-radius: 20px;
    background: #d9d9d9;
    min-width: 45vw;
    margin: 20px auto;

    th,
    td {
      padding: 18px 30px;
      font-size: 24px;
      font-weight: bold;
      color: #3a3a3a;
      text-align: center;
    }
    .address {
      min-width: 250px;
    }
    tr {
      & + & {
        margin-top: 14px;
      }
    }
  }

  @media screen and (max-width: 680px) {
    table {
      min-width: 85vw;

      th,
      td {
        padding: 10px 16px;
        font-size: 12px;
      }
      .address {
        min-width: 150px;
      }
      tr {
        & + & {
          margin-top: 10px;
        }
      }
    }
  }
`;

const Customers = ({ title }) => {
  return (
    <StyledCustomers className="part">
      <h2 className="part-title">{title}</h2>
      <table>
        <thead>
          <tr>
            <th>نام و نام خانوادگی</th>
            <th>تعداد سفارشات</th>
            <th className="address">آدرس</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>A</td>
            <td>3</td>
            <td className="address"></td>
          </tr>
          <tr>
            <td>B</td>
            <td>5</td>
            <td className="address"></td>
          </tr>
          <tr>
            <td>C</td>
            <td>2</td>
            <td className="address"></td>
          </tr>
          <tr>
            <td>D</td>
            <td>1</td>
            <td className="address"></td>
          </tr>
        </tbody>
      </table>
    </StyledCustomers>
  );
};

export default Customers;
