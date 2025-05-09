// ~/cafeteria/src/App.tsx
import React from "react";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainFood from "./pages/MenuPages/MainFood";
import Drinks from "./pages/MenuPages/Drinks";
import Dessert from "./pages/MenuPages/Dessert";
import Combo from "./pages/MenuPages/Combo";
import AboutPage from "./pages/AboutPage/AboutPage";
import SupportPage from "./pages/SupportPage/SupportPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import CartPage from "./pages/CartPage/CartPage";
import Layout from "./components/Layout";
import MenuPages from "./pages/MenuPages/MenuPages";
import CheckOut from "./pages/CheckOut/CheckOut";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import AdminHomePage from "./pages/AdminHomePage/AdminHomePage";
const App = () => {
  console.log("App component rendered");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/menu" element={<MenuPages />}>
            <Route path="main-food" element={<MainFood />} />
            <Route path="drinks" element={<Drinks />} />
            <Route path="dessert" element={<Dessert />} />
            <Route path="combo" element={<Combo />} />
          </Route>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckOut />} />{" "}
          {/* Add this line */}
          <Route path="/payment" element={<PaymentPage />} />{" "}
          {/* Add this line */}
          <Route path="/menu" element={<MenuPages />} />
          <Route path="/admin" element={<AdminHomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
