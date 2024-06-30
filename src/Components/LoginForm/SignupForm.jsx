import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { Link } from "react-router-dom";
import BackButton from "../BackButton/BackButton";



export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.find((user) => user.email === email);

    if (userExists) {
      alert("User already exists!");
    } else {
      users.push({ email, password });
      localStorage.setItem("users", JSON.stringify(users));
      
      alert("Signup successful!");
      navigate("/login");
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
          <button type="submit">Signup</button>
          <div className="register-link">
            <p>Already have an account?</p>
            <Link to="/card/form">
              <button>Login</button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
