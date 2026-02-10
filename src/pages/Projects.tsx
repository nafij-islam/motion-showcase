import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import TextScramble from '@/components/TextScramble';
import project1 from '@/assets/project-1.jpg';
import project2 from '@/assets/project-2.jpg';
import project3 from '@/assets/project-3.jpg';
import project4 from '@/assets/project-4.jpg';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const projects = [
    { id: 1, title: 'Digital Experience Platform', category: 'Web Design', image: project1, year: '2024' },
    { id: 2, title: 'Luxury Brand App', category: 'Mobile', image: project2, year: '2024' },
    { id: 3, title: 'E-commerce Redesign', category: 'Web Design', image: project3, year: '2023' },
    { id: 4, title: 'Brand Identity System', category: 'Branding', image: project4, year: '2023' },
    { id: 5, title: 'SaaS Dashboard', category: 'Web Design', image: project1, year: '2023' },
    { id: 6, title: 'Fitness Tracking App', category: 'Mobile', image: project2, year: '2022' },
  ];

  const filters = ['All', 'Web Design', 'Mobile', 'Branding'];
  const filteredProjects = activeFilter === 'All' ? projects : projects.filter(p => p.category === activeFilter);

  // Hero animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline({ delay: 0.2 });
      heroTl
        .fromTo('.proj-hero-line',
          { y: 120, rotateX: -80, opacity: 0, skewY: 4 },
          { y: 0, rotateX: 0, opacity: 1, skewY: 0, stagger: 0.1, duration: 1.3, ease: 'power4.out' }
        )
        .fromTo('.proj-hero-desc',
          { y: 30, opacity: 0, filter: 'blur(8px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' },
          '-=0.6'
        );

      // Filter buttons — elastic pop
      gsap.fromTo('.filter-btn',
        { scale: 0, opacity: 0, rotateZ: -10 },
        { scale: 1, opacity: 1, rotateZ: 0, stagger: 0.08, duration: 0.6, ease: 'elastic.out(1, 0.5)', delay: 0.5 }
      );
    });
    return () => ctx.revert();
  }, []);

  // Cards animation on filter
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.project-item');
    if (!cards) return;

    gsap.fromTo(cards,
      { y: 100, opacity: 0, scale: 0.85, rotateX: -20, filter: 'blur(10px)' },
      {
        y: 0, opacity: 1, scale: 1, rotateX: 0, filter: 'blur(0px)',
        stagger: 0.1, duration: 1, ease: 'power4.out',
      }
    );
  }, [activeFilter]);

  // Modal animation
  useEffect(() => {
    if (selectedProject !== null) {
      document.body.style.overflow = 'hidden';
      const tl = gsap.timeline();
      tl.fromTo(modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 }
      )
      .fromTo('.modal-image',
        { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', scale: 1.2 },
        { clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)', scale: 1, duration: 0.8, ease: 'power4.inOut' },
        '-=0.2'
      )
      .fromTo('.modal-content-item',
        { y: 40, opacity: 0, filter: 'blur(5px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.08, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      );
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedProject]);

  const closeModal = () => {
    const tl = gsap.timeline({ onComplete: () => setSelectedProject(null) });
    tl.to('.modal-content-item', { y: -30, opacity: 0, stagger: 0.05, duration: 0.3, ease: 'power3.in' })
      .to('.modal-image', { clipPath: 'polygon(0 0%, 100% 0%, 100% 0%, 0 0%)', duration: 0.5, ease: 'power4.inOut' }, '-=0.1')
      .to(modalRef.current, { opacity: 0, duration: 0.3 }, '-=0.2');
  };

  const selectedProjectData = projects.find(p => p.id === selectedProject);

  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden">
        <div className="absolute top-10 right-1/4 w-[500px] h-[500px] rounded-full blur-[200px] opacity-5" style={{ background: 'hsl(187 100% 50%)' }} />
        <div className="container-custom text-center max-w-4xl mx-auto relative z-10" style={{ perspective: '1000px' }}>
          <div className="overflow-hidden mb-6">
            <p className="proj-hero-line text-label text-primary" style={{ transformStyle: 'preserve-3d' }}>
              <TextScramble text="My Work" delay={0.3} />
            </p>
          </div>
          <div className="overflow-hidden">
            <h1 className="proj-hero-line text-display-lg mb-3" style={{ transformStyle: 'preserve-3d' }}>Selected</h1>
          </div>
          <div className="overflow-hidden">
            <h1 className="proj-hero-line text-display-lg mb-8 gradient-text" style={{ transformStyle: 'preserve-3d' }}>Projects</h1>
          </div>
          <p className="proj-hero-desc text-body-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of work showcasing my passion for creating impactful digital experiences.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="pb-12">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`filter-btn px-8 py-4 rounded-full text-sm font-medium transition-all duration-500 relative overflow-hidden group ${
                  activeFilter === filter
                    ? 'text-primary-foreground glow-cyan'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                style={{
                  background: activeFilter === filter ? 'hsl(187 100% 50%)' : 'hsl(220 15% 12%)',
                }}
              >
                <span className="relative z-10">{filter}</span>
                {activeFilter !== filter && (
                  <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300" style={{ background: 'hsl(187 100% 50% / 0.1)' }} />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section ref={gridRef} className="section-padding pt-8">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-16">
            {filteredProjects.map((project, i) => (
              <div
                key={project.id}
                className={`project-item group cursor-pointer ${i % 2 === 1 ? 'md:mt-24' : ''}`}
                onClick={() => setSelectedProject(project.id)}
                style={{ perspective: '1000px' }}
              >
                <div className="relative overflow-hidden rounded-2xl" style={{ background: 'hsl(220 15% 7%)' }}>
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(135deg, hsl(187 100% 50% / 0.15), transparent 60%)' }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  </div>

                  {/* View button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500 delay-100 glow-cyan">
                      <span className="text-primary-foreground font-bold text-sm">VIEW</span>
                    </div>
                  </div>

                  {/* Number */}
                  <div className="absolute top-6 left-6">
                    <span className="text-6xl font-display font-bold text-primary/10 group-hover:text-primary/30 transition-colors duration-500">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Hover border glow */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: 'inset 0 0 0 1px hsl(187 100% 50% / 0.3)' }} />
                </div>

                <div className="mt-8 flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-display font-bold group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-2 h-2 rounded-full bg-primary" style={{ boxShadow: '0 0 6px hsl(187 100% 50% / 0.4)' }} />
                      <p className="text-muted-foreground">{project.category}</p>
                    </div>
                  </div>
                  <span className="text-muted-foreground font-display">{project.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedProject !== null && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 backdrop-blur-lg"
          style={{ background: 'hsl(220 20% 4% / 0.95)' }}
          onClick={closeModal}
        >
          <div
            className="rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-auto border border-border"
            style={{ background: 'hsl(220 15% 7%)' }}
            onClick={e => e.stopPropagation()}
          >
            {selectedProjectData && (
              <>
                <div className="modal-image aspect-video overflow-hidden rounded-t-3xl">
                  <img src={selectedProjectData.image} alt={selectedProjectData.title} className="w-full h-full object-cover" />
                </div>

                <div className="p-8 md:p-12">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <p className="modal-content-item text-primary text-sm mb-3">{selectedProjectData.category}</p>
                      <h2 className="modal-content-item text-4xl md:text-5xl font-display font-bold">
                        {selectedProjectData.title}
                      </h2>
                    </div>
                    <button onClick={closeModal} className="modal-content-item p-4 rounded-full transition-colors group" style={{ background: 'hsl(220 15% 12%)' }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'hsl(187 100% 50% / 0.15)'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'hsl(220 15% 12%)'; }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:rotate-90 transition-transform duration-300">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <p className="modal-content-item text-muted-foreground text-lg mb-8 leading-relaxed">
                    This project showcases a comprehensive approach to digital design and development.
                    The goal was to create an intuitive, visually stunning experience that resonates
                    with users while achieving business objectives.
                  </p>

                  <div className="modal-content-item flex flex-wrap gap-3 mb-8">
                    {['UI/UX Design', 'Development', 'Motion Design', 'Branding'].map(tag => (
                      <span key={tag} className="px-5 py-2.5 rounded-full text-sm font-medium" style={{ background: 'hsl(187 100% 50% / 0.1)', color: 'hsl(187 100% 60%)', border: '1px solid hsl(187 100% 50% / 0.2)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="modal-content-item grid md:grid-cols-3 gap-8 pt-8 border-t border-border">
                    <div>
                      <p className="text-muted-foreground text-sm mb-2">Client</p>
                      <p className="font-medium">Global Brand Inc.</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm mb-2">Timeline</p>
                      <p className="font-medium">3 Months</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm mb-2">Year</p>
                      <p className="font-medium">{selectedProjectData.year}</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Projects;
