import React from "react";
import styled from "styled-components";

const StyledSales = styled.div`
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
      tr {
        & + & {
          margin-top: 10px;
        }
      }
    }
  }
`;

const Sales = ({ title }) => {
  return (
    <StyledSales className="part">
      <h2 className="part-title">{title}</h2>
      <table>
        <thead>
          <tr>
            <th>تعداد</th>
            <th>نام خریدار</th>
            <th>مشاهده سبد خرید</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>A</td>
            <td>+</td>
          </tr>
          <tr>
            <td>2</td>
            <td>B</td>
            <td>+</td>
          </tr>
          <tr>
            <td>3</td>
            <td>C</td>
            <td>+</td>
          </tr>
          <tr>
            <td>4</td>
            <td>D</td>
            <td>+</td>
          </tr>
        </tbody>
      </table>
    </StyledSales>
  );
};

export default Sales;
