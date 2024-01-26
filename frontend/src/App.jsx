import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/App/Home";
import Cart from "./pages/App/Cart";
import ProductPage from "./pages/App/ProductPage";
import CategoryPage from "./pages/App/CategoryPage";
import CartItemsContextProvider from "./contexts/cartItemsContext.jsx";

function App() {
  return (
    <div className="App">
      <CartItemsContextProvider>
        <Header />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product-page/:id" element={<ProductPage />} />
          <Route path="/category-page/:name" element={<CategoryPage />} />
        </Routes>
      </CartItemsContextProvider>
      <Footer />
    </div>
  );
}

export default App;
