// ~/cafeteria/src/pages/MenuPages/Combo.tsx
import React from 'react';

const Combo = () => {
  const combos = [
    {
      id: 1,
      name: "Burger Combo",
      description: "Burger, fries, with soft drink",
      image: "/src/assets/images/burgercombo.jpg",
    },
    {
      id: 2,
      name: "Chicken Sandwich Combo",
      description: "Chicken Sandwich, fries, with soft drink",
      image: "/src/assets/images/chickensandwichcombo.jpg",
    },
    {
      id: 3,
      name: "Club Sandwich Combo",
      description: "Club sandwich, fries, with soft drink",
      image: "/src/assets/images/clubsandwichcombo.jpg",
    },
    {
      id: 4,
      name: "Pizza Combo",
      description: "Slice of pizza, choice of side, with soft drink",
      image: "/src/assets/images/pizzacombo.jpg",
    },
    {
      id: 5,
      name: "Fried Chicken Combo",
      description: "Fried chicken, mashed potatoes, with tea",
      image: "/src/assets/images/friedchickencombo.jpg",
    },
    {
      id: 6,
      name: "Taco Combo",
      description: "Two tacos, rice, with horchata or jamaica",
      image: "/src/assets/images/tacocombo.png",
    },
  ];

  return (
    <div>
      <h2>Combo Menu</h2>
      <div className="menu-items">
        {combos.map((item) => (
          <div key={item.id} className="menu-item">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <button className="order-btn">Order</button>
            <button className="add-to-cart-btn">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Combo;
