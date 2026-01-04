import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef(null);
  const tagsRef = useRef(null);

  const skillCategories = [
    {
      title: 'Frontend',
      skills: [
        'React.js',
        'JavaScript (ES6+)',
        'HTML5',
        'CSS3',
        'Tailwind CSS',
        'Bootstrap',
        'Responsive Design'
      ]
    },
    {
      title: 'Backend',
      skills: [
        'Node.js',
        'Express.js',
        'MongoDB',
        'REST APIs',
        'Authentication',
        'Server Management'
      ]
    },
    {
      title: 'Tools & Technologies',
      skills: [
        'Git/GitHub',
        'VS Code',
        'npm/yarn',
        'Chrome DevTools',
        'Figma',
        'Photoshop'
      ]
    },
    {
      title: 'Currently Learning',
      skills: [
        'TypeScript',
        'Next.js',
        'Three.js',
        'GSAP',
        'Advanced React Patterns',
        'Database Design'
      ]
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ensure elements are visible initially as fallback
      gsap.set([titleRef.current, cardsRef.current, tagsRef.current], { opacity: 1, clearProps: "transform" });

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

        // Cards animation with stagger
        gsap.fromTo(cardsRef.current.children,
          { y: 80, opacity: 0, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            stagger: 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
              refreshPriority: -1
            }
          }
        );

        // Tags animation
        gsap.fromTo(tagsRef.current.children,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: tagsRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
              refreshPriority: -1
            }
          }
        );

        // Floating animation for cards
        gsap.to(cardsRef.current.children, {
          y: -10,
          duration: 2,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
          stagger: 0.3
        });

        // Refresh ScrollTrigger
        ScrollTrigger.refresh();
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="py-20 px-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"></div>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="font-grotesk font-bold text-4xl lg:text-5xl mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Technologies I work with and tools I use to bring ideas to life
          </p>
        </div>
        
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className="group glass rounded-3xl p-8 shadow-lg hover:shadow-glow transition-all duration-500 hover:scale-105 relative overflow-hidden"
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                    {category.title === 'Frontend' && (
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    )}
                    {category.title === 'Backend' && (
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
                      </svg>
                    )}
                    {category.title === 'Tools & Technologies' && (
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                    {category.title === 'Currently Learning' && (
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    )}
                  </div>
                  <h3 className="font-grotesk font-semibold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent group-hover:from-secondary group-hover:to-accent transition-all duration-300">
                    {category.title}
                  </h3>
                </div>
                
                <div className="space-y-3">
                  {category.skills.map((skill, idx) => (
                    <div
                      key={skill}
                      className="flex items-center gap-3 p-3 glass rounded-xl hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 group-hover:scale-105"
                      style={{
                        animationDelay: `${idx * 0.1}s`
                      }}
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse"></div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Additional Skills as Tags */}
        <div className="mt-16 text-center">
          <h3 className="font-grotesk font-semibold text-2xl mb-8 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
            Other Familiar Technologies
          </h3>
          <div ref={tagsRef} className="flex flex-wrap justify-center gap-3">
            {[
              'Firebase', 'Stripe API', 'JWT', 'OAuth', 'Vercel', 'Netlify',
              'API Integration', 'JSON', 'AJAX', 'Local Storage', 'Session Storage',
              'Web Performance', 'SEO Basics', 'Cross-browser Compatibility'
            ].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 glass rounded-full text-sm font-medium hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white transition-all duration-300 cursor-default transform hover:scale-110 hover:shadow-glow"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;