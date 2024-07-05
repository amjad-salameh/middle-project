// Assuming you have a CSS file for SignupForm styling
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { Link } from "react-router-dom";
import BackButton from "../BackButton/BackButton";

const API_URL = "https://6683afda4102471fa4caf49e.mockapi.io/login/login";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Check if email exists
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const users = await response.json();
      const userExists = users.find((user) => user.email === email);

      if (userExists) {
        alert("User already exists!");
        return;
      }

      // Register new user
      const newUser = { email, password };
      const createUserResponse = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!createUserResponse.ok) {
        throw new Error("Failed to create user");
      }

      // Save user to localStorage
      localStorage.setItem("user", JSON.stringify(newUser));

      alert("Signup successful!");
      navigate("/login"); // Redirect to login page after successful signup
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Error during signup. Please try again.");
    }
  };

  return (
    <>
      <BackButton />
      <div className="wrapper">
        <form onSubmit={handleSignup}>
          <h1>Signup</h1>
          <div className="input-box">
            <input
              style={{ color: "black" }}
              type="text"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PersonIcon className="icon" />
          </div>
          <div className="input-box">
            <input
            style={{ color: "black" }}
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <LockIcon className="icon" />
          </div>
          <button type="submit">Signup</button>
          <div className="register-link">
            <p>Already have an account?</p>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
