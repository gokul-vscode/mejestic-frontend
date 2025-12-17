import React from "react";
import "./CartPage.css";
import { useSelector, useDispatch } from "react-redux";
import { incrementQty, decrementQty, removeFromCart,addToCart } from '../../../CartSlice/CartSlice';
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
const CartPage = () => {
  // const { cartItems, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="empty">Your cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div className="cart-row" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="cart-info">
                <h4>{item.name}</h4>
                <p>₹{item.price}</p>

                <div className="qty">
                  <button onClick={() => dispatch(decrementQty(item.id))}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => dispatch(incrementQty(item.id))}>+</button>
                </div>
              </div>

              <p className="subtotal">₹{item.price * item.quantity}</p>

              <button
                className="delete"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                <FaTrashAlt />
              </button>
            </div>
          ))}

          <div className="cart-total">
            <h3>Total: ₹{totalAmount}</h3>
            <Link to='/checkout'>
            <button className="checkout">Proceed to Checkout</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
