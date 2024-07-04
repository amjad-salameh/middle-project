import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginForm from "./Components/LoginForm/LoginForm";
import SignupForm from "./Components/LoginForm/SignupForm";
import MainPage from "./Components/MainPage/MainPage";
import FirstPage from "./Components/FirstPage/FirstPage";
import Card from "./Components/Card/Card";
import CardForm from "./Components/Card/CardForm";
import EditCard from "./Components/Card/EditCard";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoggedIn(true);
    }
  }, []);
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/" element={<FirstPage />} />
        <Route path="/card" element={<Card />} />
        <Route path="/card/form" element={<CardForm />} />
        <Route path="/edit-card/:id" element={<EditCard />} />
        
        <Route
          path="/login"
          element={<LoginForm setLoggedIn={setLoggedIn} />}
        />
        <Route
          path="/main"
          element={loggedIn ? <MainPage /> : <Navigate to="/loginForm" />}
        />
        <Route
          path="/create-card"
          element={loggedIn ? <CardForm /> : <Navigate to="/loginForm" />}
        />
      </Routes>
    </div>
  );
}

export default App;
