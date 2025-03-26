import React from "react";
import Navbar from "./Navbar";

const MenuPage = () => {
    return (
        <div className="menu-container">
            <Navbar /> {/* Renders he top navigation bar*/}
            <h1>Menu</h1>
            <div className="menu-item">Pizza</div>  {/* Menu item */}
            <div className="menu-item">Burger</div>  {/* Menu item */}
            <div className="menu-item">Pasta</div>  {/* Menu item */}
        </div>
    );
};

export default MenuPage;