import "./index.css";
import LoginForm from "./Components/LoginForm/LoginForm";
import FirstPage from "./Components/FirstPage/FirstPage";
import { Route, Routes,Link } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<FirstPage />} />

        <Route path="/loginform" element={<LoginForm />} />
      </Routes>
    </>
  );
}

export default App;
