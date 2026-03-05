import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ThreeScene = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const modelsRef = useRef({});
  const floatingModelsRef = useRef([]);

  useEffect(() => {
    console.log('🚀 Enhanced ThreeScene with better lighting and floating elements');
    
    if (!mountRef.current) return;
    
    const mount = mountRef.current; // Store ref value for cleanup

    // Enhanced scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    
    // Enhanced rendering with tone mapping
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    mount.appendChild(renderer.domElement);
    camera.position.z = 10;
    sceneRef.current = scene;

    // Enhanced lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4); // Softer ambient
    scene.add(ambientLight);
    
    // Main directional light (sun-like)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);
    
    // Rim light for better model definition
    const rimLight = new THREE.DirectionalLight(0x4ECDC4, 0.5);
    rimLight.position.set(-10, 5, -5);
    scene.add(rimLight);
    
    // Warm fill light
    const fillLight = new THREE.PointLight(0xFF6B6B, 0.3, 50);
    fillLight.position.set(0, -5, 5);
    scene.add(fillLight);

    // Load 3D models
    const loader = new GLTFLoader();
    const modelsToLoad = [
      { name: 'react', path: '/React.glb' },
      { name: 'computer', path: '/Computer.glb' },
      { name: 'character', path: '/character.glb' },
      { name: 'tree', path: '/Tree.glb' }
    ];

    console.log('📦 Loading models with enhanced lighting:', modelsToLoad.map(m => m.name));

    // Load 3D models
    Promise.all(
      modelsToLoad.map(({ name, path }) => 
        new Promise(resolve => {
          loader.load(
            path,
            (gltf) => {
              modelsRef.current[name] = gltf.scene;
              
              // Enable shadows for models
              gltf.scene.traverse((child) => {
                if (child.isMesh) {
                  child.castShadow = true;
                  child.receiveShadow = true;
                }
              });
              
              console.log(`✅ Loaded: ${name} with shadows`);
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
      console.log('🎉 All models loaded with enhanced lighting');
      createFloatingModels();
      startAnimation();
    });

    // Create floating models throughout the page
    const createFloatingModels = () => {
      const modelTypes = ['react', 'computer', 'character'];
      
      // Create multiple floating instances
      for (let i = 0; i < 6; i++) {
        const modelType = modelTypes[i % modelTypes.length];
        if (modelsRef.current[modelType]) {
          const model = modelsRef.current[modelType].clone();
          
          // Random positions around the viewport
          model.position.set(
            (Math.random() - 0.5) * 40,
            (Math.random() - 0.5) * 30,
            -15 - Math.random() * 10
          );
          
          model.scale.setScalar(0.8 + Math.random() * 0.4);
          
          model.userData = {
            modelType: modelType,
            basePosition: model.position.clone(),
            floatSpeed: 0.3 + Math.random() * 0.4,
            rotationSpeed: 0.002 + Math.random() * 0.003,
            floatOffset: Math.random() * Math.PI * 2,
            isFloating: true
          };
          
          scene.add(model);
          floatingModelsRef.current.push(model);
          console.log(`🎈 Added floating ${modelType} model`);
        }
      }
      
      // Add stationary trees on sides
      if (modelsRef.current.tree) {
        const leftTree = modelsRef.current.tree.clone();
        leftTree.position.set(-18, -2, -12);
        leftTree.scale.setScalar(0.8);
        leftTree.userData = { modelType: 'tree', isStationary: true };
        scene.add(leftTree);
        
        const rightTree = modelsRef.current.tree.clone();
        rightTree.position.set(18, -2, -12);
        rightTree.scale.setScalar(0.8);
        rightTree.userData = { modelType: 'tree', isStationary: true };
        scene.add(rightTree);
        
        console.log('🌳 Added stationary trees on both sides');
      }
    };

    // Enhanced animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      const time = Date.now() * 0.001;
      
      // Animate floating 3D models
      floatingModelsRef.current.forEach((model) => {
        if (model.userData.isFloating) {
          const basePos = model.userData.basePosition;
          const floatSpeed = model.userData.floatSpeed;
          const offset = model.userData.floatOffset;
          
          // Gentle floating motion
          model.position.y = basePos.y + Math.sin(time * floatSpeed + offset) * 2;
          model.position.x = basePos.x + Math.sin(time * floatSpeed * 0.7 + offset) * 1;
          
          // Gentle rotation
          model.rotation.y += model.userData.rotationSpeed;
          model.rotation.x = Math.sin(time * 0.5 + offset) * 0.1;
        }
      });
      
      renderer.render(scene, camera);
    };

    const startAnimation = () => {
      animate();
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
      window.removeEventListener('resize', handleResize);
      
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
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