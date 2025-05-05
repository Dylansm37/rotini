import React from "react";
import Navbar from "./Navbar";

const cartPage = () => {
    return (
        <div className="cart-container">
            <Navbar />
            <h1>Your Cart</h1>
            <div className="cart-item">Pizza * 2</div>
            <div className="cart-item">Burger * 1</div>
            <div className="total">Total: $25</div>
        </div>
    );
};

export default cartPage;