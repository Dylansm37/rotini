// ~/cafeteria/src/components/Layout.tsx
import React, { useState } from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
    interface CartItem {
        id: number;
        name: string;
        price: number;
    }

    const [cart, setCart] = useState<CartItem[]>([]);

  const handleAddToCart = (item: CartItem) => {
    setCart(prevCart => [...prevCart, item]);
  };

  return (
    <div>
      <Navbar cartCount={cart.length} /> {/* Pass the cart count as a prop */}
      <div className="content">
        <Outlet context={{ handleAddToCart }} /> {/* Pass the function via context */}
      </div>
    </div>
  );
};

export default Layout;