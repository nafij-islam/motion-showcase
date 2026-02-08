import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import aboutPortrait from '@/assets/about-portrait.jpg';

gsap.registerPlugin(ScrollTrigger);

/**
 * About page with animated skill bars, counters, and timeline
 */
const About = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text reveal
      gsap.from('.about-hero-text', {
        y: 80,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        delay: 0.3,
      });

      // Image reveal with clip-path
      gsap.from(imageRef.current, {
        clipPath: 'inset(100% 0 0 0)',
        duration: 1.5,
        ease: 'power4.inOut',
        delay: 0.5,
      });

      // Skill bars animation
      const skillBars = skillsRef.current?.querySelectorAll('.skill-progress');
      skillBars?.forEach(bar => {
        const width = bar.getAttribute('data-width');
        gsap.to(bar, {
          width: width,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bar,
            start: 'top 85%',
          },
        });
      });

      // Timeline items stagger
      const timelineItems = timelineRef.current?.querySelectorAll('.timeline-item');
      timelineItems?.forEach((item, i) => {
        gsap.from(item, {
          x: i % 2 === 0 ? -50 : 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
          },
        });
      });

      // Counter animation for stats
      const counters = document.querySelectorAll('.about-counter');
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target') || '0');
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: counter,
            start: 'top 80%',
          },
          onUpdate: () => {
            counter.textContent = Math.round(obj.val).toString();
          },
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
              <p className="about-hero-text text-label text-primary mb-6">About Me</p>
              <h1 className="about-hero-text text-display-lg mb-8">
                I create digital
                <span className="gradient-text"> experiences</span>
                that matter
              </h1>
              <p className="about-hero-text text-body-lg text-muted-foreground mb-6">
                With over 8 years of experience in digital design and development, 
                I've helped brands create memorable experiences that connect with 
                their audiences and drive results.
              </p>
              <p className="about-hero-text text-body text-muted-foreground">
                I believe in the power of thoughtful design combined with cutting-edge 
                technology. Every project is an opportunity to push creative boundaries 
                while solving real problems.
              </p>
            </div>

            {/* Image */}
            <div 
              ref={imageRef}
              className="relative aspect-square lg:aspect-[3/4] rounded-2xl overflow-hidden"
              style={{ clipPath: 'inset(0 0 0 0)' }}
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

      {/* Skills Section */}
      <section ref={skillsRef} className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <p className="text-label text-primary mb-4 text-center">My Expertise</p>
            <h2 className="text-display-md text-center mb-16">Skills & Abilities</h2>

            <div className="space-y-8">
              {skills.map((skill, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-3">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-primary">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="skill-progress h-full bg-primary rounded-full"
                      data-width={`${skill.level}%`}
                      style={{ width: 0 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section ref={timelineRef} className="section-padding bg-card">
        <div className="container-custom">
          <p className="text-label text-primary mb-4 text-center">My Journey</p>
          <h2 className="text-display-md text-center mb-16">Experience</h2>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Center line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden md:block" />

              {timeline.map((item, i) => (
                <div 
                  key={i}
                  className={`timeline-item relative flex flex-col md:flex-row gap-8 mb-12 last:mb-0 ${
                    i % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className="flex-1 text-left md:text-right">
                    {i % 2 === 0 && (
                      <div className="bg-secondary p-6 rounded-2xl">
                        <span className="text-primary font-display font-bold text-xl">{item.year}</span>
                        <h3 className="text-xl font-bold mt-2">{item.title}</h3>
                        <p className="text-primary text-sm mt-1">{item.company}</p>
                        <p className="text-muted-foreground mt-3">{item.description}</p>
                      </div>
                    )}
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex items-start justify-center">
                    <div className="w-4 h-4 bg-primary rounded-full mt-6" />
                  </div>

                  <div className="flex-1">
                    {i % 2 !== 0 && (
                      <div className="bg-secondary p-6 rounded-2xl">
                        <span className="text-primary font-display font-bold text-xl">{item.year}</span>
                        <h3 className="text-xl font-bold mt-2">{item.title}</h3>
                        <p className="text-primary text-sm mt-1">{item.company}</p>
                        <p className="text-muted-foreground mt-3">{item.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
