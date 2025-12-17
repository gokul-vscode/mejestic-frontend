import React, { useState, useEffect } from "react";
import "../Category/Category.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import "swiper/css";
import { Link } from "react-router-dom";
import { addToCart } from "../../../CartSlice/CartSlice";
import { useDispatch } from "react-redux";
import api from "../../../api";

const Category = () => {
  const [activeTab, setActiveTab] = useState("cricket");

  const dispatch = useDispatch();

  // const filtered2 = products.filter((p) => p.category === activeTab);
  //   const filtered2 = sportskit.filter(
  //   (item) =>
  //     item.category === activeTab &&
  //     (item.type === "cat" || item.type === "premium")
  // );

  const [products, setProducts] = useState([]);
  useEffect(() => {
    api
      .get("products/")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const filteredProducts = products.filter(
    (item) => item.category === activeTab
  );

  return (
    <div className="tab-section">
      <h2 className="tab-title">Our Products</h2>

      {/* Tabs */}
      <div className="tab-buttons">
        <button
          className={activeTab === "cricket" ? "active" : ""}
          onClick={() => setActiveTab("cricket")}
        >
          Cricket Kit
        </button>
        <button
          className={activeTab === "football" ? "active" : ""}
          onClick={() => setActiveTab("football")}
        >
          Football Kit
        </button>
        <button
          className={activeTab === "tennis" ? "active" : ""}
          onClick={() => setActiveTab("tennis")}
        >
          Tennis Kit
        </button>
      </div>

      {/* Product Cards */}
      <div className="product-grid">
        {filteredProducts.map((item) => (
          <motion.div
            key={item.id}
            className="tab-card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to={`/viewproduct/${item.id}`}
              className="tab-image-container"
            >
              <img src={item.image} className="tab-image" alt={item.name} />
            </Link>

            <div className="tab-content">
              <h3>{item.name}</h3>
              <p className="price">₹{item.price}</p>

              <button
                className="btn-add"
                onClick={() =>
                  dispatch(
                    addToCart({
                      id: item.id,
                      name: item.name,
                      price: item.price,
                      image: item.image,
                    })
                  )
                }
              >
                Add to Cart
              </button>
            </div>
            <div className="star-rating">
              {Array.from({ length: 5 }).map((_, index) => (
                <span
                  key={index}
                  className={
                    index < (item.rating || 4) ? "star filled" : "star"
                  }
                >
                  ★
                </span>
              ))}
              <span className="rating-count">(128)</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Category;
