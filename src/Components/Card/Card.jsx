import { useState } from "react";
import axios from "axios";
import imageCompression from "browser-image-compression";
import BackButton from "../BackButton/BackButton";
import "./CardForm.css";

const CardForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [certificates, setCertificates] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(file, options);
        const base64Image = await convertToBase64(compressedFile);
        setImage(base64Image);
      } catch (error) {
        console.error("Error compressing image:", error);
      }
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cardData = {
      name,
      phone,
      address,
      certificates,
      image,
    };
    axios
      .post(
        "https://6682d6854102471fa4c86c77.mockapi.io/mycoach/mycoach",
        cardData
      )
      .then((response) => {
        console.log("Card created:", response.data);
        alert("Card created successfully!");
      })
      .catch((error) => {
        console.error("Error creating card:", error);
        alert("Failed to create card. Please try again.");
      });
  };

  return (
    <div className="card-form-wrapper">
      <BackButton />
      <form className="card-form" onSubmit={handleSubmit}>
        <h2>Create Card</h2>
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
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          required
        />
        <button type="submit">Create Card</button>
      </form>
    </div>
  );
};

export default CardForm;
