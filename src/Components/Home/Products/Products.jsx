// import React,{useState} from 'react'
import React, { useState, useEffect } from "react";
import "../Products/Products.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { motion } from "framer-motion";
import { IoIosArrowDropdown } from "react-icons/io";
import { addToCart } from "../../../CartSlice/CartSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import api from "../../../api";

const Products = () => {
  const [open, setOpen] = useState(false);
  const [price, setPrice] = useState(10000);
  const [selectedCategory, setSelectedCategory] = useState("all");


  const dispatch = useDispatch();

  // const filtered1 = sportskit.filter((data) => data.type === "premium");

 const [products, setProducts] = useState([]);
  useEffect(() => {
    api
      .get("products/")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  // const filteredProducts = products.filter(
  //   (item) => Number(item.price) <= price
  // );

  const handleCategoryClick = (category) => {
  setSelectedCategory(category);
  setOpen(false); // sidebar close
};

const filteredProducts = products.filter((item) => {
  const priceMatch = Number(item.price) <= price;

  const categoryMatch =
    selectedCategory === "all"
      ? true
      : item.category.toLowerCase() === selectedCategory;

  return priceMatch && categoryMatch;
});


  return (
    <>
      <div className="cat" onClick={() => setOpen(true)} id="products">
        <p>
          Categories{" "}
          <span>
            <IoIosArrowDropdown />
          </span>
        </p>
      </div>
      {open && <div className="overlay" onClick={() => setOpen(false)}></div>}
      <motion.div
        className="sidebar"
        initial={{ x: "-100%" }}
        animate={{ x: open ? 0 : "-100%" }}
        transition={{ type: "spring", stiffness: 80 }}
      >
        <h3 className="side-title">All Categories</h3>

        <ul className="side-list">
          <li onClick={() => handleCategoryClick("all")}>All</li>
          <li onClick={() => handleCategoryClick("cricket")}>Cricket</li>
          <li onClick={() => handleCategoryClick("football")}>Football</li>
          <li onClick={() => handleCategoryClick("tennis")}>Tennis</li>
          <li onClick={() => handleCategoryClick("badminton")}>Badminton</li>
          <li onClick={() => handleCategoryClick("Fitnessgear")}>Fitness Gear</li>
        </ul>
        <div className="price-filter">
          <h4>Price Range</h4>
          <p className="price-value">₹0 - ₹{price}</p>
          <input
            type="range"
            min="0"
            max="10000"
            value={price}
            className="price-slider"
            onChange={(e) => setPrice(e.target.value)}
          />
          
        </div>
        <button className="filter-close-btn" onClick={() => setOpen(false)}>
          Close
        </button>
      </motion.div>
      <div className="product-section">
        <h2 className="product-title">Premium Products</h2>

        <Swiper
          spaceBetween={20}
          slidesPerView={1.2}
          breakpoints={{
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3.2 },
            1280: { slidesPerView: 4 },
          }}
        >
          {filteredProducts.map((p) => (
            <SwiperSlide key={p.id}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="product-card"
              >
                <Link
                  to={`/viewproduct/${p.id}`}
                  className="product-image-container"
                >
                  <img src={p.image} alt={p.name} className="product-image" />

                  <div className="badge-new">In Stock:{p.stock}</div>
                </Link>

                <div className="product-content">
                  <h3 className="product-name">{p.name}</h3>
                  <p className="product-price">{p.price}</p>

                  <button
                    className="btn-buy"
                    onClick={() => {
                      dispatch(
                        addToCart({
                          id: p.id,
                          name: p.name,
                          price: p.price,
                          image: p.image,
                        })
                      );
                    }}
                  >
                    Buy Now
                  </button>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Products;
