import React, { useState, useCallback } from 'react';
import { gsap } from '../../plugins/gsap-register';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import './styles/Contact.css';

interface SocialLink {
  id: string;
  label: string;
  url: string;
  icon: string;
  category: 'social' | 'professional' | 'other';
}

const socialLinks: SocialLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    url: 'https://github.com/yourusername',
    icon: '🔗',
    category: 'professional'
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    url: 'https://linkedin.com/in/yourusername',
    icon: '🔗',
    category: 'professional'
  },
  // Add more social links as needed
];

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const containerRef = useScrollAnimation({
    y: 50,
    opacity: 0,
    duration: 1
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Add your form submission logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      
      setShowSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      
      gsap.to('.success-message', {
        opacity: 1,
        y: 0,
        duration: 0.5,
        onComplete: () => {
          setTimeout(() => {
            gsap.to('.success-message', {
              opacity: 0,
              y: 10,
              duration: 0.5,
              onComplete: () => setShowSuccess(false)
            });
          }, 3000);
        }
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSocialLinksByCategory = useCallback((category: SocialLink['category']) => {
    return socialLinks.filter(link => link.category === category);
  }, []);

  return (
    <section id="contact" className="contact" ref={containerRef}>
      <div className="content-container">
        <div className="contact-content">
          {/* Contact Form */}
          <div className="contact-form-container">
            <h2>Get in Touch</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {showSuccess && (
                <div className="success-message">
                  <span>✓</span>
                  Message sent successfully!
                </div>
              )}
            </form>
          </div>

          {/* Social Links */}
          <div className="social-links">
            <div className="social-section">
              <h3 className="social-title">Professional</h3>
              <div className="social-grid">
                {getSocialLinksByCategory('professional').map(link => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                  >
                    <span className="social-icon">{link.icon}</span>
                    <span className="social-label">{link.label}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="social-section">
              <h3 className="social-title">Social Media</h3>
              <div className="social-grid">
                {getSocialLinksByCategory('social').map(link => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                  >
                    <span className="social-icon">{link.icon}</span>
                    <span className="social-label">{link.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;