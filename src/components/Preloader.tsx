import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * Animated preloader with progress bar and text animation
 */
const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsComplete(true);
        
        // Exit animation
        const exitTl = gsap.timeline({
          onComplete: onComplete,
        });
        
        exitTl
          .to(textRef.current, {
            y: -50,
            opacity: 0,
            duration: 0.5,
            ease: 'power3.in',
          })
          .to(preloaderRef.current, {
            yPercent: -100,
            duration: 1,
            ease: 'power4.inOut',
          }, '-=0.2');
      },
    });

    // Counter animation
    tl.to(counterRef.current, {
      innerText: 100,
      duration: 2.5,
      ease: 'power2.inOut',
      snap: { innerText: 1 },
      onUpdate: function() {
        if (counterRef.current) {
          counterRef.current.innerText = Math.round(
            parseFloat(counterRef.current.innerText || '0')
          ).toString();
        }
      },
    });

    // Progress bar
    tl.to(progressRef.current, {
      width: '100%',
      duration: 2.5,
      ease: 'power2.inOut',
    }, 0);

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[100] bg-charcoal flex flex-col items-center justify-center"
    >
      <div ref={textRef} className="text-center">
        {/* Logo */}
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-8">
          PORTFOLIO<span className="text-primary">.</span>
        </h1>

        {/* Counter */}
        <div className="text-8xl md:text-9xl font-display font-bold gradient-text mb-8">
          <span ref={counterRef}>0</span>%
        </div>

        {/* Progress bar */}
        <div className="w-64 md:w-96 h-1 bg-secondary rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-primary rounded-full"
            style={{ width: '0%' }}
          />
        </div>

        {/* Loading text */}
        <p className="mt-6 text-muted-foreground text-sm tracking-widest uppercase">
          Loading Experience
        </p>
      </div>
    </div>
  );
};

export default Preloader;
