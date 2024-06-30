import { useNavigate } from "react-router-dom";
import "./BackButton.css";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button className="back-button" onClick={() => navigate("/")}>
      Home
    </button>
  );
};

export default BackButton;
