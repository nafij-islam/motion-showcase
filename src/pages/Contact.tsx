import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import MagneticButton from '@/components/MagneticButton';
import TextScramble from '@/components/TextScramble';
import { toast } from 'sonner';

const ParticleField = lazy(() => import('@/components/ParticleField'));

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text
      const heroTl = gsap.timeline({ delay: 0.2 });
      heroTl
        .fromTo('.contact-hero-line',
          { y: 120, rotateX: -80, opacity: 0, skewY: 4 },
          { y: 0, rotateX: 0, opacity: 1, skewY: 0, stagger: 0.1, duration: 1.3, ease: 'power4.out' }
        )
        .fromTo('.contact-hero-desc',
          { y: 30, opacity: 0, filter: 'blur(8px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' },
          '-=0.6'
        );

      // Form fields
      gsap.fromTo('.form-field',
        { y: 60, opacity: 0, filter: 'blur(5px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.1, duration: 0.8, ease: 'power3.out', delay: 0.5 }
      );

      // Floating shapes
      const shapes = shapesRef.current?.querySelectorAll('.shape');
      shapes?.forEach((shape, i) => {
        gsap.to(shape, {
          y: `random(-50, 50)`, x: `random(-40, 40)`, rotation: `random(-25, 25)`, scale: `random(0.8, 1.2)`,
          duration: 5 + Math.random() * 5, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: i * 0.5,
        });
      });

      // Info cards
      gsap.fromTo('.info-card',
        { x: -80, opacity: 0, rotateY: -20, scale: 0.9 },
        { x: 0, opacity: 1, rotateY: 0, scale: 1, stagger: 0.12, duration: 1, ease: 'power4.out', scrollTrigger: { trigger: '.info-section', start: 'top 80%' } }
      );

      // Social links
      gsap.fromTo('.social-link',
        { scale: 0, opacity: 0, rotateZ: -15 },
        { scale: 1, opacity: 1, rotateZ: 0, stagger: 0.08, duration: 0.6, ease: 'elastic.out(1, 0.5)', scrollTrigger: { trigger: '.social-links', start: 'top 85%' } }
      );

      // Availability glow
      gsap.to('.avail-glow', { opacity: 0.3, scale: 1.2, repeat: -1, yoyo: true, duration: 2, ease: 'sine.inOut' });
    });

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    gsap.to('.submit-btn', { scale: 0.95, duration: 0.1 });
    await new Promise(resolve => setTimeout(resolve, 2000));
    gsap.to('.submit-btn', { scale: 1, duration: 0.3, ease: 'back.out(1.7)' });
    toast.success("Message sent successfully! I'll get back to you soon.");
    setFormState({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const contactInfo = [
    { label: 'Email', value: 'hello@portfolio.dev', icon: '✉' },
    { label: 'Phone', value: '+1 (555) 123-4567', icon: '☎' },
    { label: 'Location', value: 'San Francisco, CA', icon: '◎' },
  ];

  const formFields = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'subject', label: 'Subject', type: 'text' },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <CustomCursor />
      <Navigation />

      {/* Three.js Background */}
      <Suspense fallback={null}>
        <ParticleField intensity="low" showGeometry={false} className="!fixed" />
      </Suspense>

      {/* Floating shapes */}
      <div ref={shapesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="shape absolute top-[10%] left-[5%] w-24 sm:w-40 h-24 sm:h-40 rounded-full blur-3xl" style={{ background: 'hsl(187 100% 50% / 0.05)' }} />
        <div className="shape absolute top-[30%] right-[10%] w-32 sm:w-60 h-32 sm:h-60 rounded-full blur-3xl" style={{ background: 'hsl(187 100% 50% / 0.08)' }} />
        <div className="shape absolute bottom-[30%] left-[20%] w-20 sm:w-32 h-20 sm:h-32 rounded-full blur-2xl" style={{ background: 'hsl(187 100% 50% / 0.05)' }} />
        <div className="shape absolute bottom-[10%] right-[25%] w-24 sm:w-48 h-24 sm:h-48 rounded-full blur-3xl" style={{ background: 'hsl(187 100% 50% / 0.06)' }} />
      </div>

      {/* Hero */}
      <section className="pt-24 pb-10 sm:pt-32 sm:pb-16 md:pt-40 md:pb-20 relative z-10">
        <div className="container-custom text-center max-w-4xl mx-auto" style={{ perspective: '1000px' }}>
          <div className="overflow-hidden mb-4 sm:mb-6">
            <p className="contact-hero-line text-label text-primary" style={{ transformStyle: 'preserve-3d' }}>
              <TextScramble text="Get In Touch" delay={0.3} />
            </p>
          </div>
          <div className="overflow-hidden">
            <h1 className="contact-hero-line text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-[-0.03em] font-display mb-2" style={{ transformStyle: 'preserve-3d' }}>
              Let's work
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1 className="contact-hero-line text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-[-0.03em] font-display mb-6 sm:mb-8 gradient-text" style={{ transformStyle: 'preserve-3d' }}>
              together
            </h1>
          </div>
          <p className="contact-hero-desc text-sm sm:text-lg md:text-xl leading-relaxed font-light text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind? I'd love to hear about it.
          </p>
        </div>
      </section>

      {/* Form & Info */}
      <section className="py-4 sm:py-8 pb-16 sm:pb-24 md:pb-32 relative z-10">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-24">
            {/* Form */}
            <div>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5 sm:space-y-8">
                {formFields.map((field) => (
                  <div key={field.name} className="form-field relative group">
                    <label className={`absolute left-4 sm:left-6 transition-all duration-300 pointer-events-none text-sm sm:text-base ${
                      focusedField === field.name || formState[field.name as keyof typeof formState]
                        ? 'top-1.5 sm:top-2 text-[10px] sm:text-xs text-primary'
                        : 'top-1/2 -translate-y-1/2 text-muted-foreground'
                    }`}>
                      {field.label}
                    </label>
                    <input
                      type={field.type} name={field.name}
                      value={formState[field.name as keyof typeof formState]}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField(field.name)}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full px-4 sm:px-6 pt-6 sm:pt-7 pb-2 sm:pb-3 border-2 border-border rounded-xl focus:border-primary focus:ring-0 outline-none transition-all duration-300 text-foreground text-sm sm:text-base"
                      style={{ background: 'hsl(220 15% 7%)' }}
                    />
                    <div className={`absolute bottom-0 left-0 h-0.5 transition-all duration-500 ${focusedField === field.name ? 'w-full' : 'w-0'}`} style={{ background: 'linear-gradient(90deg, hsl(187 100% 50%), hsl(187 100% 70%))' }} />
                    {focusedField === field.name && (
                      <div className="absolute inset-0 rounded-xl pointer-events-none" style={{ boxShadow: '0 0 20px hsl(187 100% 50% / 0.1)' }} />
                    )}
                  </div>
                ))}

                <div className="form-field relative group">
                  <label className={`absolute left-4 sm:left-6 transition-all duration-300 pointer-events-none text-sm sm:text-base ${
                    focusedField === 'message' || formState.message
                      ? 'top-1.5 sm:top-2 text-[10px] sm:text-xs text-primary'
                      : 'top-4 sm:top-6 text-muted-foreground'
                  }`}>
                    Message
                  </label>
                  <textarea
                    name="message" value={formState.message} onChange={handleInputChange}
                    onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField(null)}
                    required rows={5}
                    className="w-full px-4 sm:px-6 pt-6 sm:pt-8 pb-3 sm:pb-4 border-2 border-border rounded-xl focus:border-primary focus:ring-0 outline-none transition-all duration-300 text-foreground resize-none text-sm sm:text-base"
                    style={{ background: 'hsl(220 15% 7%)' }}
                  />
                  <div className={`absolute bottom-0 left-0 h-0.5 transition-all duration-500 ${focusedField === 'message' ? 'w-full' : 'w-0'}`} style={{ background: 'linear-gradient(90deg, hsl(187 100% 50%), hsl(187 100% 70%))' }} />
                </div>

                <MagneticButton className="submit-btn w-full py-4 sm:py-5 bg-primary text-primary-foreground rounded-xl text-base sm:text-lg font-medium relative overflow-hidden group glow-cyan" onClick={() => {}}>
                  <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                      </>
                    )}
                  </span>
                </MagneticButton>
              </form>
            </div>

            {/* Info */}
            <div className="info-section" style={{ perspective: '800px' }}>
              <div className="space-y-4 sm:space-y-6">
                {contactInfo.map((info, i) => (
                  <div key={i} className="info-card p-5 sm:p-6 md:p-8 rounded-2xl border border-border hover:border-primary/30 transition-all duration-500 group cursor-pointer relative overflow-hidden" style={{ transformStyle: 'preserve-3d', background: 'hsl(220 15% 7%)' }}>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'radial-gradient(circle at 0% 50%, hsl(187 100% 50% / 0.06), transparent 60%)' }} />
                    <div className="flex items-center gap-4 sm:gap-6 relative z-10">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 shrink-0" style={{ background: 'hsl(187 100% 50% / 0.1)' }}>
                        <span className="text-xl sm:text-2xl text-primary group-hover:drop-shadow-[0_0_10px_hsla(187,100%,50%,0.5)]">{info.icon}</span>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-0.5 sm:mb-1">{info.label}</p>
                        <p className="text-base sm:text-lg md:text-xl font-medium group-hover:text-primary transition-colors">{info.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social */}
              <div className="social-links mt-8 sm:mt-12">
                <p className="text-label text-muted-foreground mb-4 sm:mb-6">Connect With Me</p>
                <div className="flex flex-wrap gap-2 sm:gap-4">
                  {['Twitter', 'LinkedIn', 'Dribbble', 'GitHub'].map((social) => (
                    <a key={social} href="#"
                      className="social-link px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 hover:shadow-[0_0_20px_hsla(187,100%,50%,0.15)]"
                      style={{ background: 'hsl(220 15% 12%)' }}
                      onMouseEnter={(e) => { (e.target as HTMLElement).style.background = 'hsl(187 100% 50%)'; (e.target as HTMLElement).style.color = 'hsl(220 20% 4%)'; }}
                      onMouseLeave={(e) => { (e.target as HTMLElement).style.background = 'hsl(220 15% 12%)'; (e.target as HTMLElement).style.color = ''; }}
                    >{social}</a>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="mt-8 sm:mt-12 p-5 sm:p-8 rounded-2xl border relative overflow-hidden" style={{ background: 'linear-gradient(135deg, hsl(187 100% 50% / 0.08), hsl(187 100% 50% / 0.02))', borderColor: 'hsl(187 100% 50% / 0.15)' }}>
                <div className="avail-glow absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-20" style={{ background: 'hsl(187 100% 50%)' }} />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="relative">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-primary rounded-full" />
                      <div className="absolute inset-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-primary rounded-full animate-ping" />
                    </div>
                    <span className="text-sm sm:text-lg font-medium">Available for new projects</span>
                  </div>
                  <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                    I'm currently taking on new clients. Let's create something extraordinary!
                  </p>
                </div>
              </div>

              <div className="mt-6 sm:mt-8 flex items-center gap-3 sm:gap-4 text-muted-foreground text-xs sm:text-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                </svg>
                <span>Usually responds within 24 hours</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
