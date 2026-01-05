import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const contactInfoRef = useRef(null);
  const formRef = useRef(null);
  const contactCardsRef = useRef([]);
  const formFieldsRef = useRef([]);
  const buttonRef = useRef(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup - hide elements
      gsap.set([titleRef.current, subtitleRef.current], { opacity: 0, y: 50 });
      gsap.set(contactInfoRef.current, { opacity: 0, x: -100 });
      gsap.set(formRef.current, { opacity: 0, x: 100 });
      gsap.set(contactCardsRef.current, { opacity: 0, y: 30, scale: 0.9 });
      gsap.set(formFieldsRef.current, { opacity: 0, y: 20 });
      gsap.set(buttonRef.current, { opacity: 0, scale: 0.8 });

      // Create timeline for section entrance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Animate title and subtitle
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      })
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.5");

      // Animate contact info and form containers
      tl.to(contactInfoRef.current, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.3")
      .to(formRef.current, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.8");

      // Animate contact cards with stagger
      tl.to(contactCardsRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }, "-=0.5");

      // Animate form fields with stagger
      tl.to(formFieldsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.3");

      // Animate submit button
      tl.to(buttonRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)"
      }, "-=0.2");

      // Add floating animation to contact cards
      contactCardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.to(card, {
            y: -10,
            duration: 2 + index * 0.3,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            delay: index * 0.2
          });
        }
      });

      // Add hover animations for contact cards
      contactCardsRef.current.forEach((card) => {
        if (card) {
          const icon = card.querySelector('.contact-icon');
          const content = card.querySelector('.contact-content');
          
          card.addEventListener('mouseenter', () => {
            gsap.to(icon, { scale: 1.2, rotation: 5, duration: 0.3, ease: "back.out(1.7)" });
            gsap.to(content, { x: 10, duration: 0.3, ease: "power2.out" });
            gsap.to(card, { 
              boxShadow: "0 20px 40px rgba(255, 107, 107, 0.2)",
              duration: 0.3,
              ease: "power2.out"
            });
          });
          
          card.addEventListener('mouseleave', () => {
            gsap.to(icon, { scale: 1, rotation: 0, duration: 0.3, ease: "power2.out" });
            gsap.to(content, { x: 0, duration: 0.3, ease: "power2.out" });
            gsap.to(card, { 
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
              duration: 0.3,
              ease: "power2.out"
            });
          });
        }
      });

      // Add form field focus animations
      formFieldsRef.current.forEach((field) => {
        if (field) {
          const input = field.querySelector('input, textarea');
          const label = field.querySelector('label');
          
          if (input && label) {
            input.addEventListener('focus', () => {
              gsap.to(field, { 
                scale: 1.02,
                boxShadow: "0 0 20px rgba(255, 107, 107, 0.2)",
                duration: 0.3,
                ease: "power2.out"
              });
              gsap.to(label, { 
                color: "#FF6B6B",
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
              });
            });
            
            input.addEventListener('blur', () => {
              gsap.to(field, { 
                scale: 1,
                boxShadow: "none",
                duration: 0.3,
                ease: "power2.out"
              });
              gsap.to(label, { 
                color: "",
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
              });
            });
          }
        }
      });

      // Add button hover animation
      if (buttonRef.current) {
        buttonRef.current.addEventListener('mouseenter', () => {
          gsap.to(buttonRef.current, {
            scale: 1.05,
            boxShadow: "0 10px 30px rgba(255, 107, 107, 0.4)",
            duration: 0.3,
            ease: "back.out(1.7)"
          });
        });
        
        buttonRef.current.addEventListener('mouseleave', () => {
          gsap.to(buttonRef.current, {
            scale: 1,
            boxShadow: "0 5px 15px rgba(255, 107, 107, 0.2)",
            duration: 0.3,
            ease: "power2.out"
          });
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Web3Forms API endpoint
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'fc206e51-c89c-49d0-ab68-3a2a1590e630', // Replace with your actual access key from https://web3forms.com
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: formData.name,
          to_email: 'khalilurrafsun@gmail.com'
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        // Show success animation
        gsap.to(buttonRef.current, {
          scale: 1.1,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut"
        });
      } else {
        setSubmitStatus('error');
        console.error('Form submission error:', result);
      }
    } catch (error) {
      console.error('Network error:', error);
      
      // Fallback to mailto if Web3Forms fails
      try {
        const subject = encodeURIComponent(formData.subject);
        const body = encodeURIComponent(
          `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        );
        const mailtoLink = `mailto:khalilurrafsun@gmail.com?subject=${subject}&body=${body}`;
        window.location.href = mailtoLink;
        
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } catch (mailtoError) {
        setSubmitStatus('error');
      }
    } finally {
      setIsSubmitting(false);
      
      // Clear status after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }
  };

  const contactInfo = [
    {
      icon: 'email',
      label: 'Email',
      value: 'khalilurrafsun@gmail.com',
      link: 'mailto:khalilurrafsun@gmail.com',
      color: 'bg-blue-500'
    },
    {
      icon: 'phone',
      label: 'Phone',
      value: '+880 1774 951 333',
      link: 'tel:+8801774951333',
      color: 'bg-green-500'
    },
    {
      icon: 'whatsapp',
      label: 'WhatsApp',
      value: '+880 1774 951 333',
      link: 'https://wa.me/8801774951333',
      color: 'bg-emerald-500'
    }
  ];

  const socialLinks = [
    { 
      name: 'GitHub', 
      url: 'https://github.com/SadgeRaf', 
      icon: 'github',
      color: 'hover:bg-gray-800'
    },
    { 
      name: 'LinkedIn', 
      url: 'https://www.linkedin.com/in/mdkhalilurraf/', 
      icon: 'linkedin',
      color: 'hover:bg-blue-600'
    },
    { 
      name: 'Facebook', 
      url: 'https://www.facebook.com/khalilur.rafsun', 
      icon: 'facebook',
      color: 'hover:bg-blue-500'
    }
  ];

  const ContactIcon = ({ icon }) => {
    const icons = {
      email: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      phone: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      whatsapp: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
      ),
      github: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      linkedin: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      facebook: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    };
    return icons[icon] || null;
  };

  return (
    <section ref={sectionRef} id="contact" className="py-20 px-4 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-secondary/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-accent/10 rounded-full blur-lg animate-bounce"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="font-grotesk font-bold text-4xl lg:text-5xl mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Let's Work Together
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6 rounded-full"></div>
          <p ref={subtitleRef} className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's connect and create something amazing together!
          </p>
        </div>
        
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Information - Left Side */}
          <div className="lg:col-span-2">
            <div ref={contactInfoRef} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-gray-100 dark:border-gray-700 glass-morphism">
              <h3 className="font-grotesk font-bold text-2xl mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Get In Touch
              </h3>
              
              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    ref={el => contactCardsRef.current[index] = el}
                    href={info.link}
                    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-all duration-300 group border border-transparent hover:border-primary/20 backdrop-blur-sm"
                  >
                    <div className={`contact-icon w-14 h-14 ${info.color} rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <ContactIcon icon={info.icon} />
                    </div>
                    <div className="contact-content">
                      <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                        {info.label}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {info.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
              
              {/* Social Links */}
              <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
                <h4 className="font-semibold text-lg mb-4 text-center text-gray-700 dark:text-gray-300">
                  Follow Me
                </h4>
                <div className="flex justify-center gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={social.name}
                      ref={el => contactCardsRef.current[contactInfo.length + index] = el}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center ${social.color} text-white transition-all duration-300 hover:scale-110 hover:shadow-lg shadow-md`}
                      aria-label={social.name}
                    >
                      <ContactIcon icon={social.icon} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form - Right Side */}
          <div className="lg:col-span-3">
            <div ref={formRef} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-gray-100 dark:border-gray-700 glass-morphism">
              <h3 className="font-grotesk font-bold text-2xl mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Send Me a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div ref={el => formFieldsRef.current[0] = el} className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="peer w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-0 focus:border-primary bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white placeholder-transparent transition-all duration-300"
                      placeholder="Your Name"
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-4 -top-2.5 bg-white dark:bg-gray-700 px-2 text-sm font-medium text-primary transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-primary peer-focus:text-sm"
                    >
                      Your Name *
                    </label>
                  </div>
                  <div ref={el => formFieldsRef.current[1] = el} className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="peer w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-0 focus:border-primary bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white placeholder-transparent transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-4 -top-2.5 bg-white dark:bg-gray-700 px-2 text-sm font-medium text-primary transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-primary peer-focus:text-sm"
                    >
                      Email Address *
                    </label>
                  </div>
                </div>
                
                <div ref={el => formFieldsRef.current[2] = el} className="relative">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="peer w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-0 focus:border-primary bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white placeholder-transparent transition-all duration-300"
                    placeholder="What's this about?"
                  />
                  <label
                    htmlFor="subject"
                    className="absolute left-4 -top-2.5 bg-white dark:bg-gray-700 px-2 text-sm font-medium text-primary transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-primary peer-focus:text-sm"
                  >
                    Subject *
                  </label>
                </div>
                
                <div ref={el => formFieldsRef.current[3] = el} className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="peer w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-0 focus:border-primary bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white placeholder-transparent resize-none transition-all duration-300"
                    placeholder="Tell me about your project or just say hello!"
                  ></textarea>
                  <label
                    htmlFor="message"
                    className="absolute left-4 -top-2.5 bg-white dark:bg-gray-700 px-2 text-sm font-medium text-primary transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-primary peer-focus:text-sm"
                  >
                    Message *
                  </label>
                </div>
                
                <button
                  ref={buttonRef}
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-8 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg transform ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : submitStatus === 'success'
                      ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                      : submitStatus === 'error'
                      ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
                      : 'bg-gradient-to-r from-primary via-secondary to-accent hover:from-primary/90 hover:to-accent/90 hover:shadow-lg hover:scale-[1.02]'
                  } text-white`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : submitStatus === 'success' ? (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Message Sent!
                    </>
                  ) : submitStatus === 'error' ? (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      Try Again
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Send Message
                    </>
                  )}
                </button>
                
                {/* Status Messages */}
                {submitStatus && (
                  <div className={`text-center text-sm font-medium ${
                    submitStatus === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {submitStatus === 'success' 
                      ? 'Thank you! Your message has been sent successfully. I\'ll get back to you soon!' 
                      : 'Sorry, there was an error sending your message. Please try again or contact me directly.'
                    }
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;