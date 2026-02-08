import { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Page transition wrapper with clip-path reveal animation
 * Creates smooth entrance/exit animations for each page
 */
const PageTransition = ({ children }: PageTransitionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const overlay = overlayRef.current;
    if (!container || !overlay) return;

    // Page entrance animation timeline
    const tl = gsap.timeline();
    
    tl.fromTo(overlay,
      { scaleY: 1 },
      { scaleY: 0, duration: 1, ease: 'power4.inOut', transformOrigin: 'top' }
    )
    .fromTo(container,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <>
      {/* Page transition overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-primary z-[60] pointer-events-none"
        style={{ transformOrigin: 'top' }}
      />
      <div ref={containerRef} className="opacity-0">
        {children}
      </div>
    </>
  );
};

export default PageTransition;
