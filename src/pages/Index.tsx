import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import FeaturedProjects from '@/components/FeaturedProjects';
import MagneticButton from '@/components/MagneticButton';
import TextScramble from '@/components/TextScramble';
import RevealText from '@/components/RevealText';
import ParallaxImage from '@/components/ParallaxImage';
import Preloader from '@/components/Preloader';
import heroBg from '@/assets/hero-bg.jpg';
import project1 from '@/assets/project-1.jpg';
import project2 from '@/assets/project-2.jpg';
import project3 from '@/assets/project-3.jpg';
import project4 from '@/assets/project-4.jpg';

gsap.registerPlugin(ScrollTrigger);

/**
 * Homepage with premium GSAP animations
 * - Preloader with counter
 * - Smooth scroll with Lenis
 * - Hero with text scramble and parallax
 * - Horizontal scroll projects
 * - Pinned sections
 */
const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const horizontalInnerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (isLoading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Connect Lenis to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, [isLoading]);

  // Main animations
  useEffect(() => {
    if (isLoading) return;

    const ctx = gsap.context(() => {
      // Hero content stagger animation
      gsap.from('.hero-element', {
        y: 100,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.3,
      });

      // Hero image parallax with scale
      gsap.fromTo(heroImageRef.current,
        { scale: 1.3 },
        {
          scale: 1,
          yPercent: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );

      // Hero content fade out on scroll
      gsap.to(heroContentRef.current, {
        y: -100,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '50% top',
          scrub: 1,
        },
      });

      // Stats counter animation with stagger
      const statNumbers = statsRef.current?.querySelectorAll('.stat-number');
      statNumbers?.forEach((stat, i) => {
        const target = parseInt(stat.getAttribute('data-target') || '0');
        gsap.fromTo(stat,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2.5,
            ease: 'power2.out',
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: stat,
              start: 'top 80%',
            },
            delay: i * 0.2,
          }
        );
      });

      // Stats reveal animation
      gsap.from('.stat-item', {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 80%',
        },
      });

      // Horizontal scroll for projects
      const scrollContainer = horizontalInnerRef.current;
      if (scrollContainer) {
        const scrollWidth = scrollContainer.scrollWidth;
        const viewportWidth = window.innerWidth;

        gsap.to(scrollContainer, {
          x: -(scrollWidth - viewportWidth + 100),
          ease: 'none',
          scrollTrigger: {
            trigger: horizontalRef.current,
            start: 'top top',
            end: () => `+=${scrollWidth}`,
            scrub: 1.5,
            pin: true,
            anticipatePin: 1,
          },
        });

        // Project cards animation
        const projectCards = scrollContainer.querySelectorAll('.h-project');
        projectCards.forEach((card, i) => {
          gsap.from(card, {
            scale: 0.8,
            opacity: 0,
            rotateY: -15,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              containerAnimation: gsap.to(scrollContainer, { x: 0 }),
              start: 'left 80%',
              toggleActions: 'play none none reverse',
            },
          });
        });
      }

      // Services cards 3D rotation on scroll
      const serviceCards = servicesRef.current?.querySelectorAll('.service-card');
      serviceCards?.forEach((card, i) => {
        gsap.from(card, {
          y: 100,
          opacity: 0,
          rotateX: -20,
          scale: 0.9,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
          delay: i * 0.1,
        });
      });

      // Marquee infinite animation
      const marqueeInner = document.querySelector('.marquee-inner');
      if (marqueeInner) {
        gsap.to(marqueeInner, {
          xPercent: -50,
          ease: 'none',
          duration: 25,
          repeat: -1,
        });
      }

      // Scroll indicator animation
      gsap.to('.scroll-indicator', {
        y: 10,
        opacity: 0.5,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: 'power2.inOut',
      });
    });

    return () => ctx.revert();
  }, [isLoading]);

  const stats = [
    { number: 8, label: 'Years Experience', suffix: '+' },
    { number: 150, label: 'Projects Completed', suffix: '+' },
    { number: 50, label: 'Happy Clients', suffix: '+' },
    { number: 12, label: 'Awards Won', suffix: '' },
  ];

  const projects = [
    { title: 'Digital Platform', category: 'Web Design', image: project1 },
    { title: 'Luxury Brand App', category: 'Mobile', image: project2 },
    { title: 'E-commerce', category: 'Web Design', image: project3 },
    { title: 'Brand Identity', category: 'Branding', image: project4 },
  ];

  const services = [
    { icon: '◈', title: 'UI/UX Design', desc: 'Creating intuitive interfaces' },
    { icon: '◇', title: 'Development', desc: 'Building scalable solutions' },
    { icon: '○', title: 'Motion Design', desc: 'Bringing interfaces to life' },
    { icon: '□', title: 'Branding', desc: 'Crafting visual identities' },
  ];

  if (isLoading) {
    return <Preloader onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <Navigation />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center overflow-hidden"
      >
        {/* Background with parallax */}
        <div ref={heroImageRef} className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt=""
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/70 to-background" />
        </div>

        <div ref={heroContentRef} className="container-custom relative z-10">
          <div className="max-w-5xl">
            {/* Label with scramble effect */}
            <div className="hero-element overflow-hidden mb-6">
              <p className="text-label text-primary">
                <TextScramble text="Digital Designer & Developer" delay={0.5} />
              </p>
            </div>

            {/* Main title with reveal */}
            <h1 className="hero-element text-display-xl mb-8">
              <span className="block overflow-hidden">
                <span className="inline-block">Creative</span>
              </span>
              <span className="block overflow-hidden">
                <span className="inline-block gradient-text">Developer</span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="hero-element text-body-lg text-muted-foreground max-w-xl mb-12">
              I craft visually stunning and highly performant digital experiences
              that push the boundaries of modern web design.
            </p>

            {/* CTA buttons */}
            <div className="hero-element flex flex-wrap gap-6">
              <Link to="/projects">
                <MagneticButton className="group px-8 py-4 bg-primary text-primary-foreground rounded-full text-lg font-medium overflow-hidden relative">
                  <span className="relative z-10 flex items-center gap-2">
                    View My Work
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="group-hover:translate-x-1 transition-transform"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gold-light translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </MagneticButton>
              </Link>
              <Link to="/contact">
                <MagneticButton className="px-8 py-4 border border-foreground/30 rounded-full text-lg font-medium hover:border-primary hover:text-primary transition-all duration-300">
                  Get In Touch
                </MagneticButton>
              </Link>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
            <span className="text-sm text-muted-foreground">Scroll</span>
            <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="section-padding border-y border-border bg-card">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, i) => (
              <div key={i} className="stat-item text-center">
                <div className="text-5xl md:text-7xl font-display font-bold gradient-text mb-3">
                  <span className="stat-number" data-target={stat.number}>
                    0
                  </span>
                  {stat.suffix}
                </div>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Horizontal Scroll Projects */}
      <section ref={horizontalRef} className="h-screen">
        <div className="h-full flex items-center">
          <div ref={horizontalInnerRef} className="flex gap-8 pl-20 pr-[50vw]">
            {/* Section title */}
            <div className="shrink-0 w-[40vw] flex flex-col justify-center pr-20">
              <p className="text-label text-primary mb-4">Selected Works</p>
              <h2 className="text-display-md mb-6">
                Featured
                <span className="gradient-text"> Projects</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Explore my latest work showcasing creative solutions for brands worldwide.
              </p>
              <Link to="/projects" className="inline-flex items-center gap-2 text-primary hover:gap-4 transition-all">
                View All Projects
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Project cards */}
            {projects.map((project, i) => (
              <Link
                key={i}
                to="/projects"
                className="h-project shrink-0 w-[70vw] md:w-[40vw] group"
                style={{ perspective: '1000px' }}
              >
                <div className="relative h-[70vh] rounded-3xl overflow-hidden bg-card">
                  <ParallaxImage
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0"
                    speed={0.2}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                    <p className="text-primary text-sm mb-2">{project.category}</p>
                    <h3 className="text-3xl md:text-4xl font-display font-bold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  {/* Arrow */}
                  <div className="absolute top-8 right-8 w-12 h-12 rounded-full border border-foreground/30 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="group-hover:rotate-45 transition-transform duration-300"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <RevealText className="text-label text-primary mb-4" type="words">
              What I Do
            </RevealText>
            <h2 className="text-display-md">
              <RevealText type="words" delay={0.2}>
                Services & Expertise
              </RevealText>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <div
                key={i}
                className="service-card group p-8 bg-card rounded-2xl border border-border hover:border-primary/50 transition-all duration-500 cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <span className="text-3xl text-primary">{service.icon}</span>
                </div>
                <h3 className="text-xl font-display font-bold mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section ref={marqueeRef} className="py-16 border-y border-border overflow-hidden">
        <div className="marquee-inner flex gap-12 whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-12 items-center">
              <span className="text-7xl md:text-9xl font-display font-bold text-foreground/5 hover:text-foreground/10 transition-colors duration-500">
                Design
              </span>
              <span className="text-primary text-5xl">✦</span>
              <span className="text-7xl md:text-9xl font-display font-bold text-foreground/5 hover:text-foreground/10 transition-colors duration-500">
                Develop
              </span>
              <span className="text-primary text-5xl">✦</span>
              <span className="text-7xl md:text-9xl font-display font-bold text-foreground/5 hover:text-foreground/10 transition-colors duration-500">
                Deliver
              </span>
              <span className="text-primary text-5xl">✦</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="relative rounded-3xl bg-card border border-border p-12 md:p-20 overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
            
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <RevealText className="text-display-md mb-6" type="words">
                Have a project in mind?
              </RevealText>
              <p className="text-body-lg text-muted-foreground mb-10">
                Let's collaborate and create something extraordinary together.
              </p>
              <Link to="/contact">
                <MagneticButton className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground rounded-full text-xl font-medium hover:bg-gold-light transition-colors duration-300">
                  Start a Project
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </MagneticButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
