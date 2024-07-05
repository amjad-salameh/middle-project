import "./AboutSport.css";

const AboutRunning = () => {
  return (
    <div className="about-sport">
      <h1>About Running</h1>
      <p>
        Running is a method of terrestrial locomotion allowing humans and other
        animals to move rapidly on foot. It is simply defined in sporting terms
        as a gait in which at regular points during the running cycle both feet
        are off the ground.
      </p>
      <div className="sport-images">
        <img
          src="https://cdn.pixabay.com/photo/2023/10/04/14/15/man-8293794_1280.jpg"
          alt="Running"
        />
        <img
          src="https://cdn.pixabay.com/photo/2020/04/22/10/14/man-5077131_960_720.jpg"
          alt="Running"
        />
      </div>
    </div>
  );
};

export default AboutRunning;
