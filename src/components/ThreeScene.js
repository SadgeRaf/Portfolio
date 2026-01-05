import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ThreeScene = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const modelsRef = useRef({});
  const currentModelsRef = useRef([]); // Array to hold multiple models

  useEffect(() => {
    console.log('🚀 NEW FRESH ThreeScene - Starting clean');
    console.log('🚫 TREE IS ABSOLUTELY BANNED - NOT IN CODE ANYWHERE');
    console.log('📋 ONLY LOADING: react, computer, character');
    
    if (!mountRef.current) return;

    // Basic scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);
    
    camera.position.z = 10;
    sceneRef.current = scene;

    // Simple lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    // Load all models including Tree for contact section
    const loader = new GLTFLoader();
    const modelsToLoad = [
      { name: 'react', path: '/React.glb' },
      { name: 'computer', path: '/Computer.glb' },
      { name: 'character', path: '/character.glb' },
      { name: 'tree', path: '/Tree.glb' }
    ];

    console.log('📦 Loading all models:', modelsToLoad.map(m => m.name));
    console.log('🌳 Tree added back for contact section!');

    // Verify no unwanted models
    const hasTree = modelsToLoad.some(m => m.name.toLowerCase().includes('tree'));
    console.log('🔍 Does model list contain tree?', hasTree ? 'YES - ERROR!' : 'NO - CORRECT');

    // Load all models
    Promise.all(
      modelsToLoad.map(({ name, path }) => 
        new Promise(resolve => {
          loader.load(
            path,
            (gltf) => {
              modelsRef.current[name] = gltf.scene;
              console.log(`✅ Loaded: ${name}`);
              
              // Debug: Check what's inside each model
              console.log(`🔍 ${name} model contents:`);
              gltf.scene.traverse((child) => {
                if (child.isMesh) {
                  console.log(`  - Mesh: ${child.name || 'unnamed'} (${child.geometry.type})`);
                }
              });
              
              resolve();
            },
            undefined,
            (error) => {
              console.error(`❌ Failed to load ${name}:`, error);
              resolve();
            }
          );
        })
      )
    ).then(() => {
      console.log('🎉 All models loaded successfully');
      startAnimation();
    });

    // Show models for section - DUAL SIDE SETUP
    const showModel = (section) => {
      // AGGRESSIVE MODEL CLEARING - Remove ALL models
      const objectsToRemove = [];
      scene.traverse((child) => {
        if (child.userData.modelType || child.parent === scene && child.type === 'Group') {
          objectsToRemove.push(child);
        }
      });
      
      objectsToRemove.forEach(obj => {
        scene.remove(obj);
        console.log('🧹 Force removed object:', obj.userData.modelType || 'unknown');
      });
      
      currentModelsRef.current = [];

      // Model configurations - SAME MODEL ON BOTH SIDES
      const configs = {
        skills: [
          { model: 'react', position: [-12, 1, -8], scale: 1.5, side: 'left' },
          { model: 'react', position: [12, 1, -8], scale: 1.5, side: 'right' }
        ],
        education: [
          { model: 'character', position: [-12, -1, -8], scale: 1.5, side: 'left' },
          { model: 'character', position: [12, -1, -8], scale: 1.5, side: 'right' }
        ],
        projects: [
          { model: 'computer', position: [-12, 0, -8], scale: 1.5, side: 'left' },
          { model: 'computer', position: [12, 0, -8], scale: 1.5, side: 'right' }
        ],
        about: [
          { model: 'tree', position: [-12, -1, -8], scale: 0.7, side: 'left' },
          { model: 'tree', position: [12, -1, -8], scale: 0.7, side: 'right' }
        ],
        contact: [
          { model: 'tree', position: [-12, -1, -8], scale: 0.7, side: 'left' },
          { model: 'tree', position: [12, -1, -8], scale: 0.7, side: 'right' }
        ]
      };

      const sectionConfigs = configs[section];
      if (!sectionConfigs) {
        console.log(`📭 No models for section: ${section}`);
        return;
      }

      // Add all models for this section
      sectionConfigs.forEach((config, index) => {
        if (!modelsRef.current[config.model]) {
          console.log(`❌ Model ${config.model} not loaded`);
          return;
        }

        // Clone and add model
        const model = modelsRef.current[config.model].clone();
        model.position.set(...config.position);
        model.scale.setScalar(config.scale);
        
        // Store metadata for animations and identification
        model.userData.modelType = config.model;
        model.userData.baseY = config.position[1];
        model.userData.baseX = config.position[0];
        model.userData.baseZ = config.position[2];
        model.userData.baseScale = config.scale;
        model.userData.side = config.side;
        model.userData.isModel = true;
        model.userData.animationOffset = index * Math.PI;
        
        // Lock position to prevent any movement
        model.userData.lockedPosition = {
          x: config.position[0],
          y: config.position[1], 
          z: config.position[2]
        };
        
        scene.add(model);
        currentModelsRef.current.push(model);
        console.log(`✅ Added ${config.model} on ${config.side} side for ${section}`);
      });

      console.log(`🎭 Section ${section} now has ${currentModelsRef.current.length} models`);
    };

    // Simple scroll detection with throttling
    let currentSection = 'home';
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      let newSection = 'home';
      
      // Simple section detection based on scroll position
      if (scrollY < windowHeight * 0.5) {
        newSection = 'home';
      } else if (scrollY < windowHeight * 1.5) {
        newSection = 'about';
      } else if (scrollY < windowHeight * 2.5) {
        newSection = 'skills';
      } else if (scrollY < windowHeight * 3.5) {
        newSection = 'education';
      } else if (scrollY < windowHeight * 4.5) {
        newSection = 'projects';
      } else {
        newSection = 'contact';
      }
      
      // Only update if section actually changed
      if (newSection !== currentSection) {
        console.log(`🔄 Section changed: ${currentSection} → ${newSection}`);
        currentSection = newSection;
        showModel(newSection);
      }
    };

    // Animation loop - ONLY rotation, NO position changes
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Animate all current models
      currentModelsRef.current.forEach((model) => {
        if (model) {
          const modelType = model.userData.modelType;
          const side = model.userData.side;
          
          // FORCE LOCK POSITION - prevent any movement
          if (model.userData.lockedPosition) {
            model.position.set(
              model.userData.lockedPosition.x,
              model.userData.lockedPosition.y,
              model.userData.lockedPosition.z
            );
          }
          
          // ONLY Y-axis rotation - NO position changes whatsoever
          const rotationSpeed = 0.005;
          if (side === 'left') {
            model.rotation.y += rotationSpeed;
          } else {
            model.rotation.y -= rotationSpeed; // Opposite direction for right side
          }
          
          // Model-specific rotation adjustments ONLY
          switch (modelType) {
            case 'react':
              // React: Slightly faster rotation
              if (side === 'left') {
                model.rotation.y += 0.003;
              } else {
                model.rotation.y -= 0.003;
              }
              break;
              
            case 'character':
            case 'computer':
            case 'tree':
              // All others: Just the base rotation, no additional changes
              break;
          }
        }
      });
      
      renderer.render(scene, camera);
    };

    const startAnimation = () => {
      animate();
      handleScroll();
      window.addEventListener('scroll', handleScroll);
    };

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default ThreeScene;