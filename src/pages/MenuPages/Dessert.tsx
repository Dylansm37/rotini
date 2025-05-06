// ~/cafeteria/src/pages/MenuPages/Dessert.tsx
import React from 'react';

const Dessert = () => {
  const desserts = [
    {
      id: 1,
      name: "Cake",
      description: "Frosted Slice of cake with choice of Vanilla or Chocolate",
      image: "/src/assets/images/cake.jpg",
    },
    {
      id: 2,
      name: "Croissant",
      description: "Flaky pastries with chocolate filling",
      image: "/src/assets/images/croissant.jpg",
    },
    {
      id: 3,
      name: "Donut",
      description: "Sweet glazed donut in multiple flavors",
      image: "/src/assets/images/donut.jpg",
    },
    {
      id: 4,
      name: "Ice Cream",
      description: "Delicious and creamy ice cream",
      image: "/src/assets/images/icecream.jpg",
    },
    {
      id: 5,
      name: "Pan Dulce",
      description: "Sweet and delicious mexican sweet bread of many kinds",
      image: "/src/assets/images/pandulce.jpg",
    },
  ];

  return (
    <div>
      <h2>Dessert</h2>
      <div className="menu-items">
        {desserts.map((item) => (
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

export default Dessert;
