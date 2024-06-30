import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { Link } from "react-router-dom";
import BackButton from "../BackButton/BackButton";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      alert("Login successful!");
      // Navigate to the home page or dashboard
      navigate("/dashboard");
    } else {
      alert("Invalid email or password!");
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
          <Link to="/card/form">
            <button type="submit">Login</button>
          </Link>
          <div className="register-link">
            <p>Don't have an account?</p>
            <Link to="/signup">
              <button>Create account</button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
