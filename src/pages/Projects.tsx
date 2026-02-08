import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import RevealText from '@/components/RevealText';
import TextScramble from '@/components/TextScramble';
import project1 from '@/assets/project-1.jpg';
import project2 from '@/assets/project-2.jpg';
import project3 from '@/assets/project-3.jpg';
import project4 from '@/assets/project-4.jpg';

gsap.registerPlugin(ScrollTrigger);

/**
 * Projects page with advanced filter and modal animations
 */
const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const cursorImageRef = useRef<HTMLDivElement>(null);

  const projects = [
    { id: 1, title: 'Digital Experience Platform', category: 'Web Design', image: project1, year: '2024', color: '#D4A853' },
    { id: 2, title: 'Luxury Brand App', category: 'Mobile', image: project2, year: '2024', color: '#C4956A' },
    { id: 3, title: 'E-commerce Redesign', category: 'Web Design', image: project3, year: '2023', color: '#8B7355' },
    { id: 4, title: 'Brand Identity System', category: 'Branding', image: project4, year: '2023', color: '#A67C52' },
    { id: 5, title: 'SaaS Dashboard', category: 'Web Design', image: project1, year: '2023', color: '#B8860B' },
    { id: 6, title: 'Fitness Tracking App', category: 'Mobile', image: project2, year: '2022', color: '#CD853F' },
  ];

  const filters = ['All', 'Web Design', 'Mobile', 'Branding'];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.from('.projects-hero-element', {
        y: 80,
        opacity: 0,
        stagger: 0.12,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.3,
      });

      // Filter buttons animation
      gsap.from('.filter-btn', {
        scale: 0.8,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: 'back.out(1.7)',
        delay: 0.6,
      });
    });

    return () => ctx.revert();
  }, []);

  // Project cards animation on filter change
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.project-item');
    if (!cards) return;

    gsap.fromTo(cards,
      { y: 60, opacity: 0, scale: 0.9, rotateX: -15 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotateX: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
      }
    );
  }, [activeFilter]);

  // Cursor image follow
  useEffect(() => {
    const cursorImage = cursorImageRef.current;
    if (!cursorImage) return;

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursorImage, {
        x: e.clientX - 150,
        y: e.clientY - 100,
        duration: 0.5,
        ease: 'power3.out',
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

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
        { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' },
        { clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)', duration: 0.8, ease: 'power4.inOut' },
        '-=0.2'
      )
      .fromTo('.modal-content-item',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      );
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedProject]);

  const closeModal = () => {
    const tl = gsap.timeline({
      onComplete: () => setSelectedProject(null),
    });

    tl.to('.modal-content-item', {
      y: -30,
      opacity: 0,
      stagger: 0.05,
      duration: 0.3,
      ease: 'power3.in',
    })
    .to('.modal-image', {
      clipPath: 'polygon(0 0%, 100% 0%, 100% 0%, 0 0%)',
      duration: 0.5,
      ease: 'power4.inOut',
    }, '-=0.1')
    .to(modalRef.current, {
      opacity: 0,
      duration: 0.3,
    }, '-=0.2');
  };

  const selectedProjectData = projects.find(p => p.id === selectedProject);
  const hoveredProjectData = projects.find(p => p.id === hoveredProject);

  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <Navigation />

      {/* Cursor follow image */}
      <div
        ref={cursorImageRef}
        className={`fixed top-0 left-0 w-[300px] h-[200px] rounded-2xl overflow-hidden pointer-events-none z-30 transition-opacity duration-300 ${
          hoveredProject ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        {hoveredProjectData && (
          <img
            src={hoveredProjectData.image}
            alt=""
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container-custom text-center max-w-4xl mx-auto">
          <p className="projects-hero-element text-label text-primary mb-6">
            <TextScramble text="My Work" delay={0.3} />
          </p>
          <h1 className="projects-hero-element text-display-lg mb-8">
            Selected
            <span className="gradient-text"> Projects</span>
          </h1>
          <p className="projects-hero-element text-body-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of work that showcases my passion for creating
            impactful digital experiences.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="pb-12">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4">
            {filters.map((filter, i) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`filter-btn px-8 py-4 rounded-full text-sm font-medium transition-all duration-500 relative overflow-hidden group ${
                  activeFilter === filter
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground hover:text-foreground'
                }`}
              >
                <span className="relative z-10">{filter}</span>
                {activeFilter !== filter && (
                  <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
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
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                style={{ perspective: '1000px' }}
              >
                <div className="relative overflow-hidden rounded-2xl bg-card">
                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    {/* Color overlay */}
                    <div
                      className="absolute inset-0 mix-blend-multiply opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                      style={{ backgroundColor: project.color }}
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  </div>

                  {/* View button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                      <span className="text-primary-foreground font-medium">View</span>
                    </div>
                  </div>

                  {/* Index number */}
                  <div className="absolute top-6 left-6">
                    <span className="text-6xl font-display font-bold text-foreground/10 group-hover:text-primary/30 transition-colors duration-500">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Project info */}
                <div className="mt-8 flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-display font-bold group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mt-2">{project.category}</p>
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-charcoal/95 backdrop-blur-lg"
          onClick={closeModal}
        >
          <div
            className="bg-card rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-auto"
            onClick={e => e.stopPropagation()}
          >
            {selectedProjectData && (
              <>
                {/* Modal image */}
                <div className="modal-image aspect-video overflow-hidden rounded-t-3xl">
                  <img
                    src={selectedProjectData.image}
                    alt={selectedProjectData.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Modal content */}
                <div className="p-8 md:p-12">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <p className="modal-content-item text-primary text-sm mb-3">{selectedProjectData.category}</p>
                      <h2 className="modal-content-item text-4xl md:text-5xl font-display font-bold">
                        {selectedProjectData.title}
                      </h2>
                    </div>
                    <button
                      onClick={closeModal}
                      className="modal-content-item p-4 rounded-full bg-secondary hover:bg-primary/20 transition-colors group"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="group-hover:rotate-90 transition-transform duration-300"
                      >
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <p className="modal-content-item text-muted-foreground text-lg mb-8 leading-relaxed">
                    This project showcases a comprehensive approach to digital design and development.
                    The goal was to create an intuitive, visually stunning experience that resonates
                    with users while achieving business objectives. Through careful research, iterative
                    design, and meticulous development, we delivered a solution that exceeded expectations.
                  </p>

                  <div className="modal-content-item flex flex-wrap gap-3 mb-8">
                    {['UI/UX Design', 'Development', 'Motion Design', 'Branding'].map(tag => (
                      <span key={tag} className="px-5 py-2.5 bg-secondary rounded-full text-sm font-medium">
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
