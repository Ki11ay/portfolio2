import './styles/Landing.css';

const Landing = () => {

  return (
    <section className="landing-section" id="home">
      <div className="landing-content">
        <div className="landing-intro">
          <h3>Hello! I'm</h3>
          <h1>Mohamed <span>Abubaker</span></h1>
        </div>
        
        <div className="landing-info">
          <h2>Software Engineer & Robotics Specialist</h2>
          <p>
            Crafting innovative solutions at the intersection of software and robotics.
            Passionate about building elegant, efficient, and impactful systems.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Landing;
