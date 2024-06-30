import "./Card.css";

const Card = ({ card }) => {
  return (
    <div className="card">
      <img src={card.image} alt={card.name} className="card-image" />
      <div className="card-details">
        <h2>{card.name}</h2>
        <p>
          <strong>Phone:</strong> {card.phone}
        </p>
        <p>
          <strong>Address:</strong> {card.address}
        </p>
        <p>
          <strong>Certificates:</strong> {card.certificates}
        </p>
      </div>
    </div>
  );
};

export default Card;
