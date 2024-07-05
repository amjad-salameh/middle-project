import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, MenuItem, Button } from "@mui/material";
import "./MainPage.css";
import BackButton from "../BackButton/BackButton";

const MainPage = () => {
  const [cards, setCards] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get("role");

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get(
          "https://6682d6854102471fa4c86c77.mockapi.io/mycoach/mycoach"
        );
        if (role === "coach") {
          // Get logged-in user email
          const user = JSON.parse(localStorage.getItem("user"));
          if (user) {
            // Filter cards to show only those belonging to the logged-in user
            const userCards = response.data.filter(
              (card) => card.email === user.email
            );
            setCards(userCards);
          } else {
            setCards(response.data);
          }
        } else {
          // Show all cards for trainee
          setCards(response.data);
        }
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchCards();
  }, [role]);

  const handleEdit = (id) => {
    navigate(`/edit-card/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://6682d6854102471fa4c86c77.mockapi.io/mycoach/mycoach/${id}`
      );
      setCards(cards.filter((card) => card.id !== id));
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (page) => {
    setAnchorEl(null);
    if (page) {
      navigate(`/about/${page}`);
    }
  };

  return (
    <>
      <div className="main-page">
        <BackButton />
        <Button style={{position:"fixed"}}
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          variant="contained"
        >
          Why Sports
        </Button>
        <h1>{role === "coach" ? "My Cards" : "Trainers"}</h1>
        {role === "coach" && cards.length === 0 && (
          <button onClick={() => navigate("/card/form")}>Create Card</button>
        )}
        {role === "trainee" && (
          <div>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={() => handleClose(null)}
            >
              <MenuItem onClick={() => handleClose("swimming")}>
                About Swimming
              </MenuItem>
              <MenuItem onClick={() => handleClose("running")}>
                About Running
              </MenuItem>
              <MenuItem onClick={() => handleClose("fitness-sports")}>
                About Practicing Fitness Sports
              </MenuItem>
              <MenuItem onClick={() => handleClose("cycling")}>
                About Cycling
              </MenuItem>
              <MenuItem onClick={() => handleClose("yoga")}>
                About Yoga
              </MenuItem>
            </Menu>
          </div>
        )}
        <div className="card-list">
          {cards.map((card) => (
            <div className="card" key={card.id}>
              <h2>{card.name}</h2>
              <p>{card.phone}</p>
              <p>{card.address}</p>
              <p>{card.certificates}</p>
              {card.image && (
                <img src={card.image} alt="Card" className="card-image" />
              )}
              {role === "coach" && (
                <div className="card-actions">
                  <button onClick={() => handleEdit(card.id)}>Edit</button>
                  <button onClick={() => handleDelete(card.id)}>Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MainPage;
