import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import project1 from '@/assets/project-1.jpg';
import project2 from '@/assets/project-2.jpg';
import project3 from '@/assets/project-3.jpg';
import project4 from '@/assets/project-4.jpg';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { title: 'Digital Platform', category: 'Web Design', image: project1, tech: ['React', 'GSAP', 'Three.js'] },
  { title: 'Luxury Brand App', category: 'Mobile', image: project2, tech: ['React Native', 'Motion', 'Firebase'] },
  { title: 'E-commerce', category: 'Web Design', image: project3, tech: ['Next.js', 'Stripe', 'Prisma'] },
  { title: 'Brand Identity', category: 'Branding', image: project4, tech: ['Figma', 'After Effects', 'Illustrator'] },
];

/**
 * Featured Projects section with advanced GSAP animations
 * - Staggered card reveals with 3D transforms
 * - Glitch text effect on hover
 * - Animated cursor-following glow
 * - Clip-path image reveals
 * - Particle burst on hover
 * - Cyan (#00EAFF) accent color
 * 
 * FIXED: Hover animation conflicts and card tilt reset issues
 */
const FeaturedProjects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const hoverTimeline = useRef<gsap.core.Timeline | null>(null);

  // Glow follow cursor
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: e.clientX - rect.left - 200,
          y: e.clientY - rect.top - 200,
          duration: 0.8,
          ease: 'power3.out',
        });
      }
    };

    section.addEventListener('mousemove', handleMouseMove);
    return () => section.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Main scroll animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title line reveal
      const titleLines = titleRef.current?.querySelectorAll('.title-line');
      titleLines?.forEach((line, i) => {
        gsap.fromTo(line,
          {
            y: 120,
            rotateX: -90,
            opacity: 0,
            skewY: 7,
          },
          {
            y: 0,
            rotateX: 0,
            opacity: 1,
            skewY: 0,
            duration: 1.4,
            ease: 'power4.out',
            delay: i * 0.15,
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 80%',
            },
          }
        );
      });

      // Subtitle and label animation
      gsap.fromTo('.fp-label',
        { width: 0, opacity: 0 },
        {
          width: '60px',
          opacity: 1,
          duration: 1,
          ease: 'power4.inOut',
          scrollTrigger: { trigger: titleRef.current, start: 'top 80%' },
        }
      );

      gsap.fromTo('.fp-subtitle',
        { y: 30, opacity: 0, filter: 'blur(10px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power3.out',
          delay: 0.4,
          scrollTrigger: { trigger: titleRef.current, start: 'top 80%' },
        }
      );

      // Cards stagger animation with 3D
      const cards = cardsRef.current?.querySelectorAll('.fp-card');
      cards?.forEach((card, i) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
        });

        // Card container entrance
        tl.fromTo(card,
          {
            y: 150,
            opacity: 0,
            rotateX: -25,
            rotateY: i % 2 === 0 ? -15 : 15,
            scale: 0.8,
            filter: 'blur(20px)',
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.2,
            ease: 'power4.out',
            delay: i * 0.15,
          }
        );

        // Image clip-path reveal
        tl.fromTo(card.querySelector('.fp-image-wrap'),
          { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' },
          {
            clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
            duration: 1,
            ease: 'power4.inOut',
          },
          '-=0.8'
        );

        // Number reveal
        tl.fromTo(card.querySelector('.fp-number'),
          { scale: 0, rotateZ: -180, opacity: 0 },
          {
            scale: 1,
            rotateZ: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'back.out(1.7)',
          },
          '-=0.6'
        );

        // Title chars animation
        const chars = card.querySelectorAll('.fp-title-char');
        tl.fromTo(chars,
          { y: 50, opacity: 0, rotateX: -90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            stagger: 0.03,
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.5'
        );

        // Category line wipe
        tl.fromTo(card.querySelector('.fp-category'),
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
          '-=0.3'
        );

        // Tech tags cascade
        const tags = card.querySelectorAll('.fp-tag');
        tl.fromTo(tags,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            stagger: 0.08,
            duration: 0.4,
            ease: 'back.out(2)',
          },
          '-=0.3'
        );
      });

      // Floating decorative lines
      gsap.to('.fp-deco-line', {
        scaleX: 1,
        stagger: 0.2,
        duration: 1.5,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
      });

      // Background grid pulse
      gsap.to('.fp-grid-dot', {
        opacity: 0.3,
        stagger: { amount: 2, from: 'random' },
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: 'sine.inOut',
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Card hover animations - FIXED VERSION
  const handleCardEnter = (index: number, e: React.MouseEvent) => {
    setActiveCard(index);
    const card = e.currentTarget;

    // Kill any existing timeline to prevent conflicts
    if (hoverTimeline.current) {
      hoverTimeline.current.kill();
    }

    // Create a new timeline for hover in
    hoverTimeline.current = gsap.timeline();

    hoverTimeline.current
      .to(card, {
        scale: 1.02,
        duration: 0.4,
        ease: 'power3.out',
      }, 0)
      .to(card.querySelector('.fp-image'), {
        scale: 1.15,
        duration: 0.8,
        ease: 'power3.out',
      }, 0)
      .to(card.querySelector('.fp-overlay'), {
        opacity: 1,
        duration: 0.4,
      }, 0)
      .to(card.querySelector('.fp-view-btn'), {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(1.7)',
      }, 0.1)
      .to(card.querySelector('.fp-border-glow'), {
        opacity: 1,
        duration: 0.4,
      }, 0);

    // Glitch effect on number
    const num = card.querySelector('.fp-number');
    gsap.to(num, {
      textShadow: '2px 0 hsl(187 100% 50%), -2px 0 hsl(0 100% 50%)',
      duration: 0.1,
      repeat: 3,
      yoyo: true,
      onComplete: () => {
        gsap.set(num, { textShadow: 'none' });
      },
    });
  };

  const handleCardLeave = (e: React.MouseEvent) => {
    setActiveCard(null);
    const card = e.currentTarget;

    // Kill any existing timeline
    if (hoverTimeline.current) {
      hoverTimeline.current.kill();
    }

    // Create a new timeline for hover out - FIXED: Added rotateX and rotateY reset
    hoverTimeline.current = gsap.timeline();

    hoverTimeline.current
      .to(card, {
        scale: 1,
        rotateX: 0,  // FIXED: Reset 3D rotation
        rotateY: 0,  // FIXED: Reset 3D rotation
        duration: 0.5,
        ease: 'power3.out',
      }, 0)
      .to(card.querySelector('.fp-image'), {
        scale: 1,
        duration: 0.6,
        ease: 'power3.out',
      }, 0)
      .to(card.querySelector('.fp-overlay'), {
        opacity: 0,
        duration: 0.3,
      }, 0)
      .to(card.querySelector('.fp-view-btn'), {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power3.in',
      }, 0)
      .to(card.querySelector('.fp-border-glow'), {
        opacity: 0,
        duration: 0.3,
      }, 0);
  };

  // 3D tilt on mouse move - FIXED: Only apply when card is active
  const handleCardMove = (index: number, e: React.MouseEvent) => {
    if (activeCard !== index) return; // FIXED: Only tilt when hovering
    
    const card = e.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotateY: x * 12,
      rotateX: -y * 12,
      duration: 0.3,
      ease: 'power3.out',
      overwrite: 'auto', // FIXED: Allow overwriting
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
      style={{ background: 'linear-gradient(180deg, hsl(0 0% 2%) 0%, hsl(0 0% 5%) 50%, hsl(0 0% 2%) 100%)' }}
    >
      {/* Animated background grid dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)] gap-0">
          {[...Array(80)].map((_, i) => (
            <div
              key={i}
              className="fp-grid-dot w-px h-px rounded-full opacity-0"
              style={{
                background: 'hsl(187 100% 50%)',
                gridColumn: Math.floor(Math.random() * 20) + 1,
                gridRow: Math.floor(Math.random() * 20) + 1,
                boxShadow: '0 0 6px 2px hsla(187, 100%, 50%, 0.3)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Cursor follow glow */}
      <div
        ref={glowRef}
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none opacity-20 blur-[100px] transition-opacity duration-500"
        style={{ background: 'hsl(187 100% 50%)' }}
      />

      {/* Decorative lines */}
      <div className="absolute top-20 left-0 right-0 pointer-events-none">
        <div className="fp-deco-line h-px w-full origin-left scale-x-0" style={{ background: 'linear-gradient(90deg, transparent, hsl(187 100% 50% / 0.3), transparent)' }} />
      </div>
      <div className="absolute bottom-20 left-0 right-0 pointer-events-none">
        <div className="fp-deco-line h-px w-full origin-right scale-x-0" style={{ background: 'linear-gradient(90deg, transparent, hsl(187 100% 50% / 0.3), transparent)' }} />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <div ref={titleRef} className="mb-20" style={{ perspective: '1000px' }}>
          <div className="flex items-center gap-4 mb-6">
            <div className="fp-label h-px bg-cyan overflow-hidden" style={{ width: 0 }} />
            <p className="fp-subtitle text-label" style={{ color: 'hsl(187 100% 50%)' }}>
              Selected Works
            </p>
          </div>

          <div className="overflow-hidden" style={{ perspective: '800px' }}>
            <h2 className="title-line text-display-md" style={{ transformStyle: 'preserve-3d' }}>
              Featured
            </h2>
          </div>
          <div className="overflow-hidden" style={{ perspective: '800px' }}>
            <h2
              className="title-line text-display-md"
              style={{
                transformStyle: 'preserve-3d',
                background: 'linear-gradient(135deg, hsl(187 100% 50%), hsl(187 100% 70%))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Projects
            </h2>
          </div>

          <p className="fp-subtitle text-body-lg text-muted-foreground max-w-xl mt-6">
            Explore my latest work — crafted with precision, powered by creativity.
          </p>
        </div>

        {/* Projects Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, i) => (
            <Link
              key={i}
              to="/projects"
              className={`fp-card group relative rounded-3xl overflow-hidden cursor-pointer ${
                i % 2 === 1 ? 'md:mt-16' : ''
              }`}
              style={{
                perspective: '1200px',
                transformStyle: 'preserve-3d',
                background: 'hsl(0 0% 6%)',
              }}
              onMouseEnter={(e) => handleCardEnter(i, e)}
              onMouseLeave={handleCardLeave}
              onMouseMove={(e) => handleCardMove(i, e)}
            >
              {/* Cyan border glow */}
              <div
                className="fp-border-glow absolute inset-0 rounded-3xl opacity-0 pointer-events-none z-20"
                style={{
                  boxShadow: 'inset 0 0 0 1px hsl(187 100% 50% / 0.5), 0 0 30px hsl(187 100% 50% / 0.15)',
                }}
              />

              {/* Image */}
              <div className="fp-image-wrap aspect-[4/3] overflow-hidden" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' }}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="fp-image w-full h-full object-cover"
                />
              </div>

              {/* Cyan overlay on hover */}
              <div
                className="fp-overlay absolute inset-0 opacity-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, hsl(187 100% 50% / 0.15), transparent 60%)',
                }}
              />

              {/* Gradient overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, hsl(0 0% 3%) 0%, hsl(0 0% 3% / 0.8) 30%, transparent 60%)',
                }}
              />

              {/* Number */}
              <div className="absolute top-6 left-6 z-10">
                <span
                  className="fp-number text-6xl font-display font-bold"
                  style={{
                    color: 'hsl(187 100% 50% / 0.15)',
                    transition: 'color 0.3s',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              {/* View button */}
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <div
                  className="fp-view-btn w-24 h-24 rounded-full flex items-center justify-center scale-0 opacity-0"
                  style={{
                    background: 'hsl(187 100% 50%)',
                    boxShadow: '0 0 40px hsl(187 100% 50% / 0.4)',
                  }}
                >
                  <span className="font-bold text-sm" style={{ color: 'hsl(0 0% 4%)' }}>VIEW</span>
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                <div className="fp-category flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full" style={{ background: 'hsl(187 100% 50%)' }} />
                  <span className="text-sm font-medium" style={{ color: 'hsl(187 100% 50%)' }}>
                    {project.category}
                  </span>
                </div>

                <h3
                  className="text-2xl md:text-3xl font-display font-bold mb-4"
                  style={{ perspective: '600px' }}
                >
                  {project.title.split('').map((char, ci) => (
                    <span
                      key={ci}
                      className="fp-title-char inline-block"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </h3>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, ti) => (
                    <span
                      key={ti}
                      className="fp-tag px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        background: 'hsl(187 100% 50% / 0.1)',
                        color: 'hsl(187 100% 60%)',
                        border: '1px solid hsl(187 100% 50% / 0.2)',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All link */}
        <div className="mt-16 text-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-3 group text-lg font-medium transition-all duration-300"
            style={{ color: 'hsl(187 100% 50%)' }}
          >
            <span className="relative">
              View All Projects
              <span
                className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-500"
                style={{ background: 'hsl(187 100% 50%)' }}
              />
            </span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="group-hover:translate-x-2 transition-transform duration-300"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;