
import "./AboutSport.css";

const AboutSwimming = () => {
  return (
    <div className="about-sport">
      <h1>About Swimming</h1>
      <p>
        Swimming is an individual or team racing sport that requires the use of
        one's entire body to move through water. The sport takes place in pools
        or open water (e.g., in a sea or lake). Competitive swimming is one of
        the most popular Olympic sports, with varied distance events in
        butterfly, backstroke, breaststroke, freestyle, and individual medley.
      </p>
      <div className="sport-images">
        <img
          src="https://cdn.pixabay.com/photo/2016/11/23/18/21/floating-1854203_960_720.jpg"
          alt="Swimming"
        />
        <img
          src="https://cdn.pixabay.com/photo/2014/09/26/21/51/man-462874_960_720.jpg"
          alt="Swimming"
        />
      </div>
    </div>
  );
};

export default AboutSwimming;
