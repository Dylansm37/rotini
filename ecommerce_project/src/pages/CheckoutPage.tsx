import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import './CheckoutPage.css';

const CheckoutPage: React.FC = () => {
  const { cart, isLoading } = useCart();
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    email: ''
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formErrors, setFormErrors] = useState({
    shippingError: '',
    paymentError: ''
  });

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let isValid = true;
    const errors = { shippingError: '', paymentError: '' };

    if (Object.values(shippingInfo).some(val => val.trim() === '')) {
      errors.shippingError = 'Please fill out all shipping information fields.';
      isValid = false;
    }

    if (Object.values(paymentInfo).some(val => val.trim() === '')) {
      errors.paymentError = 'Please fill out all payment information fields.';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    console.log('Order Submitted:', { shippingInfo, paymentInfo, cart });
    setOrderPlaced(true);
  };

  if (isLoading) {
    return <div className="checkout-loading">Loading checkout...</div>;
  }

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>

      {orderPlaced ? (
        <div className="confirmation">
          <h2>Thank you for your order!</h2>
          <p>Your order has been placed successfully.</p>
        </div>
      ) : (
        <div className="checkout-content">
          {/* Left Section */}
          <div className="checkout-left">
            <div className="section">
              <h2>Shipping Information</h2>
              {formErrors.shippingError && (
                <div className="error">{formErrors.shippingError}</div>
              )}
              {['name', 'address', 'city', 'state', 'zip', 'phone', 'email'].map((field) => (
                <input
                  key={field}
                  name={field}
                  placeholder={field[0].toUpperCase() + field.slice(1)}
                  value={(shippingInfo as any)[field]}
                  onChange={handleShippingChange}
                />
              ))}
            </div>

            <div className="section">
              <h2>Payment Information</h2>
              {formErrors.paymentError && (
                <div className="error">{formErrors.paymentError}</div>
              )}
              <input
                name="cardNumber"
                placeholder="Card Number"
                value={paymentInfo.cardNumber}
                onChange={handlePaymentChange}
              />
              <input
                name="expiryDate"
                placeholder="Expiry Date (MM/YY)"
                value={paymentInfo.expiryDate}
                onChange={handlePaymentChange}
              />
              <input
                name="cvv"
                placeholder="CVV"
                value={paymentInfo.cvv}
                onChange={handlePaymentChange}
              />
            </div>

            <button className="submit-btn" onClick={handleSubmit}>
              Submit Order
            </button>
          </div>

          {/* Right Section */}
          <div className="checkout-right">
            <div className="section summary">
              <h2>Order Summary</h2>
              {cart.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <>
                  {cart.map((item) => (
                    <div className="summary-item" key={item.id}>
                      <img src={item.imageUrl} />
                      <div>
                        <h3>{item.name}</h3>
                        <p>{item.quantity} x ${item.price.toFixed(2)}</p>
                      </div>
                      <div className="subtotal">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                  <div className="total">
                    <span>Total</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
