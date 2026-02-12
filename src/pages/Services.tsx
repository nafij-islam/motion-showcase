import { useEffect, useRef, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import MagneticButton from '@/components/MagneticButton';
import TextScramble from '@/components/TextScramble';

const ParticleField = lazy(() => import('@/components/ParticleField'));

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const cardsRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero 3D text
      const heroTl = gsap.timeline({ delay: 0.2 });
      heroTl
        .fromTo('.svc-hero-line',
          { y: 100, rotateX: -70, opacity: 0, skewY: 3 },
          { y: 0, rotateX: 0, opacity: 1, skewY: 0, stagger: 0.1, duration: 1.3, ease: 'power4.out' }
        )
        .fromTo('.svc-hero-desc',
          { y: 30, opacity: 0, filter: 'blur(8px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' },
          '-=0.6'
        );

      // Service cards 3D entrance
      const cards = cardsRef.current?.querySelectorAll('.service-card');
      cards?.forEach((card, i) => {
        const angles = [
          { rotateX: -30, rotateY: -20 }, { rotateX: -20, rotateY: 15 },
          { rotateX: -35, rotateY: -10 }, { rotateX: -15, rotateY: 25 },
          { rotateX: -25, rotateY: -15 }, { rotateX: -30, rotateY: 10 },
        ];
        const angle = angles[i % angles.length];

        gsap.fromTo(card,
          { y: 120, opacity: 0, ...angle, scale: 0.8, filter: 'blur(12px)' },
          {
            y: 0, opacity: 1, rotateX: 0, rotateY: 0, scale: 1, filter: 'blur(0px)',
            duration: 1.2, ease: 'power4.out',
            scrollTrigger: { trigger: card, start: 'top 88%' }, delay: i * 0.08,
          }
        );

        // 3D tilt
        card.addEventListener('mousemove', ((e: MouseEvent) => {
          const rect = (card as HTMLElement).getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(card, { rotateX: -y * 15, rotateY: x * 15, duration: 0.3, ease: 'power2.out' });
        }) as EventListener);

        card.addEventListener('mouseleave', () => {
          gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
        });
      });

      // Process steps
      const steps = processRef.current?.querySelectorAll('.process-step');
      steps?.forEach((step, i) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: step, start: 'top 82%' } });
        tl.fromTo(step,
          { x: i % 2 === 0 ? -80 : 80, opacity: 0, scale: 0.95, rotateY: i % 2 === 0 ? -8 : 8 },
          { x: 0, opacity: 1, scale: 1, rotateY: 0, duration: 1, ease: 'power4.out' }
        );
        tl.fromTo(step.querySelector('.process-number'),
          { scale: 0, rotateZ: -45 },
          { scale: 1, rotateZ: 0, duration: 0.6, ease: 'back.out(2)' },
          '-=0.6'
        );
        const line = step.querySelector('.process-line');
        if (line) tl.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: 'power4.inOut' }, '-=0.4');
      });

      // Process vertical line
      gsap.fromTo('.process-vertical-line', { scaleY: 0 }, {
        scaleY: 1, transformOrigin: 'top', duration: 2, ease: 'power3.out',
        scrollTrigger: { trigger: processRef.current, start: 'top 70%' },
      });

      // CTA
      gsap.fromTo('.svc-cta',
        { y: 60, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power4.out', scrollTrigger: { trigger: '.svc-cta', start: 'top 85%' } }
      );
    });

    return () => ctx.revert();
  }, []);

  const services = [
    { icon: '◈', title: 'UI/UX Design', description: 'Creating intuitive and visually stunning interfaces that enhance user experience.', features: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design'] },
    { icon: '◇', title: 'Web Development', description: 'Building fast, responsive, and scalable web applications.', features: ['React/Next.js', 'Node.js', 'TypeScript', 'Performance'] },
    { icon: '○', title: 'Motion Design', description: 'Bringing interfaces to life with smooth animations.', features: ['GSAP', 'Lottie', 'CSS Animations', 'SVG Animation'] },
    { icon: '□', title: 'Brand Identity', description: 'Crafting memorable brand experiences through cohesive visual systems.', features: ['Logo Design', 'Brand Strategy', 'Visual Identity', 'Guidelines'] },
    { icon: '△', title: 'Mobile Apps', description: 'Designing and developing native-like mobile experiences.', features: ['React Native', 'Flutter', 'App Store', 'Push Notifications'] },
    { icon: '☆', title: 'Consulting', description: 'Providing expert guidance on digital strategy and design.', features: ['Tech Audits', 'Design Systems', 'Team Training', 'Strategy'] },
  ];

  const process = [
    { step: '01', title: 'Discovery', description: 'Understanding your goals and challenges through research.' },
    { step: '02', title: 'Strategy', description: 'Developing a plan that aligns with your objectives.' },
    { step: '03', title: 'Design', description: 'Creating stunning visuals and intuitive interfaces.' },
    { step: '04', title: 'Development', description: 'Building robust, scalable solutions with clean code.' },
    { step: '05', title: 'Launch', description: 'Deploying and ensuring everything runs smoothly.' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <Navigation />

      {/* Hero */}
      <section className="pt-24 pb-12 sm:pt-32 sm:pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
        <Suspense fallback={null}>
          <ParticleField intensity="low" showGeometry={false} />
        </Suspense>
        <div className="container-custom text-center max-w-4xl mx-auto relative z-10" style={{ perspective: '1000px' }}>
          <div className="overflow-hidden mb-4 sm:mb-6">
            <p className="svc-hero-line text-label text-primary" style={{ transformStyle: 'preserve-3d' }}>
              <TextScramble text="What I Do" delay={0.3} />
            </p>
          </div>
          <div className="overflow-hidden">
            <h1 className="svc-hero-line text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-[-0.03em] font-display mb-2 sm:mb-3" style={{ transformStyle: 'preserve-3d' }}>
              Services that drive
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1 className="svc-hero-line text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-[-0.03em] font-display mb-6 sm:mb-8 gradient-text" style={{ transformStyle: 'preserve-3d' }}>
              results
            </h1>
          </div>
          <p className="svc-hero-desc text-sm sm:text-lg md:text-xl leading-relaxed font-light text-muted-foreground max-w-2xl mx-auto">
            From concept to launch, I provide end-to-end digital solutions.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section ref={cardsRef} className="py-12 sm:py-16 md:py-24 lg:py-32" style={{ background: 'linear-gradient(180deg, hsl(220 15% 5%), hsl(220 15% 7%))' }}>
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {services.map((service, i) => (
              <div key={i} className="service-card group p-5 sm:p-6 md:p-8 rounded-2xl border border-border hover:border-primary/40 transition-colors duration-500 relative overflow-hidden cursor-pointer" style={{ perspective: '1000px', transformStyle: 'preserve-3d', background: 'hsl(220 15% 8%)' }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'radial-gradient(circle at 30% 20%, hsl(187 100% 50% / 0.08), transparent 70%)' }} />
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: '0 0 30px hsl(187 100% 50% / 0.1)' }} />

                <div className="relative z-10">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500" style={{ background: 'hsl(187 100% 50% / 0.1)' }}>
                    <span className="text-2xl sm:text-3xl text-primary group-hover:drop-shadow-[0_0_12px_hsla(187,100%,50%,0.6)] transition-all duration-500">{service.icon}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl md:text-2xl font-display font-bold mb-2 sm:mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">{service.description}</p>

                  <ul className="space-y-1.5 sm:space-y-2">
                    {service.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2 text-xs sm:text-sm group-hover:translate-x-1 transition-transform duration-300" style={{ transitionDelay: `${j * 50}ms` }}>
                        <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" style={{ boxShadow: '0 0 6px hsl(187 100% 50% / 0.3)' }} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section ref={processRef} className="py-16 sm:py-24 md:py-32 lg:py-40 relative">
        <div className="container-custom">
          <div className="text-center mb-10 sm:mb-16">
            <p className="text-label text-primary mb-3 sm:mb-4">How I Work</p>
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold font-display">
              My <span className="gradient-text">Process</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">
            {process.map((item, i) => (
              <div key={i} className="process-step flex gap-4 sm:gap-6 md:gap-8 items-start p-5 sm:p-6 md:p-8 rounded-2xl border border-border hover:border-primary/30 transition-all duration-500 group relative overflow-hidden" style={{ perspective: '800px', background: 'hsl(220 15% 7%)' }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(90deg, hsl(187 100% 50% / 0.05), transparent 40%)' }} />
                <span className="process-number text-3xl sm:text-4xl md:text-5xl font-display font-bold gradient-text shrink-0">
                  {item.step}
                </span>
                <div className="relative z-10">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-display font-bold mb-1 sm:mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">{item.description}</p>
                </div>
                <div className="process-line absolute bottom-0 left-0 right-0 h-px origin-left" style={{ background: 'linear-gradient(90deg, hsl(187 100% 50% / 0.3), transparent)' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 md:py-32" style={{ background: 'linear-gradient(180deg, hsl(220 15% 5%), hsl(220 15% 7%))' }}>
        <div className="container-custom text-center svc-cta">
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold font-display mb-4 sm:mb-6">
            Ready to start your <span className="gradient-text">project?</span>
          </h2>
          <p className="text-sm sm:text-lg md:text-xl leading-relaxed font-light text-muted-foreground mb-6 sm:mb-8 max-w-xl mx-auto">
            Let's discuss how we can bring your vision to life.
          </p>
          <Link to="/contact">
            <MagneticButton className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground rounded-full text-base sm:text-lg font-medium glow-cyan hover:shadow-[0_0_60px_hsla(187,100%,50%,0.3)] transition-shadow duration-500">
              Start a Project
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </MagneticButton>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
