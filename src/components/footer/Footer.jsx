import React from "react";
import "./Footer.scss";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube, FaUserTie } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  const handleSocialClick = (platform) => {
    const urls = {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      youtube: "https://youtube.com",
    };
    if (urls[platform]) window.open(urls[platform], "_blank");
  };

  return (
    <footer className="footer" style={{ display: "block" }}>
      <div className="footer-container">

        {/* Top Section: Main Content */}
        <div className="footer-top">

          {/* Left Column: Brand & Newsletter & Promoter CTA */}
          <div className="footer-brand-section">
            <h2 className="footer-brand-name">ShreeGandaMatrimony</h2>
            <p className="footer-brand-description">
              A Superior Matrimony Service. Register and find your special someone matches within your community.
            </p>

            <div className="footer-promoter-cta">
              <button
                className="footer-promoter-btn"
                onClick={() => navigate("/promoter/login")}
                title="Access the Promoter Portal"
              >
                <FaUserTie className="promoter-btn-icon" />
                <span>Login as a Promoter</span>
              </button>
            </div>

            <div className="footer-newsletter">
              <h4 className="newsletter-title">Subscribe to Newsletter</h4>
              <div className="newsletter-input-group">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="footer-input"
                />
                <button className="footer-button">Subscribe</button>
              </div>
            </div>
          </div>

          {/* Right Column: Stacked Links Grid */}
          <div className="footer-links-grid">

            <div className="footer-link-group">
              <h3 className="footer-heading">About Company</h3>
              <ul className="footer-list">
                <li onClick={() => navigate("/home")}>Home</li>
                <li onClick={() => navigate("/membership")}>Membership Plans</li>
                <li onClick={() => navigate("/register")}>Register</li>
                <li onClick={() => navigate("/contact")}>Contact Us</li>
              </ul>
            </div>

            <div className="footer-link-group">
              <h3 className="footer-heading">Partner Program</h3>
              <ul className="footer-list">
                <li onClick={() => navigate("/promoter/login")} className="promoter-nav-link">
                  Promoter Login
                </li>
                <li onClick={() => navigate("/promoter/register")}>
                  Become a Promoter
                </li>
              </ul>
            </div>

            <div className="footer-link-group">
              <h3 className="footer-heading">Contact Us</h3>
              <ul className="footer-list contact-list">
                <li><span className="accent-text">Email:</span> shreegandamatrimonysupport@gmail.com</li>
                <li><span className="accent-text">Call Us:</span> 7026425724</li>
                <li onClick={() => navigate("/contact")} className="contact-link">Contact Support →</li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Section: Socials & Copyright */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            Copyright © {new Date().getFullYear()} Shree Gandha Matrimony. All Rights Reserved.
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
        </div>

      </div>
    </footer>
  );
}

export default Footer;
