import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
import {  removeFromCart } from "../../../CartSlice/CartSlice";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  // const { cartItems, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [billingInfo, setBillingInfo] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully!");
    // Here you can integrate API call for order placement
  };
   const cartItems = useSelector((state) => state.cart.cartItems);
    const totalAmount = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <div className="checkout-container">

        {/* Billing Form */}
        <div className="billing-form">
          <h3>Billing Details</h3>
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Full Name" value={billingInfo.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={billingInfo.email} onChange={handleChange} required />
            <input type="text" name="address" placeholder="Address" value={billingInfo.address} onChange={handleChange} required />
            <input type="text" name="city" placeholder="City" value={billingInfo.city} onChange={handleChange} required />
            <input type="text" name="postalCode" placeholder="Postal Code" value={billingInfo.postalCode} onChange={handleChange} required />
            <input type="text" name="country" placeholder="Country" value={billingInfo.country} onChange={handleChange} required />
            <input type="text" name="phone" placeholder="Phone Number" value={billingInfo.phone} onChange={handleChange} required />
          </form>
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <h3>Order Summary</h3>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cartItems.map((item) => (
                <div className="summary-item" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div className="summary-info">
                    <h4>{item.name}</h4>
                    <p>₹{item.price} x {item.quantity}</p>
                  </div>
                  <button className="order-remove-btn" onClick={() => dispatch(removeFromCart(item.id))}>
                    <FaTrashAlt />
                  </button>
                </div>
              ))}

              <div className="summary-total">
                <span>Total:</span>
                <strong>₹{totalAmount}</strong>
              </div>

              <button className="place-order-btn" onClick={handleSubmit}>
                Place Order
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;
