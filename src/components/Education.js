import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const timelineRef = useRef(null);
  const certificationsRef = useRef(null);

  const educationData = [
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'North South University',
      location: 'Dhaka, Bangladesh',
      duration: 'May 2025 - 2029',
      gpa: '3.59/4.00',
      description: 'Currently pursuing Computer Science degree focusing on software engineering, data structures, algorithms, and web development. Currently in 2nd semester.',
      achievements: [
        'Maintaining strong academic performance',
        'Active participation in programming courses',
        'Learning modern web development technologies',
        'Building practical projects alongside studies'
      ]
    }
  ];

  const certifications = [
    {
      name: 'Programming Hero - Complete Web Development',
      issuer: 'Programming Hero',
      description: 'Comprehensive web development course covering HTML, CSS, JavaScript, React, Node.js, and MongoDB'
    },
    {
      name: 'IELTS Academic - Band 8.0',
      issuer: 'IDP',
      description: 'International English Language Testing System with overall band score of 8.0'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ensure elements are visible initially as fallback
      gsap.set([titleRef.current, timelineRef.current, certificationsRef.current], { opacity: 1, clearProps: "transform" });

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

        // Timeline animation
        gsap.fromTo(timelineRef.current.children,
          { x: -100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
              refreshPriority: -1
            }
          }
        );

        // Certifications animation
        gsap.fromTo(certificationsRef.current.children,
          { scale: 0.8, opacity: 0, y: 50 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: certificationsRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
              refreshPriority: -1
            }
          }
        );

        // Floating animation for cards
        gsap.to(timelineRef.current.children, {
          y: -5,
          duration: 3,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
          stagger: 0.5
        });

        // Refresh ScrollTrigger
        ScrollTrigger.refresh();
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="education" className="py-20 px-4 bg-gradient-to-br from-secondary/5 via-accent/5 to-primary/5 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-secondary rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="font-grotesk font-bold text-4xl lg:text-5xl mb-4 bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent">
            Education
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-secondary to-accent mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            My academic journey and continuous learning path
          </p>
        </div>
        
        {/* Education Timeline */}
        <div ref={timelineRef} className="space-y-8 mb-16">
          {educationData.map((edu, index) => (
            <div
              key={index}
              className="group glass rounded-3xl p-8 shadow-lg hover:shadow-glow transition-all duration-500 hover:scale-105 relative overflow-hidden"
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-accent/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-grotesk font-bold text-2xl bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent group-hover:from-accent group-hover:to-primary transition-all duration-300">
                        {edu.degree}
                      </h3>
                      <h4 className="font-semibold text-xl text-gray-700 dark:text-gray-300">
                        {edu.institution}
                      </h4>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                      <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {edu.location} • {edu.duration}
                    </p>
                    {edu.gpa && (
                      <p className="text-primary font-semibold flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        GPA: {edu.gpa}
                      </p>
                    )}
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {edu.description}
                  </p>
                </div>
                
                <div>
                  <h5 className="font-semibold text-lg mb-4 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    Current Focus
                  </h5>
                  <ul className="space-y-3">
                    {edu.achievements.map((achievement, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-gray-600 dark:text-gray-300 p-2 glass rounded-lg hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300"
                      >
                        <svg className="w-5 h-5 text-success mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Certifications */}
        <div className="text-center">
          <h3 className="font-grotesk font-semibold text-2xl mb-8 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            Certifications
          </h3>
          <div ref={certificationsRef} className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="group glass rounded-3xl p-8 shadow-lg hover:shadow-glow transition-all duration-500 hover:scale-105 text-left relative overflow-hidden"
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-primary/10 to-warning/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10 flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center flex-shrink-0 group-hover:rotate-12 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-grotesk font-bold text-lg bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent group-hover:from-primary group-hover:to-warning transition-all duration-300 mb-2">
                      {cert.name}
                    </h4>
                    <p className="font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h6m-6 4h6m-6 4h6" />
                      </svg>
                      {cert.issuer}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {cert.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;