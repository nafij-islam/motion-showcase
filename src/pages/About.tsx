import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import RevealText from '@/components/RevealText';
import TextScramble from '@/components/TextScramble';
import ParallaxImage from '@/components/ParallaxImage';
import aboutPortrait from '@/assets/about-portrait.jpg';

gsap.registerPlugin(ScrollTrigger);

/**
 * About page with premium animations
 */
const About = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text stagger
      gsap.from('.about-hero-element', {
        y: 80,
        opacity: 0,
        stagger: 0.12,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.3,
      });

      // Image reveal with clip-path
      gsap.fromTo(imageRef.current,
        { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' },
        {
          clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
          duration: 1.5,
          ease: 'power4.inOut',
          delay: 0.5,
        }
      );

      // Image inner scale
      const imageInner = imageRef.current?.querySelector('img');
      if (imageInner) {
        gsap.from(imageInner, {
          scale: 1.3,
          duration: 1.5,
          ease: 'power4.out',
          delay: 0.5,
        });
      }

      // Skill bars with stagger
      const skillBars = skillsRef.current?.querySelectorAll('.skill-progress');
      skillBars?.forEach((bar, i) => {
        const width = bar.getAttribute('data-width');
        gsap.fromTo(bar,
          { width: '0%', opacity: 0 },
          {
            width: width,
            opacity: 1,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 85%',
            },
            delay: i * 0.15,
          }
        );
      });

      // Skill labels fade in
      gsap.from('.skill-label', {
        x: -30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: skillsRef.current,
          start: 'top 80%',
        },
      });

      // Timeline items with alternating directions
      const timelineItems = timelineRef.current?.querySelectorAll('.timeline-item');
      timelineItems?.forEach((item, i) => {
        const direction = i % 2 === 0 ? -80 : 80;
        gsap.from(item, {
          x: direction,
          opacity: 0,
          scale: 0.9,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
          },
        });
      });

      // Timeline line draw animation
      const timelineLine = timelineRef.current?.querySelector('.timeline-line');
      if (timelineLine) {
        gsap.fromTo(timelineLine,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: 'top',
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 70%',
            },
          }
        );
      }

      // Counter animation
      const counters = document.querySelectorAll('.about-counter');
      counters.forEach((counter, i) => {
        const target = parseInt(counter.getAttribute('data-target') || '0');
        gsap.fromTo(counter,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2.5,
            ease: 'power2.out',
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: counter,
              start: 'top 80%',
            },
            delay: i * 0.2,
          }
        );
      });

      // Philosophy cards
      const philosophyCards = philosophyRef.current?.querySelectorAll('.philosophy-card');
      philosophyCards?.forEach((card, i) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          rotateY: -15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
          delay: i * 0.15,
        });
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

      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text content */}
            <div>
              <p className="about-hero-element text-label text-primary mb-6">
                <TextScramble text="About Me" delay={0.3} />
              </p>
              <h1 className="about-hero-element text-display-lg mb-8">
                I create digital
                <span className="gradient-text"> experiences</span>
                <br />that matter
              </h1>
              <p className="about-hero-element text-body-lg text-muted-foreground mb-6">
                With over 8 years of experience in digital design and development,
                I've helped brands create memorable experiences that connect with
                their audiences and drive results.
              </p>
              <p className="about-hero-element text-body text-muted-foreground">
                I believe in the power of thoughtful design combined with cutting-edge
                technology. Every project is an opportunity to push creative boundaries
                while solving real problems.
              </p>
            </div>

            {/* Image with reveal */}
            <div
              ref={imageRef}
              className="relative aspect-square lg:aspect-[3/4] rounded-2xl overflow-hidden"
            >
              <img
                src={aboutPortrait}
                alt="Portrait"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: 8, label: 'Years of Experience', suffix: '+' },
              { number: 150, label: 'Projects Completed', suffix: '+' },
              { number: 50, label: 'Happy Clients', suffix: '+' },
              { number: 12, label: 'Awards Won', suffix: '' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-6xl font-display font-bold gradient-text mb-2">
                  <span className="about-counter" data-target={stat.number}>0</span>
                  {stat.suffix}
                </div>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section ref={philosophyRef} className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <RevealText className="text-label text-primary mb-4" type="words">
              My Approach
            </RevealText>
            <h2 className="text-display-md">
              <RevealText type="words" delay={0.2}>
                Design Philosophy
              </RevealText>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {philosophy.map((item, i) => (
              <div
                key={i}
                className="philosophy-card p-8 bg-card rounded-2xl border border-border hover:border-primary/50 transition-all duration-500"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <span className="text-3xl text-primary">{item.icon}</span>
                </div>
                <h3 className="text-xl font-display font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} className="section-padding bg-card">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <RevealText className="text-label text-primary mb-4" type="words">
                My Expertise
              </RevealText>
              <h2 className="text-display-md">
                <RevealText type="words" delay={0.2}>
                  Skills & Abilities
                </RevealText>
              </h2>
            </div>

            <div className="space-y-10">
              {skills.map((skill, i) => (
                <div key={i}>
                  <div className="skill-label flex justify-between mb-4">
                    <span className="font-medium text-lg">{skill.name}</span>
                    <span className="text-primary font-bold">{skill.level}%</span>
                  </div>
                  <div className="h-3 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="skill-progress h-full bg-gradient-to-r from-primary to-gold-light rounded-full relative"
                      data-width={`${skill.level}%`}
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full shadow-lg" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section ref={timelineRef} className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <RevealText className="text-label text-primary mb-4" type="words">
              My Journey
            </RevealText>
            <h2 className="text-display-md">
              <RevealText type="words" delay={0.2}>
                Experience
              </RevealText>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto relative">
            {/* Center line */}
            <div className="timeline-line absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden md:block" />

            {timeline.map((item, i) => (
              <div
                key={i}
                className={`timeline-item relative flex flex-col md:flex-row gap-8 mb-16 last:mb-0 ${
                  i % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : ''}`}>
                  {i % 2 === 0 && (
                    <div className="bg-card p-8 rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                      <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-display font-bold text-lg mb-4">
                        {item.year}
                      </span>
                      <h3 className="text-2xl font-display font-bold mb-2">{item.title}</h3>
                      <p className="text-primary mb-3">{item.company}</p>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  )}
                </div>

                {/* Center dot */}
                <div className="hidden md:flex items-start justify-center pt-6">
                  <div className="w-5 h-5 bg-primary rounded-full ring-4 ring-background" />
                </div>

                <div className="flex-1">
                  {i % 2 !== 0 && (
                    <div className="bg-card p-8 rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                      <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-display font-bold text-lg mb-4">
                        {item.year}
                      </span>
                      <h3 className="text-2xl font-display font-bold mb-2">{item.title}</h3>
                      <p className="text-primary mb-3">{item.company}</p>
                      <p className="text-muted-foreground">{item.description}</p>
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
