import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RevealTextProps {
  children: string;
  className?: string;
  type?: 'chars' | 'words' | 'lines';
  stagger?: number;
  duration?: number;
  delay?: number;
  y?: number;
  rotateX?: number;
}

/**
 * Premium text reveal animation with mask effect
 */
const RevealText = ({
  children,
  className = '',
  type = 'words',
  stagger = 0.08,
  duration = 1,
  delay = 0,
  y = 100,
  rotateX = -60,
}: RevealTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll('.reveal-element');
    
    gsap.set(elements, {
      y: y,
      opacity: 0,
      rotateX: rotateX,
    });

    gsap.to(elements, {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration: duration,
      stagger: stagger,
      delay: delay,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [children, stagger, duration, delay, y, rotateX]);

  const splitContent = () => {
    if (type === 'chars') {
      return children.split('').map((char, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <span className="reveal-element inline-block" style={{ transformStyle: 'preserve-3d' }}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        </span>
      ));
    }

    if (type === 'words') {
      return children.split(' ').map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <span className="reveal-element inline-block" style={{ transformStyle: 'preserve-3d' }}>
            {word}
          </span>
        </span>
      ));
    }

    return (
      <span className="inline-block overflow-hidden">
        <span className="reveal-element inline-block" style={{ transformStyle: 'preserve-3d' }}>
          {children}
        </span>
      </span>
    );
  };

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ perspective: '1000px' }}
    >
      {splitContent()}
    </div>
  );
};

export default RevealText;
