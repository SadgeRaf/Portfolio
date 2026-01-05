import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ensure elements are visible initially as fallback
      gsap.set([titleRef.current, cardsRef.current], { opacity: 1, clearProps: "transform" });

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

        // Cards animation with 3D effect
        gsap.fromTo(cardsRef.current.children,
          { y: 100, opacity: 0, rotationX: 45, transformPerspective: 1000 },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            transformPerspective: 1000,
            duration: 1.2,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
              refreshPriority: -1
            }
          }
        );

        // Floating animation for project cards
        gsap.to(cardsRef.current.children, {
          y: -8,
          duration: 2.5,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
          stagger: 0.4
        });

        // Refresh ScrollTrigger
        ScrollTrigger.refresh();
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const projects = [
    {
      id: 1,
      name: 'Freelance Marketplace',
      image: '/freelancer.png',
      shortDescription: 'A comprehensive freelance marketplace connecting clients with skilled freelancers',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express.js', 'JWT', 'Tailwind CSS'],
      fullDescription: 'A full-stack freelance marketplace platform that enables clients to post projects and freelancers to bid on them. Features include user authentication, project management, real-time messaging, payment integration, and rating systems for both clients and freelancers.',
      liveLink: 'https://freelance-marketplace-8dbfc.web.app',
      githubLink: 'https://github.com/SadgeRaf/Freelancer-Marketplace.git',
      challenges: [
        'Implementing secure user authentication and authorization',
        'Building real-time messaging system between clients and freelancers',
        'Creating responsive design that works across all devices',
        'Managing complex state for project bidding and selection process'
      ],
      improvements: [
        'Add advanced search and filtering for projects',
        'Implement video call integration for client-freelancer meetings',
        'Add portfolio showcase feature for freelancers',
        'Include dispute resolution system'
      ]
    },
    {
      id: 2,
      name: 'ContestHUB',
      image: '/contestHUB.png',
      shortDescription: 'Contest management platform for organizing and participating in various competitions',
      technologies: ['React', 'Firebase', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
      fullDescription: 'A comprehensive contest management system that allows organizers to create contests and participants to join them. Features include contest creation, participant registration, submission handling, judging system, and winner announcements with automated notifications.',
      liveLink: 'https://contest-hub-988e2.web.app',
      githubLink: 'https://github.com/SadgeRaf/ContestHub.git',
      challenges: [
        'Building flexible contest creation system for different contest types',
        'Implementing fair judging and scoring mechanisms',
        'Managing file uploads for contest submissions',
        'Creating real-time leaderboards and notifications'
      ],
      improvements: [
        'Add live streaming integration for contests',
        'Implement advanced analytics for contest organizers',
        'Add social features like participant networking',
        'Include automated contest promotion tools'
      ]
    },
    {
      id: 3,
      name: 'WarmPAWS',
      image: '/warmPAWS.png',
      shortDescription: 'Pet adoption platform connecting loving families with pets in need',
      technologies: ['React', 'Firebase', 'Tailwind CSS', 'JavaScript'],
      fullDescription: 'A heartwarming pet adoption platform that helps connect pets in shelters with loving families. Features include pet profiles with detailed information, adoption application system, shelter management tools, and follow-up tracking for successful adoptions.',
      liveLink: 'https://warmpaws-55717.web.app',
      githubLink: 'https://github.com/SadgeRaf/WarmPAWS.git',
      challenges: [
        'Creating intuitive pet search and filtering system',
        'Building comprehensive adoption application workflow',
        'Implementing secure communication between adopters and shelters',
        'Managing pet profile data with multiple photos and details'
      ],
      improvements: [
        'Add virtual pet meet-and-greet video calls',
        'Implement AI-powered pet-family matching',
        'Add pet care tips and resources section',
        'Include post-adoption support community'
      ]
    },
    {
      id: 4,
      name: 'Three.js Interactive Experience',
      image: '/THREEJS.png',
      shortDescription: '3D interactive web experience built with Three.js and modern web technologies',
      technologies: ['Three.js', 'JavaScript', 'WebGL', 'GSAP', 'HTML5', 'CSS3'],
      fullDescription: 'An immersive 3D web experience showcasing interactive 3D graphics, animations, and user interactions. This project demonstrates advanced Three.js concepts including 3D modeling, lighting, textures, and smooth animations using GSAP.',
      liveLink: 'https://threejs-test-raf.netlify.app',
      githubLink: 'https://github.com/SadgeRaf/threejs-project',
      challenges: [
        'Optimizing 3D performance for different devices',
        'Creating smooth animations and transitions',
        'Implementing responsive 3D scenes',
        'Managing complex 3D object interactions'
      ],
      improvements: [
        'Add more interactive 3D elements',
        'Implement physics simulation',
        'Add VR/AR compatibility',
        'Include sound design and audio interactions'
      ]
    }
  ];

  const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="glass rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <h3 className="font-grotesk font-bold text-3xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {project.name}
              </h3>
              <button
                onClick={onClose}
                className="p-3 glass rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-110 hover:rotate-90"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-64 object-cover rounded-2xl mb-6 hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop";
              }}
            />
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-xl mb-4 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">Project Overview</h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  {project.fullDescription}
                </p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-xl mb-4 bg-gradient-to-r from-accent to-warning bg-clip-text text-transparent">Technology Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 glass rounded-full text-sm font-medium hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white transition-all duration-300 transform hover:scale-110"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-accent text-white px-6 py-3 rounded-2xl font-medium transition-all duration-300 flex items-center gap-2 transform hover:scale-105 shadow-glow"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Live Demo
                  </a>
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass hover:bg-white/20 px-6 py-3 rounded-2xl font-medium transition-all duration-300 flex items-center gap-2 transform hover:scale-105"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>
              
              <div>
                <div className="mb-6">
                  <h4 className="font-semibold text-xl mb-4 bg-gradient-to-r from-warning to-primary bg-clip-text text-transparent">Challenges Faced</h4>
                  <ul className="space-y-2">
                    {project.challenges.map((challenge, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-600 dark:text-gray-300 p-2 glass rounded-lg">
                        <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-xl mb-4 bg-gradient-to-r from-success to-secondary bg-clip-text text-transparent">Future Improvements</h4>
                  <ul className="space-y-2">
                    {project.improvements.map((improvement, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-600 dark:text-gray-300 p-2 glass rounded-lg">
                        <svg className="w-5 h-5 text-success mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section ref={sectionRef} id="projects" className="py-20 px-4 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-secondary rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="font-grotesk font-bold text-4xl lg:text-5xl mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and passion for web development
          </p>
        </div>
        
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group glass rounded-3xl overflow-hidden shadow-lg hover:shadow-glow transition-all duration-500 hover:scale-105 relative"
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-6 relative z-10">
                <h3 className="font-grotesk font-bold text-xl mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent group-hover:from-secondary group-hover:to-accent transition-all duration-300">
                  {project.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                  {project.shortDescription}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.slice(0, 3).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 glass rounded-lg text-xs font-medium hover:bg-white/20 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-gradient-to-r from-primary to-secondary text-white rounded-lg text-xs font-medium">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-accent text-white py-3 px-4 rounded-2xl font-medium transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 shadow-glow"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View Details
                  </button>
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 glass hover:bg-white/20 rounded-2xl font-medium transition-all duration-300 flex items-center justify-center transform hover:scale-105"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default Projects;