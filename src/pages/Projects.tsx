import { useEffect, useRef, useState, lazy, Suspense } from 'react';
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

const ParticleField = lazy(() => import('@/components/ParticleField'));

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

      gsap.fromTo('.filter-btn',
        { scale: 0, opacity: 0, rotateZ: -10 },
        { scale: 1, opacity: 1, rotateZ: 0, stagger: 0.08, duration: 0.6, ease: 'elastic.out(1, 0.5)', delay: 0.5 }
      );
    });
    return () => ctx.revert();
  }, []);

  // Cards filter animation
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.project-item');
    if (!cards) return;
    gsap.fromTo(cards,
      { y: 100, opacity: 0, scale: 0.85, rotateX: -20, filter: 'blur(10px)' },
      { y: 0, opacity: 1, scale: 1, rotateX: 0, filter: 'blur(0px)', stagger: 0.1, duration: 1, ease: 'power4.out' }
    );
  }, [activeFilter]);

  // Modal animation
  useEffect(() => {
    if (selectedProject !== null) {
      document.body.style.overflow = 'hidden';
      const tl = gsap.timeline();
      tl.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 })
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
      <section className="pt-24 pb-10 sm:pt-32 sm:pb-16 md:pt-40 md:pb-20 relative overflow-hidden">
        <Suspense fallback={null}>
          <ParticleField intensity="low" showGeometry={false} />
        </Suspense>
        <div className="container-custom text-center max-w-4xl mx-auto relative z-10" style={{ perspective: '1000px' }}>
          <div className="overflow-hidden mb-4 sm:mb-6">
            <p className="proj-hero-line text-label text-primary" style={{ transformStyle: 'preserve-3d' }}>
              <TextScramble text="My Work" delay={0.3} />
            </p>
          </div>
          <div className="overflow-hidden">
            <h1 className="proj-hero-line text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-[-0.03em] font-display mb-2 sm:mb-3" style={{ transformStyle: 'preserve-3d' }}>Selected</h1>
          </div>
          <div className="overflow-hidden">
            <h1 className="proj-hero-line text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-[-0.03em] font-display mb-6 sm:mb-8 gradient-text" style={{ transformStyle: 'preserve-3d' }}>Projects</h1>
          </div>
          <p className="proj-hero-desc text-sm sm:text-lg md:text-xl leading-relaxed font-light text-muted-foreground max-w-2xl mx-auto">
            A collection of work showcasing my passion for impactful digital experiences.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-8 sm:pb-12">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {filters.map((filter) => (
              <button key={filter} onClick={() => setActiveFilter(filter)}
                className={`filter-btn px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-full text-xs sm:text-sm font-medium transition-all duration-500 relative overflow-hidden group ${
                  activeFilter === filter ? 'text-primary-foreground glow-cyan' : 'text-muted-foreground hover:text-foreground'
                }`}
                style={{ background: activeFilter === filter ? 'hsl(187 100% 50%)' : 'hsl(220 15% 12%)' }}
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

      {/* Grid */}
      <section ref={gridRef} className="py-4 sm:py-8 pb-16 sm:pb-24 md:pb-32">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-x-8 sm:gap-y-12 md:gap-y-16">
            {filteredProjects.map((project, i) => (
              <div key={project.id} className={`project-item group cursor-pointer ${i % 2 === 1 ? 'sm:mt-12 md:mt-24' : ''}`} onClick={() => setSelectedProject(project.id)} style={{ perspective: '1000px' }}>
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl" style={{ background: 'hsl(220 15% 7%)' }}>
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(135deg, hsl(187 100% 50% / 0.15), transparent 60%)' }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  </div>

                  {/* View button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-primary flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500 delay-100 glow-cyan">
                      <span className="text-primary-foreground font-bold text-xs sm:text-sm">VIEW</span>
                    </div>
                  </div>

                  {/* Number */}
                  <div className="absolute top-4 sm:top-6 left-4 sm:left-6">
                    <span className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-primary/10 group-hover:text-primary/30 transition-colors duration-500">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: 'inset 0 0 0 1px hsl(187 100% 50% / 0.3)' }} />
                </div>

                <div className="mt-4 sm:mt-6 md:mt-8 flex justify-between items-start">
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-display font-bold group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 sm:mt-2">
                      <div className="w-2 h-2 rounded-full bg-primary" style={{ boxShadow: '0 0 6px hsl(187 100% 50% / 0.4)' }} />
                      <p className="text-xs sm:text-sm md:text-base text-muted-foreground">{project.category}</p>
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm md:text-base text-muted-foreground font-display">{project.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedProject !== null && (
        <div ref={modalRef} className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-8 backdrop-blur-lg" style={{ background: 'hsl(220 20% 4% / 0.95)' }} onClick={closeModal}>
          <div className="rounded-2xl sm:rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-auto border border-border" style={{ background: 'hsl(220 15% 7%)' }} onClick={e => e.stopPropagation()}>
            {selectedProjectData && (
              <>
                <div className="modal-image aspect-video overflow-hidden rounded-t-2xl sm:rounded-t-3xl">
                  <img src={selectedProjectData.image} alt={selectedProjectData.title} className="w-full h-full object-cover" />
                </div>

                <div className="p-5 sm:p-8 md:p-12">
                  <div className="flex justify-between items-start mb-5 sm:mb-8">
                    <div>
                      <p className="modal-content-item text-primary text-xs sm:text-sm mb-2 sm:mb-3">{selectedProjectData.category}</p>
                      <h2 className="modal-content-item text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold">
                        {selectedProjectData.title}
                      </h2>
                    </div>
                    <button onClick={closeModal} className="modal-content-item p-3 sm:p-4 rounded-full transition-colors group shrink-0" style={{ background: 'hsl(220 15% 12%)' }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'hsl(187 100% 50% / 0.15)'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'hsl(220 15% 12%)'; }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:rotate-90 transition-transform duration-300">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <p className="modal-content-item text-sm sm:text-base md:text-lg text-muted-foreground mb-5 sm:mb-8 leading-relaxed">
                    This project showcases a comprehensive approach to digital design and development,
                    creating an intuitive, visually stunning experience.
                  </p>

                  <div className="modal-content-item flex flex-wrap gap-2 sm:gap-3 mb-5 sm:mb-8">
                    {['UI/UX Design', 'Development', 'Motion Design', 'Branding'].map(tag => (
                      <span key={tag} className="px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium" style={{ background: 'hsl(187 100% 50% / 0.1)', color: 'hsl(187 100% 60%)', border: '1px solid hsl(187 100% 50% / 0.2)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="modal-content-item grid grid-cols-3 gap-4 sm:gap-8 pt-5 sm:pt-8 border-t border-border">
                    <div>
                      <p className="text-muted-foreground text-xs sm:text-sm mb-1 sm:mb-2">Client</p>
                      <p className="font-medium text-sm sm:text-base">Global Brand Inc.</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs sm:text-sm mb-1 sm:mb-2">Timeline</p>
                      <p className="font-medium text-sm sm:text-base">3 Months</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs sm:text-sm mb-1 sm:mb-2">Year</p>
                      <p className="font-medium text-sm sm:text-base">{selectedProjectData.year}</p>
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
