import "./AboutSport.css";

const AboutCycling = () => {
  return (
    <div className="about-sport">
      <h1>About Cycling</h1>
      <p>
        Cycling, also called biking or bicycling, is the use of bicycles for
        transport, recreation, exercise, or sport. People engaged in cycling are
        referred to as "cyclists", "bikers", or less commonly, as "bicyclists".
      </p>
      <div className="sport-images">
        <img
          src="https://cdn.pixabay.com/photo/2022/02/27/06/33/man-7036709_960_720.jpg"
          alt="Cycling"
        />
        <img
          src="https://cdn.pixabay.com/photo/2023/01/30/06/43/village-7754827_960_720.jpg"
          alt="Cycling"
        />
      </div>
    </div>
  );
};

export default AboutCycling;
