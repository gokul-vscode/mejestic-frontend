import React, { useState, useEffect } from "react";
import "../Navbar/Navbar.css";
import { RiMenu2Line } from "react-icons/ri";
import { FaSearch, FaRegUser, FaTimes, FaTrashAlt } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  incrementQty,
  decrementQty,
} from "../CartSlice/CartSlice";
// import Login from '../Login/Login';
import { Link } from "react-router-dom";
import api from "../api";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [username, setUsername] = useState("");

  const toggleSearch = () => setSearchOpen(!searchOpen);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleCart = () => setCartOpen(!cartOpen);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  // Total amount
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    api
      .get("products/")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar-red">
        <div className="logo">Majestic</div>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li>
            <a href="#banner" onClick={(e) => {e.preventDefault(); document.getElementById("banner")?.scrollIntoView({ behavior: "smooth" });}}>Home</a>
          </li>
          <li>
            <a href="#products" onClick={(e) => {e.preventDefault(); document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });}}>Products</a>
          </li>
          <li>
            <a href="#footer" onClick={(e) => {e.preventDefault(); document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" });}}>Services</a>
          </li>
          <li>
            <a href="#footer" id="about" onClick={(e) => {e.preventDefault(); document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" });}}>
              About
            </a>
          </li>
          <li>
            <a href="#" className="btn-red" onClick={(e) => {e.preventDefault(); document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" });}}>
              Contact
            </a>
          </li>
        </ul>

        <div className="three-icons">
          {/* Search */}
          <div className="search-container">
            <FaSearch className="search-icon" onClick={toggleSearch} />
            <input
              type="search"
              placeholder="Search Products..."
              className={`search-input ${searchOpen ? "active" : ""}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="search-results">
            {searchTerm && filteredProducts.length > 0
              ? filteredProducts.map((item) => (
                  <Link
                    key={item.id}
                    to={`/viewproduct/${item.id}`}
                    className="search-item"
                  >
                    <img src={item.image} alt={item.name} />
                    <span>{item.name}</span>
                  </Link>
                ))
              : searchTerm && <p>No products found</p>}
          </div>

          {/* Cart */}
          <p onClick={toggleCart} className="cart-icon">
            <LuShoppingCart />{" "}
            <span className="cart-length">{cartItems.length}</span>
          </p>

          {/* User */}            
            <Link to="/login" className="login-icon">
              <FaRegUser />
            </Link> 
          
        </div>

        {/* Mobile Menu Button */}
        <div className="menu-btn" onClick={toggleMenu}>
          <RiMenu2Line />
        </div>
      </nav>

      {/* CART DRAWER */}
      {cartOpen && (
        <>
          {/* Overlay */}
          <div className="cart-overlay" onClick={() => setCartOpen(false)} />

          {/* Drawer */}
          <div className="cart-drawer">
            <div className="cart-header">
              <h3>Your Cart</h3>
              <button
                onClick={() => setCartOpen(false)}
                className="cart-close-btn"
              >
                <FaTimes />
              </button>
            </div>

            <div className="cart-items-box">
              {cartItems.length === 0 ? (
                <p className="empty-cart">Cart is empty</p>
              ) : (
                cartItems.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <img src={item.image} alt={item.name} />

                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <p className="price">₹{item.price}</p>

                      <div className="qty-controls">
                        <button onClick={() => dispatch(decrementQty(item.id))}>
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => dispatch(incrementQty(item.id))}>
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      className="remove-btn"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="cart-footer">
              <div className="subtotal">
                <span>Total</span>
                <strong>₹{totalAmount}</strong>
              </div>

              <div className="cart-actions">
                <button className="checkout-btn">Checkout</button>
                <Link to="/cart">
                  <button className="viewcart-btn">View Cart</button>
                </Link>
              </div>
            </div>
          </div>
          {/* {username&&(<p className="welcome-text">Hi {username} 👋</p>)} */}
        </>
      )}
      {username&&(<p className="welcome-text">Hi <span className="fa-user">{username}</span> 👋 welcome to Mejestic</p>)}
    </>
  );
};

export default Navbar;
