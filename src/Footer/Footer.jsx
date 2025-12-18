import React from "react";
import "../Footer/Footer.css";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer-container">
        {/* Column 1 */}
        <div className="footer-col">
          <h2 className="footer-logo">Majestic</h2>
          <p className="footer-text">
            Your one-stop destination for premium sports gear.
            <br />
            Play harder, train smarter with quality equipment you can trust.
          </p>
          <div className="footer-social">
            <FaFacebook />
            <FaInstagram />
            <FaTwitter />
          </div>
        </div>

        {/* Column 2 */}
        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("banner")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Home
              </button>
            </li>

            <li>
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("products")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Products
              </button>
            </li>

            <li>
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("footer")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Services
              </button>
            </li>

            <li>
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("footer")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                About Us
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="footer-col">
          <h3>Contact</h3>
          <p>
            <FaMapMarkerAlt /> Chennai, Tamil Nadu
          </p>
          <p>
            <FaPhoneAlt /> +91 6379624525
          </p>
          <p>
            <FaEnvelope /> ramgokul637@gmail.com
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Designed By Gokulram.P
      </div>
    </footer>
  );
};

export default Footer;
