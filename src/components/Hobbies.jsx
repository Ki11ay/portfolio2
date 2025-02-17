import { FaPen, FaHiking } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './styles/Hobbies.css';

const Hobbies = () => {
  const hobbies = [
    {
      id: 1,
      title: "Writing",
      description: "I enjoy expressing ideas and sharing knowledge through writing. My writing spans technical topics, creative pieces, and documentation.",
      icon: <FaPen className="hobby-icon" />,
      link: "/writings",
      linkText: "View my writings"
    },
    {
      id: 2,
      title: "Hiking",
      description: "Exploring nature through hiking helps me maintain perspective and find inspiration. Each trail offers new challenges and discoveries.",
      icon: <FaHiking className="hobby-icon" />,
      isPending: true
    }
  ];

  return (
    <section className="hobbies-section" id="hobbies">
      <div className="hobbies-container">
        <div className="hobbies-header">
          <h2>Hobbies & Interests</h2>
        </div>
        <div className="hobbies-grid">
          {hobbies.map((hobby) => (
            <div 
              key={hobby.id} 
              className={`hobby-card ${hobby.isPending ? 'content-pending' : ''}`}
            >
              {hobby.icon}
              <h3>{hobby.title}</h3>
              <p>{hobby.description}</p>
              {hobby.isPending ? (
                <div className="hobby-placeholder">
                  More content coming soon...
                </div>
              ) : hobby.link ? (
                <Link to={hobby.link} className="hobby-link">
                  {hobby.linkText}
                </Link>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hobbies;
