import { 
  MdArrowOutward, 
  MdCopyright, 
  MdLocationOn 
} from 'react-icons/md';
import { 
  FaGithub, 
  FaLinkedinIn 
} from 'react-icons/fa';
import './styles/Contact.css';

const Contact = () => {
  const socialLinks = [
    {
      name: "Github",
      icon: <FaGithub />,
      url: "https://github.com/Ki11ay",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedinIn />,
      url: "www.linkedin.com/in/mohamed-abubaker-baa87916a",
    }
  ];

  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:mohammedaliedriis@gmail.com" data-cursor="disable">
                mohammedaliedriis@gmail.com
              </a>
            </p>
            <div className="contact-location">
              <MdLocationOn />
              Famagusta, North Cyprus
            </div>
          </div>
          
          <div className="contact-box">
            <h4>Social</h4>
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="disable"
                className="contact-social"
              >
                {link.name}
                <span className="icon-container">
                  {link.icon}
                  <MdArrowOutward />
                </span>
              </a>
            ))}
          </div>

          <div className="contact-box">
            <h2>
              Designed and Developed by
              <br />
              <span>Mohamed Abubaker</span>
            </h2>
            <h5>
              <MdCopyright /> 2025
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
