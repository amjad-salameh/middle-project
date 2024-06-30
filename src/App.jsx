import { Route, Routes } from "react-router-dom";
import LoginForm from "./Components/LoginForm/LoginForm";
import SignupForm from "./Components/LoginForm/SignupForm";
import MainPage from "./Components/MainPage/MainPage";
import FirstPage from "./Components/FirstPage/FirstPage";
import Card from "./Components/Card/Card";
import CardForm from "./Components/Card/CardForm";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/" element={<FirstPage />} />
        <Route path="/card" element={<Card />} />
        <Route path="/card/form" element={<CardForm />} />
      </Routes>
    </div>
  );
}

export default App;
