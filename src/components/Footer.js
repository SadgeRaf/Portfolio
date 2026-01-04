import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const brandRef = useRef(null);
  const contactInfoRef = useRef(null);
  const quickLinksRef = useRef(null);
  const servicesRef = useRef(null);
  const socialSectionRef = useRef(null);
  const socialLinksRef = useRef([]);
  const bottomBarRef = useRef(null);
  const decorativeElementsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup - hide elements
      gsap.set([brandRef.current, contactInfoRef.current, quickLinksRef.current, servicesRef.current], { 
        opacity: 0, 
        y: 50 
      });
      gsap.set(socialSectionRef.current, { opacity: 0, scale: 0.8 });
      gsap.set(socialLinksRef.current, { opacity: 0, scale: 0.5, rotation: 180 });
      gsap.set(bottomBarRef.current, { opacity: 0, y: 30 });
      gsap.set(decorativeElementsRef.current, { opacity: 0, scale: 0 });

      // Create main timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Animate decorative elements first
      tl.to(decorativeElementsRef.current, {
        opacity: 0.6,
        scale: 1,
        duration: 1.5,
        stagger: 0.3,
        ease: "elastic.out(1, 0.5)"
      });

      // Animate main content sections
      tl.to([brandRef.current, contactInfoRef.current], {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      }, "-=1")
      .to([quickLinksRef.current, servicesRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      }, "-=0.5");

      // Animate social section
      tl.to(socialSectionRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "-=0.3");

      // Animate social links with rotation
      tl.to(socialLinksRef.current, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }, "-=0.2");

      // Animate bottom bar
      tl.to(bottomBarRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.2");

      // Add continuous floating animations
      gsap.to(decorativeElementsRef.current[0], {
        y: -20,
        x: -10,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });

      gsap.to(decorativeElementsRef.current[1], {
        y: 15,
        x: 10,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: 1
      });

      // Add hover animations for social links
      socialLinksRef.current.forEach((link, index) => {
        if (link) {
          link.addEventListener('mouseenter', () => {
            gsap.to(link, {
              scale: 1.2,
              rotation: 10,
              y: -5,
              duration: 0.3,
              ease: "back.out(1.7)"
            });
          });
          
          link.addEventListener('mouseleave', () => {
            gsap.to(link, {
              scale: 1,
              rotation: 0,
              y: 0,
              duration: 0.3,
              ease: "power2.out"
            });
          });
        }
      });

      // Add hover animation for quick links
      const quickLinkItems = quickLinksRef.current?.querySelectorAll('button');
      quickLinkItems?.forEach((item) => {
        item.addEventListener('mouseenter', () => {
          gsap.to(item, {
            x: 10,
            color: "#FF6B6B",
            duration: 0.3,
            ease: "power2.out"
          });
        });
        
        item.addEventListener('mouseleave', () => {
          gsap.to(item, {
            x: 0,
            color: "",
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

      // Add pulsing animation to brand name
      gsap.to(brandRef.current?.querySelector('h3'), {
        textShadow: "0 0 20px rgba(255, 107, 107, 0.5)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });

    }, footerRef);

    return () => ctx.revert();
  }, []);
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

  const SocialIcon = ({ icon }) => {
    const icons = {
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
    <footer ref={footerRef} className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 animate-pulse"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div ref={brandRef} className="mb-6">
              <h3 className="font-grotesk font-bold text-3xl text-primary mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                MD Khalilur Rahman
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                Full Stack Developer passionate about creating beautiful, 
                functional web applications that solve real-world problems. 
                Let's build something amazing together!
              </p>
            </div>
            
            {/* Contact Info */}
            <div ref={contactInfoRef} className="space-y-3 mb-8">
              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 transition-all duration-300 group-hover:scale-110">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300">khalilurrafsun@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 transition-all duration-300 group-hover:scale-110">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300">+880 1774 951 333</span>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div ref={quickLinksRef}>
            <h4 className="font-grotesk font-semibold text-xl mb-6 text-white bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', href: '#home' },
                { name: 'About', href: '#about' },
                { name: 'Skills', href: '#skills' },
                { name: 'Education', href: '#education' },
                { name: 'Projects', href: '#projects' },
                { name: 'Contact', href: '#contact' }
              ].map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => {
                      const element = document.querySelector(link.href);
                      if (element) {
                        if (window.lenis) {
                          window.lenis.scrollTo(element);
                        } else {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }
                    }}
                    className="text-gray-300 hover:text-primary transition-all duration-300 hover:translate-x-1 transform inline-block relative group"
                  >
                    <span className="relative z-10">{link.name}</span>
                    <span className="absolute inset-0 bg-primary/10 rounded-md scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Services */}
          <div ref={servicesRef}>
            <h4 className="font-grotesk font-semibold text-xl mb-6 text-white bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">Services</h4>
            <ul className="space-y-3 text-gray-300">
              {[
                'Web Development',
                'Frontend Development', 
                'Backend Development',
                'Full Stack Solutions',
                'UI/UX Design',
                'API Development'
              ].map((service, index) => (
                <li key={service} className="flex items-center gap-2 group">
                  <div className="w-2 h-2 bg-primary rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                  <span className="group-hover:text-white group-hover:translate-x-1 transition-all duration-300">{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Social Links Section */}
        <div ref={socialSectionRef} className="border-t border-gray-700 pt-8 mb-8">
          <div className="text-center">
            <h4 className="font-grotesk font-semibold text-xl mb-6 text-white bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Let's Connect
            </h4>
            <div className="flex justify-center gap-6">
              {socialLinks.map((social, index) => (
                <a
                  key={social.name}
                  ref={el => socialLinksRef.current[index] = el}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative w-14 h-14 bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl flex items-center justify-center ${social.color} text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/25 border border-gray-600 hover:border-primary/50`}
                  aria-label={social.name}
                >
                  <SocialIcon icon={social.icon} />
                  <span className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap scale-75 group-hover:scale-100">
                    {social.name}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div ref={bottomBarRef} className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © 2024 MD Khalilur Rahman. All rights reserved.
              </p>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <span>Built with</span>
                <span className="text-primary font-semibold">React</span>
                <span>&</span>
                <span className="text-secondary font-semibold">Tailwind CSS</span>
              </span>
              <div className="flex items-center gap-1">
                <span>Made with</span>
                <svg className="w-4 h-4 text-red-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <span>in Bangladesh</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div ref={el => decorativeElementsRef.current[0] = el} className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
      <div ref={el => decorativeElementsRef.current[1] = el} className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-secondary/20 to-accent/20 rounded-full translate-y-24 -translate-x-24 blur-2xl"></div>
      
      {/* Animated Border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
    </footer>
  );
};

export default Footer;