import { useRef, ReactNode } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
}

/**
 * Magnetic button component with GSAP-powered attraction effect
 * Creates a playful, premium interaction pattern
 */
const MagneticButton = ({ 
  children, 
  className = '', 
  onClick,
  strength = 0.3 
}: MagneticButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current;
    const content = contentRef.current;
    if (!button || !content) return;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Button follows cursor with reduced strength
    gsap.to(button, {
      x: x * strength,
      y: y * strength,
      duration: 0.4,
      ease: 'power3.out',
    });

    // Inner content moves opposite direction for depth
    gsap.to(content, {
      x: x * strength * 0.5,
      y: y * strength * 0.5,
      duration: 0.4,
      ease: 'power3.out',
    });
  };

  const handleMouseLeave = () => {
    const button = buttonRef.current;
    const content = contentRef.current;
    if (!button || !content) return;

    // Reset position with spring effect
    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.3)',
    });

    gsap.to(content, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`magnetic relative group ${className}`}
      data-cursor-hover
    >
      <span ref={contentRef} className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </button>
  );
};

export default MagneticButton;
