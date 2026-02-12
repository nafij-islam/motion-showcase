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

const FeaturedProjects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const hoverTimeline = useRef<gsap.core.Timeline | null>(null);

  // Glow follow cursor
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
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

  // Scroll animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleLines = titleRef.current?.querySelectorAll('.title-line');
      titleLines?.forEach((line, i) => {
        gsap.fromTo(line,
          { y: 120, rotateX: -90, opacity: 0, skewY: 7 },
          { y: 0, rotateX: 0, opacity: 1, skewY: 0, duration: 1.4, ease: 'power4.out', delay: i * 0.15,
            scrollTrigger: { trigger: titleRef.current, start: 'top 80%' } }
        );
      });

      gsap.fromTo('.fp-label', { width: 0, opacity: 0 }, {
        width: '60px', opacity: 1, duration: 1, ease: 'power4.inOut',
        scrollTrigger: { trigger: titleRef.current, start: 'top 80%' },
      });

      gsap.fromTo('.fp-subtitle',
        { y: 30, opacity: 0, filter: 'blur(10px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1, ease: 'power3.out', delay: 0.4,
          scrollTrigger: { trigger: titleRef.current, start: 'top 80%' } }
      );

      const cards = cardsRef.current?.querySelectorAll('.fp-card');
      cards?.forEach((card, i) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: card, start: 'top 85%' } });
        tl.fromTo(card,
          { y: 150, opacity: 0, rotateX: -25, rotateY: i % 2 === 0 ? -15 : 15, scale: 0.8, filter: 'blur(20px)' },
          { y: 0, opacity: 1, rotateX: 0, rotateY: 0, scale: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power4.out', delay: i * 0.15 }
        );
        tl.fromTo(card.querySelector('.fp-image-wrap'),
          { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' },
          { clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)', duration: 1, ease: 'power4.inOut' },
          '-=0.8'
        );
        tl.fromTo(card.querySelector('.fp-number'),
          { scale: 0, rotateZ: -180, opacity: 0 },
          { scale: 1, rotateZ: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' },
          '-=0.6'
        );
        const chars = card.querySelectorAll('.fp-title-char');
        tl.fromTo(chars,
          { y: 50, opacity: 0, rotateX: -90 },
          { y: 0, opacity: 1, rotateX: 0, stagger: 0.03, duration: 0.6, ease: 'power3.out' },
          '-=0.5'
        );
        tl.fromTo(card.querySelector('.fp-category'),
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
          '-=0.3'
        );
        const tags = card.querySelectorAll('.fp-tag');
        tl.fromTo(tags,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, stagger: 0.08, duration: 0.4, ease: 'back.out(2)' },
          '-=0.3'
        );
      });

      gsap.to('.fp-deco-line', {
        scaleX: 1, stagger: 0.2, duration: 1.5, ease: 'power4.inOut',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' },
      });

      gsap.to('.fp-grid-dot', {
        opacity: 0.3, stagger: { amount: 2, from: 'random' },
        repeat: -1, yoyo: true, duration: 2, ease: 'sine.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardEnter = (index: number, e: React.MouseEvent) => {
    setActiveCard(index);
    const card = e.currentTarget;
    if (hoverTimeline.current) hoverTimeline.current.kill();
    hoverTimeline.current = gsap.timeline();
    hoverTimeline.current
      .to(card, { scale: 1.02, duration: 0.4, ease: 'power3.out' }, 0)
      .to(card.querySelector('.fp-image'), { scale: 1.15, duration: 0.8, ease: 'power3.out' }, 0)
      .to(card.querySelector('.fp-overlay'), { opacity: 1, duration: 0.4 }, 0)
      .to(card.querySelector('.fp-view-btn'), { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }, 0.1)
      .to(card.querySelector('.fp-border-glow'), { opacity: 1, duration: 0.4 }, 0);

    const num = card.querySelector('.fp-number');
    gsap.to(num, {
      textShadow: '2px 0 hsl(187 100% 50%), -2px 0 hsl(0 100% 50%)',
      duration: 0.1, repeat: 3, yoyo: true,
      onComplete: () => gsap.set(num, { textShadow: 'none' }),
    });
  };

  const handleCardLeave = (e: React.MouseEvent) => {
    setActiveCard(null);
    const card = e.currentTarget;
    if (hoverTimeline.current) hoverTimeline.current.kill();
    hoverTimeline.current = gsap.timeline();
    hoverTimeline.current
      .to(card, { scale: 1, rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power3.out' }, 0)
      .to(card.querySelector('.fp-image'), { scale: 1, duration: 0.6, ease: 'power3.out' }, 0)
      .to(card.querySelector('.fp-overlay'), { opacity: 0, duration: 0.3 }, 0)
      .to(card.querySelector('.fp-view-btn'), { scale: 0, opacity: 0, duration: 0.3, ease: 'power3.in' }, 0)
      .to(card.querySelector('.fp-border-glow'), { opacity: 0, duration: 0.3 }, 0);
  };

  const handleCardMove = (index: number, e: React.MouseEvent) => {
    if (activeCard !== index) return;
    const card = e.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, { rotateY: x * 12, rotateX: -y * 12, duration: 0.3, ease: 'power3.out', overwrite: 'auto' });
  };

  return (
    <section ref={sectionRef} className="relative py-16 sm:py-24 md:py-32 lg:py-40 overflow-hidden" style={{ background: 'linear-gradient(180deg, hsl(0 0% 2%) 0%, hsl(0 0% 5%) 50%, hsl(0 0% 2%) 100%)' }}>
      {/* Background grid dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)] gap-0">
          {[...Array(80)].map((_, i) => (
            <div key={i} className="fp-grid-dot w-px h-px rounded-full opacity-0"
              style={{ background: 'hsl(187 100% 50%)', gridColumn: Math.floor(Math.random() * 20) + 1, gridRow: Math.floor(Math.random() * 20) + 1, boxShadow: '0 0 6px 2px hsla(187, 100%, 50%, 0.3)' }} />
          ))}
        </div>
      </div>

      {/* Cursor glow */}
      <div ref={glowRef} className="absolute w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] rounded-full pointer-events-none opacity-20 blur-[100px] transition-opacity duration-500 hidden sm:block" style={{ background: 'hsl(187 100% 50%)' }} />

      {/* Deco lines */}
      <div className="absolute top-20 left-0 right-0 pointer-events-none">
        <div className="fp-deco-line h-px w-full origin-left scale-x-0" style={{ background: 'linear-gradient(90deg, transparent, hsl(187 100% 50% / 0.3), transparent)' }} />
      </div>
      <div className="absolute bottom-20 left-0 right-0 pointer-events-none">
        <div className="fp-deco-line h-px w-full origin-right scale-x-0" style={{ background: 'linear-gradient(90deg, transparent, hsl(187 100% 50% / 0.3), transparent)' }} />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <div ref={titleRef} className="mb-12 sm:mb-16 md:mb-20" style={{ perspective: '1000px' }}>
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="fp-label h-px bg-cyan overflow-hidden" style={{ width: 0 }} />
            <p className="fp-subtitle text-label" style={{ color: 'hsl(187 100% 50%)' }}>Selected Works</p>
          </div>

          <div className="overflow-hidden" style={{ perspective: '800px' }}>
            <h2 className="title-line text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold font-display" style={{ transformStyle: 'preserve-3d' }}>Featured</h2>
          </div>
          <div className="overflow-hidden" style={{ perspective: '800px' }}>
            <h2 className="title-line text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold font-display"
              style={{ transformStyle: 'preserve-3d', background: 'linear-gradient(135deg, hsl(187 100% 50%), hsl(187 100% 70%))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Projects
            </h2>
          </div>

          <p className="fp-subtitle text-sm sm:text-lg md:text-xl leading-relaxed font-light text-muted-foreground max-w-xl mt-4 sm:mt-6">
            Explore my latest work — crafted with precision, powered by creativity.
          </p>
        </div>

        {/* Grid */}
        <div ref={cardsRef} className="grid sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-12">
          {projects.map((project, i) => (
            <Link key={i} to="/projects"
              className={`fp-card group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer ${i % 2 === 1 ? 'sm:mt-8 md:mt-16' : ''}`}
              style={{ perspective: '1200px', transformStyle: 'preserve-3d', background: 'hsl(0 0% 6%)' }}
              onMouseEnter={(e) => handleCardEnter(i, e)}
              onMouseLeave={handleCardLeave}
              onMouseMove={(e) => handleCardMove(i, e)}
            >
              <div className="fp-border-glow absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 pointer-events-none z-20" style={{ boxShadow: 'inset 0 0 0 1px hsl(187 100% 50% / 0.5), 0 0 30px hsl(187 100% 50% / 0.15)' }} />

              <div className="fp-image-wrap aspect-[4/3] overflow-hidden" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' }}>
                <img src={project.image} alt={project.title} className="fp-image w-full h-full object-cover" />
              </div>

              <div className="fp-overlay absolute inset-0 opacity-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, hsl(187 100% 50% / 0.15), transparent 60%)' }} />
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, hsl(0 0% 3%) 0%, hsl(0 0% 3% / 0.8) 30%, transparent 60%)' }} />

              {/* Number */}
              <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-10">
                <span className="fp-number text-4xl sm:text-5xl md:text-6xl font-display font-bold" style={{ color: 'hsl(187 100% 50% / 0.15)', transition: 'color 0.3s' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              {/* View button */}
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <div className="fp-view-btn w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center scale-0 opacity-0" style={{ background: 'hsl(187 100% 50%)', boxShadow: '0 0 40px hsl(187 100% 50% / 0.4)' }}>
                  <span className="font-bold text-xs sm:text-sm" style={{ color: 'hsl(0 0% 4%)' }}>VIEW</span>
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 z-10">
                <div className="fp-category flex items-center gap-2 mb-2 sm:mb-3">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full" style={{ background: 'hsl(187 100% 50%)' }} />
                  <span className="text-xs sm:text-sm font-medium" style={{ color: 'hsl(187 100% 50%)' }}>{project.category}</span>
                </div>

                <h3 className="text-lg sm:text-2xl md:text-3xl font-display font-bold mb-2 sm:mb-4" style={{ perspective: '600px' }}>
                  {project.title.split('').map((char, ci) => (
                    <span key={ci} className="fp-title-char inline-block" style={{ transformStyle: 'preserve-3d' }}>
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </h3>

                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.tech.map((t, ti) => (
                    <span key={ti} className="fp-tag px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium" style={{ background: 'hsl(187 100% 50% / 0.1)', color: 'hsl(187 100% 60%)', border: '1px solid hsl(187 100% 50% / 0.2)' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All */}
        <div className="mt-10 sm:mt-16 text-center">
          <Link to="/projects" className="inline-flex items-center gap-2 sm:gap-3 group text-base sm:text-lg font-medium transition-all duration-300" style={{ color: 'hsl(187 100% 50%)' }}>
            <span className="relative">
              View All Projects
              <span className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-500" style={{ background: 'hsl(187 100% 50%)' }} />
            </span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-2 transition-transform duration-300">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
