import { Link } from 'react-router-dom';
import MagneticButton from './MagneticButton';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border" style={{ background: 'hsl(220 15% 5%)' }}>
      {/* CTA */}
      <div className="container-custom py-16 sm:py-24 md:py-32 lg:py-40">
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-label text-muted-foreground mb-4 sm:mb-6">Let's work together</p>
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-[0.9] mb-6 sm:mb-8">
            Have a project in<span className="gradient-text"> mind?</span>
          </h2>
          <Link to="/contact">
            <MagneticButton className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground rounded-full text-base sm:text-lg font-medium glow-cyan hover:shadow-[0_0_60px_hsla(187,100%,50%,0.3)] transition-shadow duration-500">
              Get In Touch
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </MagneticButton>
          </Link>
        </div>
      </div>

      {/* Bottom */}
      <div className="container-custom py-6 sm:py-8 border-t border-border">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-8">
            <Link to="/" className="text-lg sm:text-xl font-display font-bold hover:text-primary transition-colors">
              PORTFOLIO<span className="text-primary">.</span>
            </Link>
            <span className="text-muted-foreground text-xs sm:text-sm">© {currentYear} All rights reserved</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-8">
            <a href="mailto:hello@portfolio.dev" className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm">
              hello@portfolio.dev
            </a>
            <div className="flex gap-3 sm:gap-4">
              {['Twitter', 'LinkedIn', 'Dribbble', 'GitHub'].map(social => (
                <a key={social} href="#" className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm hover:drop-shadow-[0_0_6px_hsla(187,100%,50%,0.4)]">
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
