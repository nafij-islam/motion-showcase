import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import MagneticButton from '@/components/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

/**
 * Services page with 3D card effects and icon animations
 */
const Services = () => {
  const cardsRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text animation
      gsap.from('.services-hero-text', {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        delay: 0.3,
      });

      // Cards stagger animation with 3D tilt
      const cards = cardsRef.current?.querySelectorAll('.service-card');
      cards?.forEach((card, i) => {
        gsap.from(card, {
          y: 80,
          opacity: 0,
          rotateY: -15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
          delay: i * 0.1,
        });

        // 3D tilt effect on mouse move
        card.addEventListener('mousemove', ((e: MouseEvent) => {
          const rect = (card as HTMLElement).getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = (y - centerY) / 20;
          const rotateY = (centerX - x) / 20;

          gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            duration: 0.3,
            ease: 'power2.out',
          });
        }) as EventListener);

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: 'power2.out',
          });
        });
      });

      // Process steps animation
      const steps = processRef.current?.querySelectorAll('.process-step');
      steps?.forEach((step, i) => {
        gsap.from(step, {
          x: i % 2 === 0 ? -60 : 60,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 80%',
          },
        });
      });

      // Icon animations
      const icons = document.querySelectorAll('.service-icon');
      icons.forEach(icon => {
        gsap.to(icon, {
          rotation: 360,
          duration: 20,
          repeat: -1,
          ease: 'none',
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const services = [
    {
      icon: '◈',
      title: 'UI/UX Design',
      description: 'Creating intuitive and visually stunning interfaces that enhance user experience and drive engagement.',
      features: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design'],
    },
    {
      icon: '◇',
      title: 'Web Development',
      description: 'Building fast, responsive, and scalable web applications using cutting-edge technologies.',
      features: ['React/Next.js', 'Node.js', 'TypeScript', 'Performance Optimization'],
    },
    {
      icon: '○',
      title: 'Motion Design',
      description: 'Bringing interfaces to life with smooth animations and micro-interactions that delight users.',
      features: ['GSAP Animations', 'Lottie', 'CSS Animations', 'SVG Animation'],
    },
    {
      icon: '□',
      title: 'Brand Identity',
      description: 'Crafting memorable brand experiences through cohesive visual systems and guidelines.',
      features: ['Logo Design', 'Brand Strategy', 'Visual Identity', 'Brand Guidelines'],
    },
    {
      icon: '△',
      title: 'Mobile Apps',
      description: 'Designing and developing native-like mobile experiences for iOS and Android platforms.',
      features: ['React Native', 'Flutter', 'App Store Optimization', 'Push Notifications'],
    },
    {
      icon: '☆',
      title: 'Consulting',
      description: 'Providing expert guidance on digital strategy, technology choices, and design systems.',
      features: ['Tech Audits', 'Design Systems', 'Team Training', 'Strategy Planning'],
    },
  ];

  const process = [
    { step: '01', title: 'Discovery', description: 'Understanding your goals, audience, and challenges through research and collaboration.' },
    { step: '02', title: 'Strategy', description: 'Developing a comprehensive plan that aligns with your business objectives.' },
    { step: '03', title: 'Design', description: 'Creating stunning visuals and intuitive interfaces that captivate users.' },
    { step: '04', title: 'Development', description: 'Building robust, scalable solutions with clean and maintainable code.' },
    { step: '05', title: 'Launch', description: 'Deploying your project and ensuring everything runs smoothly.' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container-custom text-center max-w-4xl mx-auto">
          <p className="services-hero-text text-label text-primary mb-6">What I Do</p>
          <h1 className="services-hero-text text-display-lg mb-8">
            Services that drive
            <span className="gradient-text"> results</span>
          </h1>
          <p className="services-hero-text text-body-lg text-muted-foreground max-w-2xl mx-auto">
            From concept to launch, I provide end-to-end digital solutions that 
            help businesses stand out and succeed in the digital landscape.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section ref={cardsRef} className="section-padding bg-card">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div 
                key={i}
                className="service-card group p-8 bg-secondary rounded-2xl border border-border hover:border-primary/50 transition-colors duration-300"
                style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
              >
                {/* Icon */}
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <span className="service-icon text-3xl text-primary">{service.icon}</span>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section ref={processRef} className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <p className="text-label text-primary mb-4">How I Work</p>
            <h2 className="text-display-md">My Process</h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {process.map((item, i) => (
              <div 
                key={i}
                className="process-step flex gap-8 items-start p-8 bg-card rounded-2xl border border-border hover:border-primary/30 transition-colors duration-300"
              >
                <span className="text-5xl font-display font-bold gradient-text shrink-0">
                  {item.step}
                </span>
                <div>
                  <h3 className="text-2xl font-display font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-card">
        <div className="container-custom text-center">
          <h2 className="text-display-md mb-6">Ready to start your project?</h2>
          <p className="text-body-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Let's discuss how we can bring your vision to life.
          </p>
          <Link to="/contact">
            <MagneticButton className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-full text-lg font-medium hover:bg-gold-light transition-colors duration-300">
              Start a Project
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
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
