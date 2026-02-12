import { useEffect, useRef, lazy, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import TextScramble from '@/components/TextScramble';
import aboutPortrait from '@/assets/about-portrait.jpg';

const ParticleField = lazy(() => import('@/components/ParticleField'));

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text reveal
      const heroTl = gsap.timeline({ delay: 0.2 });
      heroTl
        .fromTo('.about-hero-line',
          { y: 120, rotateX: -80, opacity: 0, skewY: 4 },
          { y: 0, rotateX: 0, opacity: 1, skewY: 0, stagger: 0.1, duration: 1.3, ease: 'power4.out' }
        )
        .fromTo('.about-hero-desc',
          { y: 30, opacity: 0, filter: 'blur(8px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.15, duration: 0.8, ease: 'power3.out' },
          '-=0.6'
        );

      // Image clip-path reveal
      const imgTl = gsap.timeline({ delay: 0.4 });
      imgTl
        .fromTo(imageRef.current,
          { clipPath: 'polygon(50% 100%, 50% 100%, 50% 100%, 50% 100%)' },
          { clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)', duration: 1.5, ease: 'power4.inOut' }
        )
        .fromTo(imageRef.current?.querySelector('img') || {},
          { scale: 1.4 },
          { scale: 1, duration: 1.5, ease: 'power3.out' },
          '-=1.2'
        );

      // Image parallax
      gsap.to(imageRef.current?.querySelector('img') || {}, {
        yPercent: 15, ease: 'none',
        scrollTrigger: { trigger: imageRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
      });

      // Stats counters
      const counters = document.querySelectorAll('.about-counter');
      counters.forEach((counter, i) => {
        const parent = counter.closest('.about-stat');
        const target = parseInt(counter.getAttribute('data-target') || '0');
        const tl = gsap.timeline({ scrollTrigger: { trigger: parent, start: 'top 85%' } });
        tl.fromTo(parent!,
          { y: 60, opacity: 0, scale: 0.8, rotateZ: i % 2 === 0 ? -3 : 3 },
          { y: 0, opacity: 1, scale: 1, rotateZ: 0, duration: 1, ease: 'elastic.out(1, 0.5)', delay: i * 0.1 }
        ).fromTo(counter,
          { innerText: 0 },
          { innerText: target, duration: 2, ease: 'power2.out', snap: { innerText: 1 } },
          '-=0.6'
        );
      });

      // Philosophy cards 3D entrance
      const philosophyCards = philosophyRef.current?.querySelectorAll('.philosophy-card');
      philosophyCards?.forEach((card, i) => {
        gsap.fromTo(card,
          { y: 100, opacity: 0, rotateX: -40, rotateY: i === 0 ? -20 : i === 2 ? 20 : 0, scale: 0.8, filter: 'blur(10px)' },
          {
            y: 0, opacity: 1, rotateX: 0, rotateY: 0, scale: 1, filter: 'blur(0px)',
            duration: 1.2, ease: 'power4.out',
            scrollTrigger: { trigger: card, start: 'top 88%' }, delay: i * 0.15,
          }
        );
      });

      // Skills bars
      const skillBars = skillsRef.current?.querySelectorAll('.skill-progress');
      skillBars?.forEach((bar, i) => {
        const width = bar.getAttribute('data-width');
        const tl = gsap.timeline({ scrollTrigger: { trigger: bar, start: 'top 85%' } });
        tl.fromTo(bar.closest('.skill-item')!,
          { x: -40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: i * 0.1 }
        ).fromTo(bar,
          { width: '0%', opacity: 0 },
          { width: width, opacity: 1, duration: 1.5, ease: 'power3.out' },
          '-=0.3'
        );
      });

      // Timeline line draw
      const timelineLine = timelineRef.current?.querySelector('.timeline-line');
      if (timelineLine) {
        gsap.fromTo(timelineLine, { scaleY: 0 }, {
          scaleY: 1, transformOrigin: 'top', duration: 2, ease: 'power3.out',
          scrollTrigger: { trigger: timelineRef.current, start: 'top 70%' },
        });
      }

      // Timeline items alternate slide
      const timelineItems = timelineRef.current?.querySelectorAll('.timeline-item');
      timelineItems?.forEach((item, i) => {
        const direction = i % 2 === 0 ? -100 : 100;
        gsap.fromTo(item,
          { x: direction, opacity: 0, scale: 0.9, rotateY: direction > 0 ? 10 : -10 },
          {
            x: 0, opacity: 1, scale: 1, rotateY: 0,
            duration: 1, ease: 'power4.out',
            scrollTrigger: { trigger: item, start: 'top 82%' },
          }
        );
      });

      // Timeline dots pulse
      gsap.to('.timeline-dot', {
        boxShadow: '0 0 20px hsla(187, 100%, 50%, 0.5)',
        repeat: -1, yoyo: true, duration: 1.5, ease: 'sine.inOut', stagger: 0.3,
      });
    });

    return () => ctx.revert();
  }, []);

  const skills = [
    { name: 'UI/UX Design', level: 95 },
    { name: 'Frontend Development', level: 90 },
    { name: 'Motion Design', level: 85 },
    { name: 'Brand Identity', level: 80 },
    { name: 'Backend Development', level: 75 },
  ];

  const timeline = [
    { year: '2024', title: 'Lead Designer', company: 'Creative Studio', description: 'Leading design direction for major brand clients' },
    { year: '2022', title: 'Senior Developer', company: 'Tech Agency', description: 'Full-stack development for enterprise applications' },
    { year: '2020', title: 'UI/UX Designer', company: 'Digital Agency', description: 'Crafting user experiences for startups' },
    { year: '2018', title: 'Junior Developer', company: 'Startup Inc', description: 'Building responsive web applications' },
  ];

  const philosophy = [
    { icon: '◈', title: 'User-Centric', desc: 'Every design decision starts with understanding the end user' },
    { icon: '◇', title: 'Performance First', desc: 'Building fast, optimized experiences that respect users time' },
    { icon: '○', title: 'Attention to Detail', desc: 'The small things matter - every pixel, every interaction' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <Navigation />

      {/* Hero */}
      <section ref={heroRef} className="pt-24 pb-16 sm:pt-32 sm:pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
        <Suspense fallback={null}>
          <ParticleField intensity="low" showGeometry={false} />
        </Suspense>
        
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
            <div style={{ perspective: '1000px' }}>
              <div className="overflow-hidden mb-4 sm:mb-6">
                <p className="about-hero-line text-label text-primary" style={{ transformStyle: 'preserve-3d' }}>
                  <TextScramble text="About Me" delay={0.3} />
                </p>
              </div>
              <div className="overflow-hidden">
                <h1 className="about-hero-line text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-[-0.03em] font-display mb-2" style={{ transformStyle: 'preserve-3d' }}>
                  I create digital
                </h1>
              </div>
              <div className="overflow-hidden">
                <h1 className="about-hero-line text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-[-0.03em] font-display mb-6 sm:mb-8 gradient-text" style={{ transformStyle: 'preserve-3d' }}>
                  experiences
                </h1>
              </div>
              <p className="about-hero-desc text-sm sm:text-lg md:text-xl leading-relaxed font-light text-muted-foreground mb-4 sm:mb-6">
                With over 8 years of experience in digital design and development,
                I've helped brands create memorable experiences.
              </p>
              <p className="about-hero-desc text-sm sm:text-base text-muted-foreground">
                I believe in the power of thoughtful design combined with cutting-edge technology.
              </p>
            </div>

            <div ref={imageRef} className="relative aspect-square lg:aspect-[3/4] rounded-2xl overflow-hidden">
              <img src={aboutPortrait} alt="Portrait" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700" style={{ background: 'linear-gradient(135deg, hsl(187 100% 50% / 0.1), transparent)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 sm:py-24 md:py-32 relative" style={{ background: 'linear-gradient(180deg, hsl(220 15% 5%), hsl(220 15% 7%))' }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, hsl(187 100% 50% / 0.3), transparent)' }} />
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { number: 8, label: 'Years Experience', suffix: '+' },
              { number: 150, label: 'Projects Completed', suffix: '+' },
              { number: 50, label: 'Happy Clients', suffix: '+' },
              { number: 12, label: 'Awards Won', suffix: '' },
            ].map((stat, i) => (
              <div key={i} className="about-stat text-center group cursor-default">
                <div className="text-3xl sm:text-4xl md:text-6xl font-display font-bold gradient-text mb-2 group-hover:drop-shadow-[0_0_20px_hsla(187,100%,50%,0.4)] transition-all duration-500">
                  <span className="about-counter" data-target={stat.number}>0</span>
                  {stat.suffix}
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground group-hover:text-primary/70 transition-colors">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section ref={philosophyRef} className="py-16 sm:py-24 md:py-32 lg:py-40 relative">
        <div className="container-custom">
          <div className="text-center mb-10 sm:mb-16">
            <p className="text-label text-primary mb-3 sm:mb-4">My Approach</p>
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold font-display">
              Design <span className="gradient-text">Philosophy</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {philosophy.map((item, i) => (
              <div key={i} className="philosophy-card p-6 sm:p-8 rounded-2xl border border-border hover:border-primary/40 transition-all duration-500 group cursor-pointer relative overflow-hidden" style={{ transformStyle: 'preserve-3d', background: 'hsl(220 15% 7%)' }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'radial-gradient(circle at 50% 0%, hsl(187 100% 50% / 0.08), transparent 70%)' }} />
                <div className="relative z-10">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-500" style={{ background: 'hsl(187 100% 50% / 0.1)' }}>
                    <span className="text-2xl sm:text-3xl text-primary group-hover:drop-shadow-[0_0_10px_hsla(187,100%,50%,0.5)] transition-all">{item.icon}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-display font-bold mb-2 sm:mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section ref={skillsRef} className="py-16 sm:py-24 md:py-32" style={{ background: 'linear-gradient(180deg, hsl(220 15% 5%), hsl(220 15% 7%))' }}>
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10 sm:mb-16">
              <p className="text-label text-primary mb-3 sm:mb-4">My Expertise</p>
              <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold font-display">
                Skills & <span className="gradient-text">Abilities</span>
              </h2>
            </div>

            <div className="space-y-6 sm:space-y-10">
              {skills.map((skill, i) => (
                <div key={i} className="skill-item">
                  <div className="flex justify-between mb-3 sm:mb-4">
                    <span className="font-medium text-sm sm:text-lg">{skill.name}</span>
                    <span className="text-primary font-bold text-sm sm:text-base">{skill.level}%</span>
                  </div>
                  <div className="h-2 sm:h-3 bg-secondary rounded-full overflow-hidden relative">
                    <div className="skill-progress h-full rounded-full relative" data-width={`${skill.level}%`} style={{ background: 'linear-gradient(90deg, hsl(187 100% 35%), hsl(187 100% 50%), hsl(187 100% 65%))' }}>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-primary rounded-full" style={{ boxShadow: '0 0 15px hsla(187, 100%, 50%, 0.5)' }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section ref={timelineRef} className="py-16 sm:py-24 md:py-32 lg:py-40 relative">
        <div className="container-custom">
          <div className="text-center mb-10 sm:mb-16">
            <p className="text-label text-primary mb-3 sm:mb-4">My Journey</p>
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold font-display">
              <span className="gradient-text">Experience</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto relative">
            <div className="timeline-line absolute left-4 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2" style={{ background: 'linear-gradient(180deg, hsl(187 100% 50% / 0.3), hsl(187 100% 50% / 0.1))' }} />

            {timeline.map((item, i) => (
              <div key={i} className={`timeline-item relative flex gap-4 sm:gap-8 mb-10 sm:mb-16 last:mb-0 ${i % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'} flex-row`} style={{ perspective: '800px' }}>
                {/* Mobile: always on right side. Desktop: alternating */}
                <div className="hidden md:block flex-1">
                  {((i % 2 === 0)) && (
                    <div className="p-6 sm:p-8 rounded-2xl border border-border hover:border-primary/30 transition-all duration-500 group relative overflow-hidden text-right" style={{ background: 'hsl(220 15% 7%)' }}>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'radial-gradient(circle at 100% 0%, hsl(187 100% 50% / 0.05), transparent 60%)' }} />
                      <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-primary font-display font-bold text-base sm:text-lg mb-3 sm:mb-4" style={{ background: 'hsl(187 100% 50% / 0.1)' }}>{item.year}</span>
                      <h3 className="text-xl sm:text-2xl font-display font-bold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="text-primary/70 mb-2 sm:mb-3 text-sm sm:text-base">{item.company}</p>
                      <p className="text-sm sm:text-base text-muted-foreground">{item.description}</p>
                    </div>
                  )}
                </div>

                {/* Dot */}
                <div className="flex items-start justify-center pt-4 sm:pt-6 shrink-0">
                  <div className="timeline-dot w-3 h-3 sm:w-5 sm:h-5 bg-primary rounded-full ring-2 sm:ring-4 ring-background" style={{ boxShadow: '0 0 10px hsla(187, 100%, 50%, 0.3)' }} />
                </div>

                {/* Content - always visible on mobile, alternating on desktop */}
                <div className="flex-1 md:flex-1">
                  {/* Mobile: always show */}
                  <div className="md:hidden p-5 sm:p-6 rounded-2xl border border-border hover:border-primary/30 transition-all duration-500 group relative overflow-hidden" style={{ background: 'hsl(220 15% 7%)' }}>
                    <span className="inline-block px-3 py-1.5 rounded-full text-primary font-display font-bold text-sm mb-3" style={{ background: 'hsl(187 100% 50% / 0.1)' }}>{item.year}</span>
                    <h3 className="text-lg font-display font-bold mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-primary/70 mb-2 text-sm">{item.company}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  {/* Desktop: odd items */}
                  {i % 2 !== 0 && (
                    <div className="hidden md:block p-6 sm:p-8 rounded-2xl border border-border hover:border-primary/30 transition-all duration-500 group relative overflow-hidden" style={{ background: 'hsl(220 15% 7%)' }}>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'radial-gradient(circle at 0% 0%, hsl(187 100% 50% / 0.05), transparent 60%)' }} />
                      <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-primary font-display font-bold text-base sm:text-lg mb-3 sm:mb-4" style={{ background: 'hsl(187 100% 50% / 0.1)' }}>{item.year}</span>
                      <h3 className="text-xl sm:text-2xl font-display font-bold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="text-primary/70 mb-2 sm:mb-3 text-sm sm:text-base">{item.company}</p>
                      <p className="text-sm sm:text-base text-muted-foreground">{item.description}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
