import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import MagneticButton from '@/components/MagneticButton';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

/**
 * Contact page with animated form and floating shapes
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text animation
      gsap.from('.contact-hero-text', {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        delay: 0.3,
      });

      // Form fields animation
      const inputs = formRef.current?.querySelectorAll('.form-field');
      inputs?.forEach((input, i) => {
        gsap.from(input, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
          delay: 0.5 + i * 0.1,
        });
      });

      // Floating shapes animation
      const shapes = shapesRef.current?.querySelectorAll('.shape');
      shapes?.forEach((shape, i) => {
        gsap.to(shape, {
          y: `random(-30, 30)`,
          x: `random(-20, 20)`,
          rotation: `random(-15, 15)`,
          duration: `random(3, 5)`,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.2,
        });
      });

      // Info cards animation
      gsap.from('.info-card', {
        x: -40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.info-section',
          start: 'top 80%',
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

    // Animate button
    gsap.to('.submit-btn', {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Message sent successfully! I\'ll get back to you soon.');
    setFormState({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const contactInfo = [
    { label: 'Email', value: 'hello@portfolio.dev', icon: '✉' },
    { label: 'Phone', value: '+1 (555) 123-4567', icon: '☎' },
    { label: 'Location', value: 'San Francisco, CA', icon: '◎' },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <CustomCursor />
      <Navigation />

      {/* Floating shapes background */}
      <div ref={shapesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="shape absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
        <div className="shape absolute top-40 right-20 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
        <div className="shape absolute bottom-40 left-1/4 w-24 h-24 bg-primary/5 rounded-full blur-xl" />
        <div className="shape absolute bottom-20 right-1/3 w-40 h-40 bg-primary/8 rounded-full blur-2xl" />
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 relative z-10">
        <div className="container-custom text-center max-w-4xl mx-auto">
          <p className="contact-hero-text text-label text-primary mb-6">Get In Touch</p>
          <h1 className="contact-hero-text text-display-lg mb-8">
            Let's work
            <span className="gradient-text"> together</span>
          </h1>
          <p className="contact-hero-text text-body-lg text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind? I'd love to hear about it. Send me a message 
            and let's create something amazing.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding pt-8 relative z-10">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <div>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="form-field">
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-6 py-4 bg-card border border-border rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300 text-foreground"
                      placeholder="Your name"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-4 bg-card border border-border rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300 text-foreground"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="form-field">
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formState.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-4 bg-card border border-border rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300 text-foreground"
                    placeholder="Project inquiry"
                  />
                </div>

                <div className="form-field">
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formState.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-6 py-4 bg-card border border-border rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300 text-foreground resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <MagneticButton
                  className="submit-btn w-full py-4 bg-primary text-primary-foreground rounded-xl text-lg font-medium hover:bg-gold-light transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => {}}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </MagneticButton>
              </form>
            </div>

            {/* Contact Info */}
            <div className="info-section">
              <div className="space-y-6">
                {contactInfo.map((info, i) => (
                  <div 
                    key={i}
                    className="info-card p-6 bg-card rounded-2xl border border-border hover:border-primary/30 transition-colors duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xl text-primary">{info.icon}</span>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{info.label}</p>
                        <p className="text-lg font-medium">{info.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div className="mt-12">
                <p className="text-label text-muted-foreground mb-6">Connect With Me</p>
                <div className="flex gap-4">
                  {['Twitter', 'LinkedIn', 'Dribbble', 'GitHub'].map(social => (
                    <a
                      key={social}
                      href="#"
                      className="px-6 py-3 bg-secondary rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="mt-12 p-6 bg-primary/5 rounded-2xl border border-primary/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                  <span className="text-sm font-medium">Available for new projects</span>
                </div>
                <p className="text-muted-foreground text-sm">
                  I'm currently taking on new clients. Let's discuss your next project!
                </p>
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
