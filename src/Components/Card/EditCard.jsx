import  { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Resizer from "react-image-file-resizer";
import "./CardForm.css";

const EditCard = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [certificates, setCertificates] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await axios.get(
          `https://6682d6854102471fa4c86c77.mockapi.io/mycoach/mycoach/${id}`
        );
        const card = response.data;
        setName(card.name);
        setPhone(card.phone);
        setAddress(card.address);
        setCertificates(card.certificates);
        setImage(card.image);
      } catch (error) {
        console.error("Error fetching card:", error);
      }
    };

    fetchCard();
  }, [id]);

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

    const cardData = {
      name,
      phone,
      address,
      certificates,
      image,
    };

    try {
      console.log("Sending data:", cardData);
      await axios.put(
        `https://6682d6854102471fa4c86c77.mockapi.io/mycoach/mycoach/${id}`,
        cardData
      );
      navigate("/mainpage"); // Redirect to main page after successful submission
    } catch (error) {
      console.error("Error updating card:", error);
    }
  };

  return (
    <div className="card-form-wrapper">
      <form className="card-form" onSubmit={handleSubmit}>
        <h2>Edit Card</h2>
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
        <button type="submit">Update Card</button>
      </form>
    </div>
  );
};

export default EditCard;
