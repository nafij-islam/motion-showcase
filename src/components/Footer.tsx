import { Link } from 'react-router-dom';
import MagneticButton from './MagneticButton';

/**
 * Premium footer with CTA and social links
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      {/* CTA Section */}
      <div className="container-custom section-padding">
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-label text-muted-foreground mb-6">Let's work together</p>
          <h2 className="text-display-lg mb-8">
            Have a project in
            <span className="gradient-text"> mind?</span>
          </h2>
          <Link to="/contact">
            <MagneticButton className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-full text-lg font-medium hover:bg-gold-light transition-colors duration-300">
              Get In Touch
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </MagneticButton>
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container-custom py-8 border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-8">
            <Link 
              to="/" 
              className="text-xl font-display font-bold hover:text-primary transition-colors"
            >
              PORTFOLIO<span className="text-primary">.</span>
            </Link>
            <span className="text-muted-foreground text-sm">
              © {currentYear} All rights reserved
            </span>
          </div>

          <div className="flex items-center gap-8">
            <a 
              href="mailto:hello@portfolio.dev" 
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              hello@portfolio.dev
            </a>
            <div className="flex gap-4">
              {['Twitter', 'LinkedIn', 'Dribbble', 'GitHub'].map(social => (
                <a
                  key={social}
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
