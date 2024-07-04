import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { Link } from "react-router-dom";
import BackButton from "../BackButton/BackButton";

const API_URL = "https://6683afda4102471fa4caf49e.mockapi.io/login/login";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const users = await response.json();
      const user = users.find((user) => user.email === email);

      if (!user) {
        alert("User with this email does not exist");
        return;
      }

      if (user.password !== password) {
        alert("Invalid password");
        return;
      }

      // Save user to localStorage
      localStorage.setItem("user", JSON.stringify(user));

      alert("Login successful!");

      navigate("/mainpage?role=coach");
    } catch (error) {
      console.error("Error during login:", error);
      alert("Error during login. Please try again.");
    }
  };

  return (
    <>
      <BackButton />
      <div className="wrapper">
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <div className="input-box">
            <input
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
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <LockIcon className="icon" />
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>
          <button type="submit">Login</button>
          <div className="register-link">
            <p>Do not have an account?</p>
            <Link to="/signup">
              <button>Create account</button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
