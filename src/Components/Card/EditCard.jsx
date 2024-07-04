import  { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Resizer from "react-image-file-resizer";
import "./CardForm.css";
import BackButton from "../BackButton/BackButton";


const EditCard = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [certificates, setCertificates] = useState("");
  const [image, setImage] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await axios.get(
          `https://6682d6854102471fa4c86c77.mockapi.io/mycoach/mycoach/${id}`
        );
        const card = response.data;

        // Get logged-in user email
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && card.email === user.email) {
          setIsOwner(true);
          setName(card.name);
          setPhone(card.phone);
          setAddress(card.address);
          setCertificates(card.certificates);
          setImage(card.image);
        } else {
          alert("You are not authorized to edit this card.");
          navigate("/mainpage");
        }
      } catch (error) {
        console.error("Error fetching card:", error);
      }
    };

    fetchCard();
  }, [id, navigate]);

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
      const response = await axios.put(
        `https://6682d6854102471fa4c86c77.mockapi.io/mycoach/mycoach/${id}`,
        cardData
      );
      console.log("Card updated successfully:", response.data);
      navigate("/mainpage");
    } catch (error) {
      console.error("Error updating card:", error);
    }
  };

  if (!isOwner) {
    return null; // Render nothing if the user is not authorized
  }

  return (
    <>
      <BackButton />

      <div className="card-form-wrapper">
        <form className="card-form" onSubmit={handleSubmit}>
          <h2>Edit Card</h2>
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
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <button type="submit">Update Card</button>
        </form>
      </div>
    </>
  );
};

export default EditCard;
