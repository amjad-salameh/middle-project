import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./MainPage.css";
import BackButton from "../BackButton/BackButton";

const MainPage = () => {
  const [cards, setCards] = useState([]);
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const userRole = params.get("role");
    setRole(userRole);

    const fetchCards = async () => {
      try {
        const response = await axios.get(
          "https://6682d6854102471fa4c86c77.mockapi.io/mycoach/mycoach"
        );
        setCards(response.data);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchCards();
  }, [location.search]);

  const deleteCard = async (id) => {
    try {
      await axios.delete(
        `https://6682d6854102471fa4c86c77.mockapi.io/mycoach/mycoach/${id}`
      );
      setCards(cards.filter((card) => card.id !== id));
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  const editCard = (id) => {
    navigate(`/edit-card/${id}`);
  };

  return (
    <>
      <BackButton />
      <div className="main-page">
        {role === "coach" && (
          <div className="button-container">
            <Link to="/card/form">
              <button className="btn create-card-btn">Create New Card</button>
            </Link>
          </div>
        )}
        <div className="card-list">
          {cards.length > 0 ? (
            cards.map((card) => (
              <div key={card.id} className="card">
                {card.image && (
                  <img
                    src={card.image}
                    alt={card.name}
                    className="card-image"
                  />
                )}
                <div className="card-content">
                  <h3>{card.name}</h3>
                  <p>Phone: {card.phone}</p>
                  <p>Address: {card.address}</p>
                  <p>Certificates: {card.certificates}</p>
                  {role === "coach" && (
                    <div className="card-actions">
                      <button
                        className="btn delete-btn"
                        onClick={() => deleteCard(card.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn edit-btn"
                        onClick={() => editCard(card.id)}
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No cards available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MainPage;
