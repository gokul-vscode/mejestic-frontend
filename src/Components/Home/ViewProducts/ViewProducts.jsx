import React, { useState, useEffect } from "react";
import "../ViewProducts/ViewProducts.css";
import { FaRegHeart } from "react-icons/fa6";
import { FiRefreshCcw } from "react-icons/fi";
import { MdOutlineSecurity } from "react-icons/md";
import { FaTruck } from "react-icons/fa6";
import { HiRefresh } from "react-icons/hi";
import { useParams } from "react-router-dom";
import { addToCart } from "../../../CartSlice/CartSlice";
import { useDispatch } from "react-redux";
import api from "../../../api";

const ViewProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [openImage, setOpenImage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);


  useEffect(() => {
    api
      .get(`products/${id}/`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="loading">Loading product...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <>
      <div className="whole-cp">
        <div className="sub-cp">
          <div className="cp-img">
            <div className="cp-big-img">
              <img
                src={product.image}
                alt=""
                onClick={() => setOpenImage(true)}
              />
            </div>
            <div className="cp-sub-img">
              <div className="sub-img">
                <img src={product.image} alt="" />
              </div>
              <div className="sub-img">
                <img src={product.image} alt="" />
              </div>
            </div>
          </div>
          <div className="cp-img-details">
            <div className="cp-details">
              <p className="cp-name">{product.name}</p>
              <p className="cp-price">₹. {product.price}</p>
              <p className="cp-disc">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Temporibus velit magnam quaerat placeat nesciunt, quo nemo.
                Distinctio laborum sit totam.
              </p>
            </div>
            <div className="size-color-qty">
              <div className="cp-size">
                <span className="label">Size</span>
                <button className="size-option">S</button>
                <button className="size-option">M</button>
                <button className="size-option">L</button>
              </div>
              <div className="cp-color">
                <span className="label">Color</span>
                <button
                  className="color-box"
                  style={{ backgroundColor: "green" }}
                ></button>
                <button
                  className="color-box"
                  style={{ backgroundColor: "yellow" }}
                ></button>
              </div>
              <div className="cp-qty">
                <span className="label">Quantity</span>
                <button
                  className="cp-dec"
                  onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                >
                  -
                </button>
                <lable className="cp--qty">{qty}</lable>
                <button className="cp-inc" onClick={() => setQty(qty < product.stock ? qty + 1 : qty)}>
                  +
                </button>
              </div>
              <div className="cp-total">
                <p>₹.  {product.price * qty}</p>
              </div>
            </div>
            <div className="cp-cart-stock">
              <div className="cp-cart-btn">
                <button
                  className="cp-cart"
                  onClick={() => {
                    dispatch(
                      addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        quantity: qty,
                      })
                    );
                  }}
                >
                  ADD TO CART
                </button>
                <p>
                  <FaRegHeart />
                </p>
                <p>
                  <FiRefreshCcw />
                </p>
              </div>
              <div className="stock">
                <p>{product.stock}   -In Stock</p>
              </div>
            </div>
            <div className="security-delivery-return">
              <p>
                <MdOutlineSecurity />
                <span className="span-details">
                  Security policy (edit with module Customer reassurance)
                </span>
              </p>
              <p>
                <FaTruck />
                <span className="span-details">
                  Delivery policy (edit with module Customer reassurance)
                </span>
              </p>
              <p>
                <HiRefresh />
                <span className="span-details">
                  Return policy (edit with module Customer reassurance)
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      {openImage && (
        <div className="image-modal" onClick={() => setOpenImage(false)}>
          <span className="close-btn">✕</span>
          <img src={product.image} alt={product.name} />
        </div>
      )}
      <div className="stock">
        {product.stock > 0 ? (
          <p className="in-stock">In Stock</p>
        ) : (
          <p className="out-stock">Out of Stock</p>
        )}
      </div>
    </>
  );
};

export default ViewProduct;
