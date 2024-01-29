import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Account from "./pages/Account";
import ConfirmOrder from "./pages/ConfirmOrder";
import UserPanel from "./pages/App/UserPanel/UserPanel";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<App />} />
        <Route path="/account" element={<Account />} />
        <Route path="/confirm-order" element={<ConfirmOrder />} />
        <Route path="/user-panel//*" element={<UserPanel />} />
      </Routes>
    </BrowserRouter>
  // </React.StrictMode>
);
