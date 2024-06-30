import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CardForm.css";
import BackButton from "../BackButton/BackButton";

const CardForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [certificates, setCertificates] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCard = { name, phone, address, certificates, image };
    const cards = JSON.parse(localStorage.getItem("cards")) || [];
    cards.push(newCard);
    localStorage.setItem("cards", JSON.stringify(cards));
    navigate("/mainpage");
  };

  return (
    <>
      <BackButton />
      <div className="card-form-wrapper">
        <form className="card-form" onSubmit={handleSubmit}>
          <h2>Add your details</h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Certificates"
            value={certificates}
            onChange={(e) => setCertificates(e.target.value)}
            required
          />
          <button type="submit">Create Card</button>
        </form>
      </div>
    </>
  );
};

export default CardForm;
