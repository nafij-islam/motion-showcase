import { useEffect, useRef, useState, lazy, Suspense } from 'react';
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
import Preloader from '@/components/Preloader';
import heroBg from '@/assets/hero-bg.jpg';

const ParticleField = lazy(() => import('@/components/ParticleField'));

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  // Lenis smooth scroll
  useEffect(() => {
    if (isLoading) return;
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    return () => lenis.destroy();
  }, [isLoading]);

  // Main animations
  useEffect(() => {
    if (isLoading) return;

    const ctx = gsap.context(() => {
      // Hero — cinematic entrance with stagger
      const heroTl = gsap.timeline({ delay: 0.2 });
      heroTl
        .fromTo('.hero-line',
          { y: 150, rotateX: -90, opacity: 0, skewY: 5 },
          { y: 0, rotateX: 0, opacity: 1, skewY: 0, stagger: 0.12, duration: 1.4, ease: 'power4.out' }
        )
        .fromTo('.hero-sub',
          { y: 40, opacity: 0, filter: 'blur(10px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1, ease: 'power3.out' },
          '-=0.8'
        )
        .fromTo('.hero-cta',
          { y: 30, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.8, ease: 'back.out(1.7)' },
          '-=0.6'
        )
        .fromTo('.hero-badge',
          { scale: 0, rotateZ: -90, opacity: 0 },
          { scale: 1, rotateZ: 0, opacity: 1, duration: 1, ease: 'elastic.out(1, 0.4)' },
          '-=0.4'
        );

      // Hero image parallax
      gsap.fromTo(heroImageRef.current,
        { scale: 1.3 },
        { scale: 1, yPercent: 30, ease: 'none', scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 1 } }
      );

      // Hero content fade on scroll
      gsap.to(heroContentRef.current, {
        y: -100, opacity: 0, ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: '50% top', scrub: 1 },
      });

      // Scroll indicator
      gsap.to('.scroll-indicator', { y: 10, opacity: 0.5, repeat: -1, yoyo: true, duration: 1.5, ease: 'power2.inOut' });

      // Stats — elastic counter with 3D pop
      const statItems = statsRef.current?.querySelectorAll('.stat-item');
      statItems?.forEach((item, i) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: item, start: 'top 85%' } });
        tl.fromTo(item,
          { y: 80, opacity: 0, scale: 0.8, rotateZ: -5 },
          { y: 0, opacity: 1, scale: 1, rotateZ: 0, duration: 1, ease: 'elastic.out(1, 0.5)', delay: i * 0.12 }
        );
        const num = item.querySelector('.stat-number');
        if (num) {
          const target = parseInt(num.getAttribute('data-target') || '0');
          tl.fromTo(num, { innerText: 0 }, { innerText: target, duration: 2, ease: 'power2.out', snap: { innerText: 1 } }, '-=0.8');
        }
      });

      // Stats glow line
      gsap.fromTo('.stats-glow-line', { scaleX: 0 }, {
        scaleX: 1, duration: 1.5, ease: 'power4.inOut',
        scrollTrigger: { trigger: statsRef.current, start: 'top 80%' },
      });

      // Services — 3D card flip entrance
      const serviceCards = servicesRef.current?.querySelectorAll('.service-card');
      serviceCards?.forEach((card, i) => {
        gsap.fromTo(card,
          { y: 100, opacity: 0, rotateX: -30, rotateY: i % 2 === 0 ? -15 : 15, scale: 0.85, filter: 'blur(8px)' },
          {
            y: 0, opacity: 1, rotateX: 0, rotateY: 0, scale: 1, filter: 'blur(0px)',
            duration: 1.2, ease: 'power4.out',
            scrollTrigger: { trigger: card, start: 'top 88%' }, delay: i * 0.1,
          }
        );
      });

      // Marquee
      const marqueeInner = document.querySelector('.marquee-inner');
      if (marqueeInner) gsap.to(marqueeInner, { xPercent: -50, ease: 'none', duration: 25, repeat: -1 });

      // CTA section
      gsap.fromTo('.cta-section',
        { y: 80, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power4.out', scrollTrigger: { trigger: '.cta-section', start: 'top 85%' } }
      );
      gsap.fromTo('.cta-text',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.cta-section', start: 'top 80%' } }
      );
    });

    return () => ctx.revert();
  }, [isLoading]);

  const stats = [
    { number: 8, label: 'Years Experience', suffix: '+' },
    { number: 150, label: 'Projects Completed', suffix: '+' },
    { number: 50, label: 'Happy Clients', suffix: '+' },
    { number: 12, label: 'Awards Won', suffix: '' },
  ];

  const services = [
    { icon: '◈', title: 'UI/UX Design', desc: 'Creating intuitive interfaces' },
    { icon: '◇', title: 'Development', desc: 'Building scalable solutions' },
    { icon: '○', title: 'Motion Design', desc: 'Bringing interfaces to life' },
    { icon: '□', title: 'Branding', desc: 'Crafting visual identities' },
  ];

  if (isLoading) return <Preloader onComplete={() => setIsLoading(false)} />;

  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <Navigation />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center overflow-hidden">
        <div ref={heroImageRef} className="absolute inset-0 z-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/70 to-background" />
        </div>

        {/* Three.js Particle Field */}
        <Suspense fallback={null}>
          <ParticleField intensity="high" showGeometry />
        </Suspense>

        <div ref={heroContentRef} className="container-custom relative z-10">
          <div className="max-w-5xl">
            {/* Floating badge */}
            <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 mb-6 sm:mb-8" style={{ background: 'hsl(187 100% 50% / 0.08)' }}>
              <div className="relative">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <div className="absolute inset-0 w-2 h-2 bg-primary rounded-full animate-ping" />
              </div>
              <span className="text-xs sm:text-sm text-primary font-medium">Available for projects</span>
            </div>

            <div className="overflow-hidden mb-2 sm:mb-4" style={{ perspective: '800px' }}>
              <p className="hero-line text-label text-primary" style={{ transformStyle: 'preserve-3d' }}>
                <TextScramble text="Digital Designer & Developer" delay={0.5} />
              </p>
            </div>

            <div className="overflow-hidden" style={{ perspective: '800px' }}>
              <h1 className="hero-line text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] font-bold leading-[0.85] tracking-[-0.04em] font-display mb-2" style={{ transformStyle: 'preserve-3d' }}>
                Creative
              </h1>
            </div>
            <div className="overflow-hidden" style={{ perspective: '800px' }}>
              <h1 className="hero-line text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] font-bold leading-[0.85] tracking-[-0.04em] font-display mb-6 sm:mb-8 gradient-text" style={{ transformStyle: 'preserve-3d' }}>
                Developer
              </h1>
            </div>

            <p className="hero-sub text-sm sm:text-lg md:text-xl leading-relaxed font-light text-muted-foreground max-w-xl mb-8 sm:mb-12">
              I craft visually stunning and highly performant digital experiences
              that push the boundaries of modern web design.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6">
              <Link to="/projects">
                <MagneticButton className="hero-cta group px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground rounded-full text-base sm:text-lg font-medium overflow-hidden relative glow-cyan w-full sm:w-auto">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    View My Work
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </MagneticButton>
              </Link>
              <Link to="/contact">
                <MagneticButton className="hero-cta px-6 sm:px-8 py-3 sm:py-4 border border-primary/40 rounded-full text-base sm:text-lg font-medium hover:border-primary hover:text-primary transition-all duration-300 hover:shadow-[0_0_20px_hsla(187,100%,50%,0.2)] w-full sm:w-auto">
                  Get In Touch
                </MagneticButton>
              </Link>
            </div>
          </div>

          <div className="scroll-indicator absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 sm:gap-4">
            <span className="text-xs sm:text-sm text-muted-foreground">Scroll</span>
            <div className="w-px h-12 sm:h-16 bg-gradient-to-b from-primary to-transparent" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 sm:py-24 md:py-32 border-y border-border relative overflow-hidden" style={{ background: 'linear-gradient(180deg, hsl(220 15% 5%), hsl(220 15% 7%))' }}>
        <div className="stats-glow-line absolute top-0 left-0 right-0 h-px origin-left scale-x-0" style={{ background: 'linear-gradient(90deg, transparent, hsl(187 100% 50% / 0.5), transparent)' }} />
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12">
            {stats.map((stat, i) => (
              <div key={i} className="stat-item text-center group cursor-default">
                <div className="text-3xl sm:text-5xl md:text-7xl font-display font-bold gradient-text mb-2 sm:mb-3 group-hover:drop-shadow-[0_0_20px_hsla(187,100%,50%,0.4)] transition-all duration-500">
                  <span className="stat-number" data-target={stat.number}>0</span>
                  {stat.suffix}
                </div>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground group-hover:text-primary/70 transition-colors duration-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <FeaturedProjects />

      {/* Services Section */}
      <section ref={servicesRef} className="py-16 sm:py-24 md:py-32 lg:py-40 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full blur-[200px] opacity-5" style={{ background: 'hsl(187 100% 50%)' }} />
        <div className="container-custom relative z-10">
          <div className="text-center mb-10 sm:mb-16">
            <p className="text-label text-primary mb-3 sm:mb-4">What I Do</p>
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold font-display">
              Services &<span className="gradient-text"> Expertise</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {services.map((service, i) => (
              <div
                key={i}
                className="service-card group p-6 sm:p-8 rounded-2xl border border-border hover:border-primary/50 transition-all duration-500 cursor-pointer relative overflow-hidden"
                style={{ transformStyle: 'preserve-3d', background: 'hsl(220 15% 7%)' }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'radial-gradient(circle at 50% 0%, hsl(187 100% 50% / 0.08), transparent 70%)' }} />
                <div className="relative z-10">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-500" style={{ background: 'hsl(187 100% 50% / 0.1)', boxShadow: '0 0 0 1px hsl(187 100% 50% / 0.1)' }}>
                    <span className="text-2xl sm:text-3xl text-primary group-hover:drop-shadow-[0_0_10px_hsla(187,100%,50%,0.5)] transition-all duration-500">{service.icon}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-display font-bold mb-2 sm:mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="py-8 sm:py-16 border-y border-border overflow-hidden">
        <div className="marquee-inner flex gap-6 sm:gap-12 whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-6 sm:gap-12 items-center">
              <span className="text-4xl sm:text-7xl md:text-9xl font-display font-bold text-foreground/5 hover:text-primary/20 transition-colors duration-500">Design</span>
              <span className="text-primary text-3xl sm:text-5xl">✦</span>
              <span className="text-4xl sm:text-7xl md:text-9xl font-display font-bold text-foreground/5 hover:text-primary/20 transition-colors duration-500">Develop</span>
              <span className="text-primary text-3xl sm:text-5xl">✦</span>
              <span className="text-4xl sm:text-7xl md:text-9xl font-display font-bold text-foreground/5 hover:text-primary/20 transition-colors duration-500">Deliver</span>
              <span className="text-primary text-3xl sm:text-5xl">✦</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 md:py-32 lg:py-40">
        <div className="container-custom">
          <div className="cta-section relative rounded-2xl sm:rounded-3xl border border-border p-8 sm:p-12 md:p-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, hsl(220 15% 7%), hsl(220 15% 9%))' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
            <div className="absolute -top-40 -right-40 w-60 sm:w-80 h-60 sm:h-80 rounded-full blur-[120px] opacity-10" style={{ background: 'hsl(187 100% 50%)' }} />
            
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <h2 className="cta-text text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold font-display mb-4 sm:mb-6">
                Have a project in<span className="gradient-text"> mind?</span>
              </h2>
              <p className="cta-text text-sm sm:text-lg md:text-xl leading-relaxed font-light text-muted-foreground mb-6 sm:mb-10">
                Let's collaborate and create something extraordinary together.
              </p>
              <Link to="/contact" className="cta-text inline-block">
                <MagneticButton className="inline-flex items-center gap-2 sm:gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-primary text-primary-foreground rounded-full text-lg sm:text-xl font-medium glow-cyan hover:shadow-[0_0_60px_hsla(187,100%,50%,0.3)] transition-shadow duration-500">
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
