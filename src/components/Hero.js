import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);
  const socialRef = useRef(null);
  const imageRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create timeline for entrance animations
      const tl = gsap.timeline();

      // Animate title with split text effect
      tl.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      })
      .from(subtitleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      }, "-=0.8")
      .from(descriptionRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.6")
      .from(buttonsRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "back.out(1.7)"
      }, "-=0.4")
      .from(socialRef.current.children, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }, "-=0.3")
      .from(imageRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      }, "-=1");

      // Floating animation for image
      gsap.to(imageRef.current, {
        y: -20,
        duration: 3,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1
      });

      // Create floating particles
      for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.width = Math.random() * 10 + 5 + 'px';
        particle.style.height = particle.style.width;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.background = i % 2 === 0 ? '#FF6B6B' : '#4ECDC4';
        particle.style.animationDelay = Math.random() * 6 + 's';
        heroRef.current.appendChild(particle);
        particlesRef.current.push(particle);

        gsap.to(particle, {
          y: -100,
          duration: Math.random() * 3 + 4,
          ease: "none",
          repeat: -1,
          yoyo: true
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleResumeDownload = () => {
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = '/Resume - Copy.pdf';
    link.download = 'MD_Khalilur_Rahman_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/SadgeRaf', icon: 'github' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/mdkhalilurraf/', icon: 'linkedin' },
    { name: 'Facebook', url: 'https://www.facebook.com/khalilur.rafsun', icon: 'facebook' },
  ];

  const SocialIcon = ({ icon }) => {
    const icons = {
      github: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      linkedin: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      facebook: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    };
    return icons[icon] || null;
  };

  return (
    <section 
      ref={heroRef}
      id="home" 
      className="min-h-screen flex items-center justify-center pt-20 px-4 relative overflow-hidden animated-bg"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left side - Text content */}
        <div className="text-center lg:text-left">
          <div className="mb-6">
            <p ref={subtitleRef} className="text-white/90 font-medium text-lg mb-2 tracking-wide">
              Hello, I'm
            </p>
            <h1 
              ref={titleRef}
              className="font-grotesk font-bold text-5xl sm:text-6xl lg:text-7xl leading-tight mb-4 text-white glow-text"
            >
              MD Khalilur Rahman
            </h1>
            <h2 className="font-grotesk font-medium text-2xl sm:text-3xl lg:text-4xl text-white/80 mb-6">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Full Stack Developer
              </span>
            </h2>
          </div>
          
          <p 
            ref={descriptionRef}
            className="text-lg text-white/70 mb-8 max-w-2xl leading-relaxed"
          >
            Passionate about creating beautiful, functional web applications that solve real-world problems. 
            I love turning ideas into digital reality through clean code and thoughtful design.
          </p>
          
          {/* Action Buttons */}
          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              onClick={handleResumeDownload}
              className="group bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-glow hover:shadow-glow-lg transform hover:scale-105"
            >
              <svg className="w-5 h-5 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume
            </button>
            <button
              onClick={() => {
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                  if (window.lenis) {
                    window.lenis.scrollTo(contactSection);
                  } else {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
              className="group glass text-white hover:bg-white/20 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 border-2 border-white/30 hover:border-white/50 transform hover:scale-105"
            >
              Get In Touch
            </button>
          </div>
          
          {/* Social Links */}
          <div ref={socialRef} className="flex justify-center lg:justify-start gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 glass rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-110 hover:rotate-12"
                aria-label={social.name}
              >
                <div className="text-white group-hover:text-primary transition-colors">
                  <SocialIcon icon={social.icon} />
                </div>
              </a>
            ))}
          </div>
        </div>
        
        {/* Right side - Profile Image */}
        <div className="flex justify-center lg:justify-end">
          <div ref={imageRef} className="relative">
            <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden glass shadow-2xl relative">
              <img
                src="/IMG_3855 (1).jpg"
                alt="Professional headshot"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
            {/* Floating decoration elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-primary to-secondary rounded-2xl animate-spin-slow opacity-80"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-secondary to-accent rounded-2xl animate-bounce-slow opacity-80"></div>
            <div className="absolute top-1/2 -right-8 w-8 h-8 bg-warning rounded-full animate-pulse"></div>
            <div className="absolute bottom-1/4 -left-8 w-6 h-6 bg-success rounded-full animate-ping"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;