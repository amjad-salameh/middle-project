import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Resizer from "react-image-file-resizer";
import "./CardForm.css";
import BackButton from "../BackButton/BackButton";

const CardForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [certificates, setCertificates] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        Resizer.imageFileResizer(
          file,
          200,
          200,
          "JPEG",
          70,
          0,
          (uri) => {
            setImage(uri);
          },
          "base64"
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!name || !phone || !address || !certificates || !image) {
      alert("Please fill in all fields.");
      return;
    }

    const cardData = {
      name,
      phone,
      address,
      certificates,
      image,
    };

    try {
      console.log("Sending data:", cardData);
      const response = await axios.post(
        "https://6682d6854102471fa4c86c77.mockapi.io/mycoach/mycoach",
        cardData
      );
      console.log("Card created successfully:", response.data);
      navigate("/mainpage"); 
    } catch (error) {
      console.error("Error creating card:", error);
    }
  };

  return (
    <>
      <BackButton />

      <div className="card-form-wrapper">
        <form className="card-form" onSubmit={handleSubmit}>
          <h2>Create Card</h2>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="Certificates"
            value={certificates}
            onChange={(e) => setCertificates(e.target.value)}
          />
          <input type="file" onChange={handleImageChange} />
          <button type="submit">Create Card</button>
        </form>
      </div>
    </>
  );
};

export default CardForm;
