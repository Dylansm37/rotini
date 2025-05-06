// ~/cafeteria/src/pages/MenuPages/MainFood.tsx
import React from 'react';

const MainFood = () => {
  const mainFoods = [
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
      name: "Chicken Sandwich",
      description: "Juicy chicken patty with all the fixings",
      image: "/src/assets/images/chickensandwich.jpg",
    },
    {
      id: 4,
      name: "Club Sandwich",
      description: "Classic sandwich with your choice of ham or turkey plus fixings",
      image: "/src/assets/images/sandwich.jpg",
    },
    {
      id: 5,
      name: "Pasta",
      description: "Classic Italian pasta with marinara sauce",
      image: "/src/assets/images/pasta.jpg",
    },
    {
      id: 6,
      name: "Fried Chicken",
      description: "Crispy and flavorful fried chicken",
      image: "/src/assets/images/friedchicken.jpg",
    },
  ];

  return (
    <div>
      <h2>Main Food</h2>
      <div className="menu-items">
        {mainFoods.map((item) => (
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

export default MainFood;