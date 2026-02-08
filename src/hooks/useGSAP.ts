import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook for GSAP animations with automatic cleanup
 */
export const useGSAP = (callback: (gsap: typeof import('gsap').default, ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger) => void | (() => void), deps: React.DependencyList = []) => {
  const contextRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    // Create GSAP context for proper cleanup
    contextRef.current = gsap.context(() => {
      callback(gsap, ScrollTrigger);
    });

    return () => {
      contextRef.current?.revert();
    };
  }, deps);

  return contextRef;
};

/**
 * Split text into characters for animation
 */
export const splitTextToChars = (text: string): string[] => {
  return text.split('').map(char => char === ' ' ? '\u00A0' : char);
};

/**
 * Split text into words for animation
 */
export const splitTextToWords = (text: string): string[] => {
  return text.split(' ');
};

/**
 * GSAP ease presets matching our design system
 */
export const EASE = {
  smooth: 'power4.out',
  bounce: 'back.out(1.7)',
  expo: 'expo.out',
  elastic: 'elastic.out(1, 0.3)',
  power2: 'power2.inOut',
  power3: 'power3.out',
  circ: 'circ.out',
} as const;

/**
 * Common animation presets
 */
export const ANIMATIONS = {
  fadeUp: {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: EASE.smooth,
  },
  fadeIn: {
    opacity: 0,
    duration: 0.8,
    ease: EASE.smooth,
  },
  scaleIn: {
    scale: 0.95,
    opacity: 0,
    duration: 0.6,
    ease: EASE.smooth,
  },
  slideInLeft: {
    x: -100,
    opacity: 0,
    duration: 1,
    ease: EASE.smooth,
  },
  slideInRight: {
    x: 100,
    opacity: 0,
    duration: 1,
    ease: EASE.smooth,
  },
  clipReveal: {
    clipPath: 'inset(0 0 100% 0)',
    duration: 1.2,
    ease: EASE.expo,
  },
} as const;

export { gsap, ScrollTrigger };
