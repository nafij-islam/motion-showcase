import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * Text scramble effect - letters randomize before revealing final text
 */
interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  triggerOnView?: boolean;
}

const TextScramble = ({ 
  text, 
  className = '', 
  delay = 0,
  duration = 1.5,
  triggerOnView = false 
}: TextScrambleProps) => {
  const elementRef = useRef<HTMLSpanElement>(null);
  const [displayText, setDisplayText] = useState('');
  const chars = '!<>-_\\/[]{}—=+*^?#________';

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let frame = 0;
    const totalFrames = Math.ceil(duration * 60);
    let animationId: number;

    const scramble = () => {
      const progress = frame / totalFrames;
      const revealedLength = Math.floor(text.length * progress);
      
      let result = '';
      for (let i = 0; i < text.length; i++) {
        if (i < revealedLength) {
          result += text[i];
        } else if (text[i] === ' ') {
          result += ' ';
        } else {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      
      setDisplayText(result);
      frame++;

      if (frame <= totalFrames) {
        animationId = requestAnimationFrame(scramble);
      } else {
        setDisplayText(text);
      }
    };

    const startAnimation = () => {
      setTimeout(() => {
        setDisplayText(chars.slice(0, text.length).split('').map(() => 
          chars[Math.floor(Math.random() * chars.length)]
        ).join(''));
        scramble();
      }, delay * 1000);
    };

    if (triggerOnView) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            startAnimation();
            observer.disconnect();
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(element);
      return () => observer.disconnect();
    } else {
      startAnimation();
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [text, delay, duration, triggerOnView]);

  return (
    <span ref={elementRef} className={className}>
      {displayText || text.split('').map(() => '\u00A0').join('')}
    </span>
  );
};

export default TextScramble;
