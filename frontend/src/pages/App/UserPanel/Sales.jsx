import React from "react";
import styled from "styled-components";
import setAuthToken from "../../../helpers/setToken";
import { fetchApi } from "../../../utils/FetchApi";

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

  
  const [orders,setOrders] = React.useState([]);

  React.useEffect(() => {
    setAuthToken()
    fetchApi("orders")
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

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
          {console.log(orders)}
          {
            orders.length>0 && orders.map(order=>(
              <tr>
                <td>{order.id}</td>
                <td>{order.owner.name}</td>
                <td>+</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </StyledSales>
  );
};

export default Sales;
