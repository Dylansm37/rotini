// ~/cafeteria/src/pages/MenuPages/MainFood.tsx
import React from 'react';

const MainFood = () => {
  const mainFoods = [
    {
      id: 1,
      name: "Burger",
      description: "Juicy beef patty with all the fixings",
      image: "/src/assets/images/burger.jpg",
    },
    {
      id: 2,
      name: "Chicken Sandwich",
      description: "Juicy chicken patty with all the fixings",
      image: "/src/assets/images/chickensandwich.jpg",
    },
    {
      id: 3,
      name: "Club Sandwich",
      description: "Classic sandwich with your choice of ham or turkey plus fixings",
      image: "/src/assets/images/sandwich.jpg",
    },
    {
      id: 4,
      name: "Fried Chicken",
      description: "Crispy and flavorful fried chicken",
      image: "/src/assets/images/friedchicken.jpg",
    },
    {
      id: 5,
      name: "Pasta",
      description: "Classic Italian pasta with marinara sauce",
      image: "/src/assets/images/pasta.jpg",
    },
    {
      id: 6,
      name: "Pizza",
      description: "Delicious slices with your choice of toppings",
      image: "/src/assets/images/pizza.jpg",
    },
    {
      id: 7,
      name: "Salad",
      description: "Fresh greens with a variety of vegetables",
      image: "/src/assets/images/salad.jpg",
    },
    {
      id: 8, 
      name: "Sushi",
      description: "Assorted fresh sushi rolls",
      image: "/src/assets/images/sushi.jpg",
    },
    {
      id: 9,
      name: "Tacos",
      description: "Delicious tacos with your choice of meat",
      image: "/src/assets/images/tacos.jpg"
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