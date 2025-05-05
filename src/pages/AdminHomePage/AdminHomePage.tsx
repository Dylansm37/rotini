import React from "react";
import "./AdminHomePage.css";
import { Link, useOutletContext } from "react-router-dom";

interface LayoutContextType {
  handleAddToCart: () => void;
}

const handleOperationRoute = (operation: string) => {};

const AdminHomePage = () => {
  const operations = [
    {
      id: 1,
      name: "Manage Orders",
    },
    {
      id: 2,
      name: "Manage Menu",
    },
  ];

  return (
    <div className="home-page">
      <section className="hero">
        <h1>Welcome to the Cafeteria Manager</h1>
        <p>Delicious meals, served fresh every day!</p>
      </section>

      <section className="menu" id="menu">
        <h2>Admin Operations</h2>
        <div className="menu-items">
          {operations.map((item) => (
            <div key={item.id} className="menu-item">
              <h3>{item.name}</h3>

              <button
                className="add-to-cart-btn"
                // onClick={handleOperationRoute(item.name)}
              >
                Go to
              </button>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer" id="contact">
        <p>Contact us at: cafeteria@example.com</p>
        <div className="social-links">
          <a href="#">Facebook</a> | <a href="#">Instagram</a> |{" "}
          <a href="#">Twitter</a>
        </div>
      </footer>
    </div>
  );
};

export default AdminHomePage;
