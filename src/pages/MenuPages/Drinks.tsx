// ~/cafeteria/src/pages/MenuPages/Drinks.tsx
import React from 'react';

const Drinks = () => {
  const drinks = [
    {
      id: 1,
      name: "Horchata",
      description: "Sweet and delicious horchata",
      image: "/src/assets/images/horchata.jpg",
    },
    {
      id: 2,
      name: "Hot Coffee",
      description: "Freshly brewed hot coffee",
      image: "/src/assets/images/coffee.jpg",
    },
    {
      id: 3,
      name: "Iced Coffee",
      description: "Freshly brewed ice coffee",
      image: "/src/assets/images/icedcoffee.jpg",
    },
    {
      id: 4,
      name: "Iced Tea",
      description: "Chilled and refreshing iced tea",
      image: "/src/assets/images/icedtea.jpg",
    },
    {
      id: 5, 
      name: "Jamaica",
      description: "Sweet and flavorful Jamaica",
      image: "/src/assets/images/jamaica.jpg"
    },
    {
      id: 6,
      name: "Smoothie",
      description: "Fruit-blended smoothie with your choice of fruit",
      image: "/src/assets/images/smoothie.jpg",
    },
    {
      id: 7,
      name: "Soda",
      description: "Classic fizzy soft drink of your choice",
      image: "/src/assets/images/soda.jpg",
    },
  ];

  return (
    <div>
      <h2>Drinks</h2>
      <div className="menu-items">
        {drinks.map((item) => (
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

export default Drinks;