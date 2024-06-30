import Card from "../Card/Card";
import "./MainPage.css";
import BackButton from "../BackButton/BackButton";

const MainPage = () => {
  const cards = JSON.parse(localStorage.getItem("cards")) || [];

  return (
    <div className="main-page">
      <BackButton />

      <div className="cards-container">
        {cards.map((card, index) => (
          <Card key={index} card={card} />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
