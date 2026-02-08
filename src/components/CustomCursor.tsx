import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * Custom magnetic cursor with smooth following animation
 * Creates a premium feel with dot + ring design
 */
const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = cursorRingRef.current;
    if (!cursor || !ring) return;

    // Mouse move handler with GSAP smoothing
    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      // Cursor dot follows immediately
      gsap.to(cursor, {
        x: clientX,
        y: clientY,
        duration: 0.1,
        ease: 'power2.out',
      });

      // Ring follows with delay for smooth effect
      gsap.to(ring, {
        x: clientX,
        y: clientY,
        duration: 0.4,
        ease: 'power3.out',
      });
    };

    // Hover effects for interactive elements
    const onMouseEnter = () => setIsHovering(true);
    const onMouseLeave = () => setIsHovering(false);
    const onMouseOut = () => setIsHidden(true);
    const onMouseOver = () => setIsHidden(false);

    // Add event listeners
    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseOut);
    document.addEventListener('mouseenter', onMouseOver);

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor-hover]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseOut);
      document.removeEventListener('mouseenter', onMouseOver);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
    };
  }, []);

  // Update interactive elements when DOM changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const interactiveElements = document.querySelectorAll('a, button, [data-cursor-hover]');
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Cursor dot */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-transform duration-200 hidden md:block ${
          isHovering ? 'scale-0' : 'scale-100'
        } ${isHidden ? 'opacity-0' : 'opacity-100'}`}
      />
      {/* Cursor ring */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 rounded-full border border-primary pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hidden md:block ${
          isHovering ? 'w-16 h-16 bg-primary/10' : 'w-8 h-8 bg-transparent'
        } ${isHidden ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
      />
    </>
  );
};

export default CustomCursor;
