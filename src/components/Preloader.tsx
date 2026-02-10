import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        const exitTl = gsap.timeline({ onComplete });
        exitTl
          .to(textRef.current, { y: -50, opacity: 0, duration: 0.5, ease: 'power3.in' })
          .to(preloaderRef.current, { yPercent: -100, duration: 1, ease: 'power4.inOut' }, '-=0.2');
      },
    });

    tl.to(counterRef.current, {
      innerText: 100,
      duration: 2.5,
      ease: 'power2.inOut',
      snap: { innerText: 1 },
      onUpdate: function () {
        if (counterRef.current) {
          counterRef.current.innerText = Math.round(parseFloat(counterRef.current.innerText || '0')).toString();
        }
      },
    });

    tl.to(progressRef.current, { width: '100%', duration: 2.5, ease: 'power2.inOut' }, 0);

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ background: 'hsl(220 20% 4%)' }}
    >
      <div ref={textRef} className="text-center">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-8">
          PORTFOLIO<span className="text-primary">.</span>
        </h1>

        <div className="text-8xl md:text-9xl font-display font-bold gradient-text mb-8">
          <span ref={counterRef}>0</span>%
        </div>

        <div className="w-64 md:w-96 h-1 rounded-full overflow-hidden" style={{ background: 'hsl(220 15% 12%)' }}>
          <div
            ref={progressRef}
            className="h-full rounded-full"
            style={{ width: '0%', background: 'linear-gradient(90deg, hsl(187 100% 35%), hsl(187 100% 50%), hsl(187 100% 65%))', boxShadow: '0 0 15px hsl(187 100% 50% / 0.4)' }}
          />
        </div>

        <p className="mt-6 text-muted-foreground text-sm tracking-widest uppercase">
          Loading Experience
        </p>
      </div>
    </div>
  );
};

export default Preloader;
