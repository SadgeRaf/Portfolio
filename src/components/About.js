import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ensure elements are visible initially as fallback
      gsap.set([titleRef.current, imageRef.current, contentRef.current], { opacity: 1, clearProps: "transform" });

      // Small delay to ensure DOM is ready
      gsap.delayedCall(0.1, () => {
        // Title animation
        gsap.fromTo(titleRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
              refreshPriority: -1
            }
          }
        );

        // Image animation with rotation
        gsap.fromTo(imageRef.current,
          { scale: 0.8, rotation: -10, opacity: 0 },
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 1.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
              refreshPriority: -1
            }
          }
        );

        // Content cards animation
        gsap.fromTo(contentRef.current.children,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
              refreshPriority: -1
            }
          }
        );

        // Floating animation for the GIF
        gsap.to(imageRef.current, {
          y: -15,
          duration: 3,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1
        });

        // Refresh ScrollTrigger
        ScrollTrigger.refresh();
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-20 px-4 bg-gradient-to-br from-background-light via-gray-50 to-background-light dark:from-background-dark dark:via-gray-900 dark:to-background-dark relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="font-grotesk font-bold text-4xl lg:text-5xl mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Discover my journey, passions, and what drives me as a developer
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Animated GIF */}
          <div className="flex justify-center">
            <div className="relative">
              <div ref={imageRef} className="w-80 h-80 rounded-3xl overflow-hidden glass shadow-2xl relative group">
                <img
                  src="https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif"
                  alt="Coding animation"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-secondary/20"></div>
              </div>
              {/* Floating decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-r from-accent to-warning rounded-3xl -z-10 animate-spin-slow opacity-80"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-r from-success to-secondary rounded-2xl -z-10 animate-bounce-slow opacity-70"></div>
              
              {/* Floating particles */}
              <div className="absolute top-10 -right-4 w-4 h-4 bg-primary rounded-full animate-ping"></div>
              <div className="absolute bottom-16 -left-4 w-3 h-3 bg-secondary rounded-full animate-pulse"></div>
              <div className="absolute top-1/2 -right-8 w-2 h-2 bg-accent rounded-full animate-bounce"></div>
            </div>
          </div>
          
          {/* Right side - Content */}
          <div ref={contentRef} className="space-y-6">
            <div className="group p-6 glass rounded-3xl hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-300 transform hover:scale-105 hover:shadow-glow">
              <h3 className="font-grotesk font-semibold text-2xl mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent group-hover:from-secondary group-hover:to-accent transition-all duration-300">
                My Programming Journey
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                My journey into programming started during my first year at North South University. 
                What began as curiosity about how websites work quickly turned into passion as I 
                discovered the power of creating digital solutions. Currently in my 2nd semester 
                pursuing Computer Science, I've been learning web development through Programming Hero 
                and building projects to apply what I learn.
              </p>
            </div>
            
            <div className="group p-6 glass rounded-3xl hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-300 transform hover:scale-105 hover:shadow-glow">
              <h3 className="font-grotesk font-semibold text-2xl mb-4 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent group-hover:from-accent group-hover:to-warning transition-all duration-300">
                What I Love Doing
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                I'm passionate about frontend development and creating user-friendly interfaces. 
                I particularly enjoy working with React.js, Next.js, and modern CSS frameworks like Tailwind. 
                I'm also fascinated by 3D web development with Three.js and love experimenting with Blender 
                for creating 3D models and animations. There's something magical about combining great design 
                with smooth functionality to create amazing user experiences.
              </p>
            </div>
            
            <div className="group p-6 glass rounded-3xl hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-300 transform hover:scale-105 hover:shadow-glow">
              <h3 className="font-grotesk font-semibold text-2xl mb-4 bg-gradient-to-r from-accent to-warning bg-clip-text text-transparent group-hover:from-warning group-hover:to-success transition-all duration-300">
                Beyond Coding
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                When I'm not coding, I love drawing and sketching, which helps me think creatively about 
                UI/UX designs. I also enjoy editing videos, experimenting with different styles and effects. 
                To stay physically active, I regularly go to the gym, which helps me maintain focus and 
                energy for my programming projects. I believe these creative and physical activities 
                complement my technical skills perfectly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;