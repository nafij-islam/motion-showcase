import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import MagneticButton from '@/components/MagneticButton';
import heroBg from '@/assets/hero-bg.jpg';
import project1 from '@/assets/project-1.jpg';
import project2 from '@/assets/project-2.jpg';

gsap.registerPlugin(ScrollTrigger);

/**
 * Homepage with premium GSAP animations
 * - Hero with text reveal and parallax
 * - Featured projects section
 * - Stats counter
 * - Marquee text
 */
const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero title animation - split text reveal
      const titleChars = heroTitleRef.current?.querySelectorAll('.char');
      if (titleChars) {
        gsap.from(titleChars, {
          y: 120,
          opacity: 0,
          rotateX: -90,
          stagger: 0.03,
          duration: 1.2,
          ease: 'power4.out',
          delay: 0.5,
        });
      }

      // Subtitle fade in
      gsap.from(heroSubtitleRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 1.2,
      });

      // Hero image parallax
      gsap.to(heroImageRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Stats counter animation
      const statNumbers = statsRef.current?.querySelectorAll('.stat-number');
      statNumbers?.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target') || '0');
        gsap.from(stat, {
          textContent: 0,
          duration: 2,
          ease: 'power2.out',
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: stat,
            start: 'top 80%',
          },
          onUpdate: function() {
            const current = Math.round(gsap.getProperty(stat, 'textContent') as number);
            stat.textContent = current.toString();
          },
        });
      });

      // Featured projects reveal
      const projectCards = featuredRef.current?.querySelectorAll('.project-card');
      projectCards?.forEach((card, i) => {
        gsap.from(card, {
          y: 100,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
          delay: i * 0.2,
        });
      });

      // Marquee animation
      gsap.to('.marquee-inner', {
        xPercent: -50,
        ease: 'none',
        duration: 20,
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  // Split hero title text
  const heroTitle = "Creative Developer";
  const splitTitle = heroTitle.split('').map((char, i) => (
    <span key={i} className="char inline-block" style={{ perspective: '1000px' }}>
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  const stats = [
    { number: 8, label: 'Years Experience', suffix: '+' },
    { number: 150, label: 'Projects Completed', suffix: '+' },
    { number: 50, label: 'Happy Clients', suffix: '+' },
    { number: 12, label: 'Awards Won', suffix: '' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <Navigation />

      {/* Hero Section */}
      <section 
        ref={heroRef} 
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        {/* Background image with parallax */}
        <div
          ref={heroImageRef}
          className="absolute inset-0 z-0"
        >
          <img 
            src={heroBg} 
            alt="" 
            className="w-full h-[120%] object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
        </div>

        <div className="container-custom relative z-10 pt-32">
          <div className="max-w-5xl">
            {/* Label */}
            <p className="text-label text-primary mb-6 animate-fade-in">
              Digital Designer & Developer
            </p>
            
            {/* Main title */}
            <h1 
              ref={heroTitleRef}
              className="text-display-xl mb-8"
              style={{ perspective: '1000px' }}
            >
              {splitTitle}
            </h1>

            {/* Subtitle */}
            <p 
              ref={heroSubtitleRef}
              className="text-body-lg text-muted-foreground max-w-xl mb-12"
            >
              I craft visually stunning and highly performant digital experiences 
              that push the boundaries of modern web design.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-6">
              <Link to="/projects">
                <MagneticButton className="px-8 py-4 bg-primary text-primary-foreground rounded-full text-lg font-medium hover:bg-gold-light transition-colors duration-300">
                  View My Work
                </MagneticButton>
              </Link>
              <Link to="/contact">
                <MagneticButton className="px-8 py-4 border border-foreground/30 rounded-full text-lg font-medium hover:border-primary hover:text-primary transition-colors duration-300">
                  Get In Touch
                </MagneticButton>
              </Link>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
            <span className="text-sm text-muted-foreground">Scroll</span>
            <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="section-padding border-y border-border">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl md:text-6xl lg:text-7xl font-display font-bold gradient-text mb-2">
                  <span className="stat-number" data-target={stat.number}>0</span>
                  {stat.suffix}
                </div>
                <p className="text-muted-foreground text-sm md:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section ref={featuredRef} className="section-padding">
        <div className="container-custom">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-label text-primary mb-4">Selected Works</p>
              <h2 className="text-display-md">Featured Projects</h2>
            </div>
            <Link 
              to="/projects" 
              className="hidden md:flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
            >
              View All Projects
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                className="group-hover:translate-x-1 transition-transform"
              >
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { 
                title: 'Digital Experience Platform', 
                category: 'Web Design', 
                image: project1 
              },
              { 
                title: 'Luxury Brand App', 
                category: 'Mobile App', 
                image: project2 
              },
            ].map((project, i) => (
              <Link 
                key={i}
                to="/projects"
                className="project-card group relative overflow-hidden rounded-2xl bg-card"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-primary text-sm mb-2">{project.category}</p>
                  <h3 className="text-2xl md:text-3xl font-display font-bold">{project.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section ref={marqueeRef} className="py-16 border-y border-border overflow-hidden">
        <div className="marquee-inner flex gap-8 whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-8 items-center">
              <span className="text-6xl md:text-8xl font-display font-bold text-foreground/10">
                Design
              </span>
              <span className="text-primary text-4xl">✦</span>
              <span className="text-6xl md:text-8xl font-display font-bold text-foreground/10">
                Develop
              </span>
              <span className="text-primary text-4xl">✦</span>
              <span className="text-6xl md:text-8xl font-display font-bold text-foreground/10">
                Deliver
              </span>
              <span className="text-primary text-4xl">✦</span>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
