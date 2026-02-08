import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import project1 from '@/assets/project-1.jpg';
import project2 from '@/assets/project-2.jpg';
import project3 from '@/assets/project-3.jpg';
import project4 from '@/assets/project-4.jpg';

gsap.registerPlugin(ScrollTrigger);

/**
 * Projects page with animated grid, filters, and modal popup
 */
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

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.from('.projects-hero-text', {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        delay: 0.3,
      });

      // Initial project cards animation
      const cards = gridRef.current?.querySelectorAll('.project-item');
      cards?.forEach((card, i) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
          delay: i * 0.1,
        });
      });
    });

    return () => ctx.revert();
  }, []);

  // Animate filter change
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.project-item');
    gsap.to(cards, {
      opacity: 0,
      y: 30,
      duration: 0.3,
      stagger: 0.05,
      onComplete: () => {
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.out',
        });
      },
    });
  }, [activeFilter]);

  // Modal animation
  useEffect(() => {
    if (selectedProject !== null) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
      gsap.fromTo('.modal-content',
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out', delay: 0.1 }
      );
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedProject]);

  const closeModal = () => {
    gsap.to('.modal-content', {
      y: 50,
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: 'power3.in',
    });
    gsap.to(modalRef.current, {
      opacity: 0,
      duration: 0.3,
      delay: 0.1,
      onComplete: () => setSelectedProject(null),
    });
  };

  const selectedProjectData = projects.find(p => p.id === selectedProject);

  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container-custom text-center max-w-4xl mx-auto">
          <p className="projects-hero-text text-label text-primary mb-6">My Work</p>
          <h1 className="projects-hero-text text-display-lg mb-8">
            Selected
            <span className="gradient-text"> Projects</span>
          </h1>
          <p className="projects-hero-text text-body-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of work that showcases my passion for creating 
            impactful digital experiences.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="pb-12">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section ref={gridRef} className="section-padding pt-8">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="project-item group cursor-pointer"
                onClick={() => setSelectedProject(project.id)}
              >
                <div className="relative overflow-hidden rounded-2xl bg-card">
                  {/* Image with hover reveal */}
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-charcoal/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <span className="text-lg font-medium border border-foreground px-6 py-3 rounded-full">
                        View Project
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Project info */}
                <div className="mt-6 flex justify-between items-start">
                  <div>
                    <h3 className="text-xl md:text-2xl font-display font-bold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mt-1">{project.category}</p>
                  </div>
                  <span className="text-muted-foreground">{project.year}</span>
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/90 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="modal-content bg-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={e => e.stopPropagation()}
          >
            {selectedProjectData && (
              <>
                {/* Modal image */}
                <div className="aspect-video">
                  <img
                    src={selectedProjectData.image}
                    alt={selectedProjectData.title}
                    className="w-full h-full object-cover rounded-t-2xl"
                  />
                </div>
                
                {/* Modal content */}
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-primary text-sm mb-2">{selectedProjectData.category}</p>
                      <h2 className="text-3xl md:text-4xl font-display font-bold">
                        {selectedProjectData.title}
                      </h2>
                    </div>
                    <button
                      onClick={closeModal}
                      className="p-3 rounded-full bg-secondary hover:bg-primary/20 transition-colors"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
                  
                  <p className="text-muted-foreground mb-6">
                    This project showcases a comprehensive approach to digital design and development. 
                    The goal was to create an intuitive, visually stunning experience that resonates 
                    with users while achieving business objectives.
                  </p>
                  
                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 bg-secondary rounded-full text-sm">UI/UX Design</span>
                    <span className="px-4 py-2 bg-secondary rounded-full text-sm">Development</span>
                    <span className="px-4 py-2 bg-secondary rounded-full text-sm">Motion Design</span>
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
