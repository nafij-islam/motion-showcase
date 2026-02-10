import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import MagneticButton from './MagneticButton';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home', index: '01' },
    { path: '/about', label: 'About', index: '02' },
    { path: '/services', label: 'Services', index: '03' },
    { path: '/projects', label: 'Projects', index: '04' },
    { path: '/contact', label: 'Contact', index: '05' },
  ];

  useEffect(() => {
    const menu = menuRef.current;
    const menuItems = menuItemsRef.current;
    if (!menu || !menuItems) return;

    const links = menuItems.querySelectorAll('.menu-link');

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      const tl = gsap.timeline();
      tl.to(menu, { clipPath: 'circle(150% at calc(100% - 40px) 40px)', duration: 0.8, ease: 'power4.inOut' })
        .fromTo(links,
          { y: 80, opacity: 0, rotateX: -30 },
          { y: 0, opacity: 1, rotateX: 0, stagger: 0.08, duration: 0.6, ease: 'power3.out' },
          '-=0.4'
        );
    } else {
      document.body.style.overflow = '';
      gsap.to(menu, { clipPath: 'circle(0% at calc(100% - 40px) 40px)', duration: 0.6, ease: 'power4.inOut' });
    }
  }, [isMenuOpen]);

  useEffect(() => { setIsMenuOpen(false); }, [location]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
        <nav className="container-custom flex items-center justify-between h-20 md:h-24">
          <Link to="/" className="text-foreground text-xl md:text-2xl font-display font-bold tracking-tight hover:text-primary transition-colors duration-300">
            PORTFOLIO<span className="text-primary">.</span>
          </Link>

          <div className="hidden lg:flex items-center gap-12">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium tracking-wide line-animate transition-colors duration-300 ${
                  location.pathname === link.path ? 'text-primary' : 'text-foreground hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <MagneticButton
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-foreground/20 flex items-center justify-center hover:border-primary transition-colors duration-300"
          >
            <div className="flex flex-col gap-1.5 items-center justify-center w-5">
              <span className={`block h-[2px] bg-foreground transition-all duration-300 ${isMenuOpen ? 'w-5 rotate-45 translate-y-[5px]' : 'w-5'}`} />
              <span className={`block h-[2px] bg-foreground transition-all duration-300 ${isMenuOpen ? 'w-0 opacity-0' : 'w-3'}`} />
              <span className={`block h-[2px] bg-foreground transition-all duration-300 ${isMenuOpen ? 'w-5 -rotate-45 -translate-y-[5px]' : 'w-5'}`} />
            </div>
          </MagneticButton>
        </nav>
      </header>

      <div ref={menuRef} className="fixed inset-0 z-40" style={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)', background: 'hsl(220 20% 4%)' }}>
        <div ref={menuItemsRef} className="h-full flex flex-col items-center justify-center container-custom">
          <div className="flex flex-col items-start gap-4 md:gap-6">
            {navLinks.map(link => (
              <Link key={link.path} to={link.path} className="menu-link group flex items-baseline gap-4 md:gap-8" style={{ perspective: '500px' }}>
                <span className="text-primary text-sm md:text-base font-body">{link.index}</span>
                <span className={`text-5xl md:text-7xl lg:text-8xl font-display font-bold transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'text-primary drop-shadow-[0_0_20px_hsla(187,100%,50%,0.3)]'
                    : 'text-foreground group-hover:text-primary group-hover:drop-shadow-[0_0_20px_hsla(187,100%,50%,0.2)]'
                }`}>
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          <div className="absolute bottom-12 left-0 right-0 container-custom flex justify-between items-end">
            <div className="text-muted-foreground text-sm">
              <p>Available for work</p>
              <p className="text-primary">hello@portfolio.dev</p>
            </div>
            <div className="hidden md:flex gap-6 text-sm">
              {['Twitter', 'LinkedIn', 'Dribbble'].map(s => (
                <a key={s} href="#" className="text-muted-foreground hover:text-primary transition-colors">{s}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
