import React from "react";
import "./Footer.scss";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Footer() {
    const navigate = useNavigate();
    
    const handleSocialClick = (platform) => {
        // Placeholder function for social media clicks
        console.log(`Social icon clicked: ${platform}`);
        // You can add actual social media links here
    };
    
  return (
    <footer className="footer" style={{ display: 'block' }}>
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-section">
            <h2 className="footer-heading">ShreeGandaMatrimony</h2>
            <p className="footer-text">
              A Superior Matrimony Service. Register and find your special
              someone matches within your community.
            </p>
          </div>

          <div className="footer-section">
            <h3 className="footer-heading">About Company</h3>
            <ul className="footer-list">
              <li onClick={() => navigate("/home")}>Home</li>
               {/* <li onClick={() => navigate("/service")}>Service</li>
              <li onClick={() => navigate("/about")}>About Us</li>
              <li onClick={() => navigate("/privacy-policy")}>Privacy Policy</li> */}
               <li onClick={() => navigate("/contact")}>Contact Us</li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-heading">Contact Us</h3>
            <p className="footer-text">Email: info@shreegandamatrimony.com</p>
            <p className="footer-text">Call Us: 9148824442</p>
          </div>

          <div className="footer-section">
            <h3 className="footer-heading">Subscribe to Newsletter</h3>
            <input
              type="email"
              placeholder="Enter your email address"
              className="footer-input"
            />
            <button className="footer-button">Subscribe</button>
          </div>
        </div>

           <div className="social-icons">
          <span className="social-icon facebook" onClick={() => handleSocialClick("facebook")}>
            <FaFacebookF />
          </span>
          <span className="social-icon twitter" onClick={() => handleSocialClick("twitter")}>
            <FaTwitter />
          </span>
          <span className="social-icon linkedin" onClick={() => handleSocialClick("linkedin")}>
            <FaLinkedinIn />
          </span>
          <span className="social-icon youtube" onClick={() => handleSocialClick("youtube")}>
            <FaYoutube />
          </span>
        </div>
        
        <div className="footer-copyright">
          Copyright © {new Date().getFullYear()} Ornate Pvt Ltd.
        </div>
      </div>
    </footer>
  );
}

export default Footer;