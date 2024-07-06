import "./Footer.css";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>Contact Us</h3>
        <p>
          <FaPhone /> +123 456 7890
        </p>
        <p>
          <FaEnvelope /> info@example.com
        </p>
        <p>
          <FaMapMarkerAlt /> 123 Sports Lane, Fitness City
        </p>
      </div>
      <div className="footer-section">
        <h3>Help</h3>
        <p>
          <a href="/help">Help Center</a>
        </p>
        <p>
          <a href="/faq">FAQs</a>
        </p>
      </div>
      <div className="footer-section">
        <h3>Follow Us</h3>
        <div className="social-icons">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
