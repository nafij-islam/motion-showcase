import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import MagneticButton from '@/components/MagneticButton';
import RevealText from '@/components/RevealText';
import TextScramble from '@/components/TextScramble';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

/**
 * Contact page with advanced form animations
 */
const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text animation
      gsap.from('.contact-hero-element', {
        y: 80,
        opacity: 0,
        stagger: 0.12,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.3,
      });

      // Form fields stagger animation
      gsap.from('.form-field', {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.6,
      });

      // Floating shapes animation with complex paths
      const shapes = shapesRef.current?.querySelectorAll('.shape');
      shapes?.forEach((shape, i) => {
        // Create more complex floating animation
        const tl = gsap.timeline({ repeat: -1, yoyo: true });
        tl.to(shape, {
          y: `random(-40, 40)`,
          x: `random(-30, 30)`,
          rotation: `random(-20, 20)`,
          scale: `random(0.9, 1.1)`,
          duration: `random(4, 7)`,
          ease: 'sine.inOut',
        });
      });

      // Info cards animation
      gsap.from('.info-card', {
        x: -60,
        opacity: 0,
        rotateY: -20,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.info-section',
          start: 'top 80%',
        },
      });

      // Social links animation
      gsap.from('.social-link', {
        scale: 0,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.social-links',
          start: 'top 85%',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Button animation
    gsap.to('.submit-btn', {
      scale: 0.95,
      duration: 0.1,
    });

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Success animation
    gsap.to('.submit-btn', {
      scale: 1,
      duration: 0.3,
      ease: 'back.out(1.7)',
    });

    toast.success('Message sent successfully! I\'ll get back to you soon.');
    setFormState({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const contactInfo = [
    { label: 'Email', value: 'hello@portfolio.dev', icon: '✉' },
    { label: 'Phone', value: '+1 (555) 123-4567', icon: '☎' },
    { label: 'Location', value: 'San Francisco, CA', icon: '◎' },
  ];

  const formFields = [
    { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
    { name: 'subject', label: 'Subject', type: 'text', placeholder: 'Project inquiry' },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <CustomCursor />
      <Navigation />

      {/* Floating shapes background */}
      <div ref={shapesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="shape absolute top-[10%] left-[5%] w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
        <div className="shape absolute top-[30%] right-[10%] w-60 h-60 bg-primary/10 rounded-full blur-3xl" />
        <div className="shape absolute bottom-[30%] left-[20%] w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
        <div className="shape absolute bottom-[10%] right-[25%] w-48 h-48 bg-primary/8 rounded-full blur-3xl" />
        <div className="shape absolute top-[50%] left-[50%] w-24 h-24 bg-primary/10 rounded-full blur-xl" />
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 relative z-10">
        <div className="container-custom text-center max-w-4xl mx-auto">
          <p className="contact-hero-element text-label text-primary mb-6">
            <TextScramble text="Get In Touch" delay={0.3} />
          </p>
          <h1 className="contact-hero-element text-display-lg mb-8">
            Let's work
            <span className="gradient-text"> together</span>
          </h1>
          <p className="contact-hero-element text-body-lg text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind? I'd love to hear about it. Send me a message
            and let's create something amazing.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding pt-8 relative z-10">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Form */}
            <div>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                {formFields.map((field) => (
                  <div key={field.name} className="form-field relative">
                    <label
                      className={`absolute left-6 transition-all duration-300 pointer-events-none ${
                        focusedField === field.name || formState[field.name as keyof typeof formState]
                          ? 'top-2 text-xs text-primary'
                          : 'top-1/2 -translate-y-1/2 text-muted-foreground'
                      }`}
                    >
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={formState[field.name as keyof typeof formState]}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField(field.name)}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full px-6 pt-7 pb-3 bg-card border-2 border-border rounded-xl focus:border-primary focus:ring-0 outline-none transition-all duration-300 text-foreground"
                    />
                    {/* Focus line animation */}
                    <div
                      className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-500 ${
                        focusedField === field.name ? 'w-full' : 'w-0'
                      }`}
                    />
                  </div>
                ))}

                <div className="form-field relative">
                  <label
                    className={`absolute left-6 transition-all duration-300 pointer-events-none ${
                      focusedField === 'message' || formState.message
                        ? 'top-2 text-xs text-primary'
                        : 'top-6 text-muted-foreground'
                    }`}
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formState.message}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows={6}
                    className="w-full px-6 pt-8 pb-4 bg-card border-2 border-border rounded-xl focus:border-primary focus:ring-0 outline-none transition-all duration-300 text-foreground resize-none"
                  />
                  <div
                    className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-500 ${
                      focusedField === 'message' ? 'w-full' : 'w-0'
                    }`}
                  />
                </div>

                <MagneticButton
                  className="submit-btn w-full py-5 bg-primary text-primary-foreground rounded-xl text-lg font-medium relative overflow-hidden group"
                  onClick={() => {}}
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gold-light translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </MagneticButton>
              </form>
            </div>

            {/* Contact Info */}
            <div className="info-section">
              <div className="space-y-6">
                {contactInfo.map((info, i) => (
                  <div
                    key={i}
                    className="info-card p-8 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all duration-500 group cursor-pointer"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
                        <span className="text-2xl text-primary">{info.icon}</span>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{info.label}</p>
                        <p className="text-xl font-medium group-hover:text-primary transition-colors">{info.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div className="social-links mt-12">
                <p className="text-label text-muted-foreground mb-6">Connect With Me</p>
                <div className="flex flex-wrap gap-4">
                  {['Twitter', 'LinkedIn', 'Dribbble', 'GitHub'].map((social, i) => (
                    <a
                      key={social}
                      href="#"
                      className="social-link px-6 py-3 bg-secondary rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="mt-12 p-8 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl border border-primary/20 relative overflow-hidden">
                {/* Animated glow */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-pulse" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative">
                      <div className="w-3 h-3 bg-primary rounded-full" />
                      <div className="absolute inset-0 w-3 h-3 bg-primary rounded-full animate-ping" />
                    </div>
                    <span className="text-lg font-medium">Available for new projects</span>
                  </div>
                  <p className="text-muted-foreground">
                    I'm currently taking on new clients. Let's discuss your next project and create something extraordinary together!
                  </p>
                </div>
              </div>

              {/* Quick response */}
              <div className="mt-8 flex items-center gap-4 text-muted-foreground">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
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
