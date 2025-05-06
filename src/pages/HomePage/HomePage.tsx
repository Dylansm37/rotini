import React from 'react';
import './HomePage.css';
import { Link, useOutletContext } from 'react-router-dom';

interface LayoutContextType {
  handleAddToCart: () => void;
}

const HomePage = () => {
  const { handleAddToCart } = useOutletContext<LayoutContextType>();

  const bestSellerItems = [
    {
      id: 1,
      name: "Pizza",
      description: "Cheese, Tomato, and Fresh Toppings",
      image: "/src/assets/images/pizza.jpg",
    },
    {
      id: 2,
      name: "Burger",
      description: "Juicy beef patty with all the fixings",
      image: "/src/assets/images/burger.jpg",
    },
    {
      id: 3,
      name: "Pasta",
      description: "Classic Italian pasta with marinara sauce",
      image: "/src/assets/images/pasta.jpg",
    },
    {
      id: 4,
      name: "Salad",
      description: "Fresh greens with a variety of vegetables",
      image: "/src/assets/images/salad.jpg",
    },
    {
      id: 5,
      name: "Sushi",
      description: "Assorted fresh sushi rolls",
      image: "/src/assets/images/sushi.jpg",
    },
    {
      id: 6,
      name: "Tacos",
      description: "Delicious tacos with your choice of filling",
      image: "/src/assets/images/tacos.jpg",
    },
    {
      id: 7,
      name: "Fried Chicken",
      description: "Crispy and flavorful fried chicken",
      image: "/src/assets/images/friedchicken.jpg",
    },
    {
      id: 8,
      name: "Ice Cream",
      description: "Delicious and creamy ice cream with your choice of flavor",
      image: "/src/assets/images/icecream.jpg",
    },
    {
        id: 9,
        name: "Coffee",
        description: "Freshly brewed coffee",
        image: "/src/assets/images/coffee.jpg"
    },
    {
        id: 10,
        name: "Club Sandwich",
        description: "Classic sandwich with your choice of ham or turkey plus fixings",
        image: "/src/assets/images/sandwich.jpg"
    }
  ];

  return (
    <div className="home-page">
      <section className="hero">
        <h1>Welcome to the Cafeteria</h1>
        <p>Delicious meals, served fresh every day!</p>
        <button className="cta-btn">Order Now</button>
      </section>

      <section className="menu" id="menu">
        <h2>Our Best Sellers</h2>
        <div className="menu-items">
          {bestSellerItems.map((item) => (
            <div key={item.id} className="menu-item">
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <button className="order-btn">Order</button>
              <button
                className="add-to-cart-btn"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer" id="contact">
        <p>Contact us at: cafeteria@example.com</p>
        <div className="social-links">
          <a href="#">Facebook</a> | <a href="#">Instagram</a> | <a href="#">Twitter</a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
