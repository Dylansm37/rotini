import React from 'react';
import './HomePage.css';
import { Link, useOutletContext } from 'react-router-dom';

interface CartItem {
  id: number;
  name: string;
  price: number;
}
interface LayoutContextType {
  handleAddToCart: (item: cartItem) => void;
}

const HomePage = () => {
  const { handleAddToCart } = useOutletContext<LayoutContextType>();

  const bestSellerItems = [
    {
      id: 1,
      name: "Pizza",
      description: "Cheese, Tomato, and Fresh Toppings",
      image: "/assets/images/pizza.jpg",
      price: 9.99
    },
    {
      id: 2,
      name: "Burger",
      description: "Juicy beef patty with all the fixings",
      image: "/assets/images/burger.jpg",
      price: 9.99
    },
    {
      id: 3,
      name: "Pasta",
      description: "Classic Italian pasta with marinara sauce",
      image: "/assets/images/pasta.jpg",
      price: 9.99
    },
    {
      id: 4,
      name: "Salad",
      description: "Fresh greens with a variety of vegetables",
      image: "/assets/images/salad.jpg",
      price: 9.99
    },
    {
      id: 5,
      name: "Sushi",
      description: "Assorted fresh sushi rolls",
      image: "/assets/images/sushi.jpg",
      price: 9.99
    },
    {
      id: 6,
      name: "Tacos",
      description: "Delicious tacos with your choice of filling",
      image: "/assets/images/tacos.jpg",
      price: 9.99
    },
    {
      id: 7,
      name: "Fried Chicken",
      description: "Crispy and flavorful fried chicken",
      image: "/assets/images/friedchicken.jpg",
      price: 9.99
    },
    {
      id: 8,
      name: "Ice Cream",
      description: "Delicious and creamy ice cream",
      image: "/assets/images/icecream.jpg",
      price: 9.99
    },
    {
        id: 9,
        name: "Coffee",
        description: "Freshly brewed coffee",
        image: "/assets/images/coffee.jpg",
      price: 9.99
    },
    {
        id: 10,
        name: "Sandwich",
        description: "Classic sandwich with your choice of fillings",
        image: "/assets/images/sandwich.jpg",
      price: 9.99
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
              <p>{item.price}</p>
              <button className="order-btn">Order</button>
              <button
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(
                    {
                      id: item.id,
                      name: item.name,
                      price: item.price
                    }
                )}
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
