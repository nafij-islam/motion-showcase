import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  children: string;
  className?: string;
  animation?: 'chars' | 'words' | 'lines';
  delay?: number;
  stagger?: number;
  triggerOnScroll?: boolean;
}

/**
 * Split text animation component
 * Reveals text character by character or word by word with GSAP
 */
const SplitText = ({ 
  children, 
  className = '', 
  animation = 'chars',
  delay = 0,
  stagger = 0.02,
  triggerOnScroll = false 
}: SplitTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll('.split-element');

    const animationProps = {
      y: 60,
      opacity: 0,
      rotateX: -20,
      stagger: stagger,
      duration: 0.8,
      delay: delay,
      ease: 'power3.out',
    };

    if (triggerOnScroll) {
      gsap.from(elements, {
        ...animationProps,
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    } else {
      gsap.from(elements, animationProps);
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [children, delay, stagger, triggerOnScroll]);

  // Split text based on animation type
  const splitContent = () => {
    if (animation === 'chars') {
      return children.split('').map((char, i) => (
        <span 
          key={i} 
          className="split-element inline-block"
          style={{ perspective: '1000px' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ));
    }
    
    if (animation === 'words') {
      return children.split(' ').map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <span className="split-element inline-block">
            {word}
          </span>
        </span>
      ));
    }

    return (
      <span className="split-element inline-block">
        {children}
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

export default SplitText;
