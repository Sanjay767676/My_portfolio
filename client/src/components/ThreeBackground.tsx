import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    animationId: number;
    points: THREE.Points;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch (e) {
      setWebglSupported(false);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 40;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle Shader
    const vertexShader = `
      varying vec3 vColor;
      varying float vOpacity;
      uniform float uTime;
      uniform vec2 uMouse;
      attribute float aSize;
      attribute vec3 aRandom;

      void main() {
        vColor = color;
        
        vec3 pos = position;
        
        // Add subtle constant movement
        pos.x += sin(uTime * 0.2 + aRandom.x * 10.0) * 0.5;
        pos.y += cos(uTime * 0.3 + aRandom.y * 10.0) * 0.5;
        pos.z += sin(uTime * 0.1 + aRandom.z * 10.0) * 0.5;

        // Mouse interaction
        vec2 shipPos = (pos.xy / 100.0);
        float dist = distance(shipPos, uMouse);
        float force = 1.0 - smoothstep(0.0, 0.4, dist);
        pos.xy += normalize(pos.xy - uMouse * 50.0) * force * 2.0;

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = aSize * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
        
        vOpacity = 0.6 + sin(uTime + aRandom.x * 6.28) * 0.4;
      }
    `;

    const fragmentShader = `
      varying vec3 vColor;
      varying float vOpacity;

      void main() {
        float d = distance(gl_PointCoord, vec2(0.5));
        if (d > 0.5) discard;
        
        float strength = 1.0 - (d * 2.0);
        strength = pow(strength, 2.0);
        
        gl_FragColor = vec4(vColor, strength * vOpacity);
      }
    `;

    const particleCount = 10000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const randoms = new Float32Array(particleCount * 3);

    const palette = [
      new THREE.Color("#4f46e5"), // Indigo
      new THREE.Color("#06b6d4"), // Cyan
      new THREE.Color("#ec4899"), // Pink
      new THREE.Color("#8b5cf6"), // Violet
    ];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Galaxy-like distribution
      const radius = Math.random() * 60;
      const angle = Math.random() * Math.PI * 2;
      const spread = (Math.random() - 0.5) * 10;

      positions[i3] = Math.cos(angle) * (radius + spread);
      positions[i3 + 1] = (Math.random() - 0.5) * 40;
      positions[i3 + 2] = Math.sin(angle) * (radius + spread);

      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      sizes[i] = Math.random() * 2 + 1;

      randoms[i3] = Math.random();
      randoms[i3 + 1] = Math.random();
      randoms[i3 + 2] = Math.random();
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 3));

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Add wireframe geometries for depth
    const icoGroup = new THREE.Group();
    const icoGeom = new THREE.IcosahedronGeometry(25, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x4f46e5,
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    });
    const ico = new THREE.Mesh(icoGeom, icoMat);
    icoGroup.add(ico);
    scene.add(icoGroup);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      material.uniforms.uMouse.value.set(mouseX, mouseY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    const animate = (time: number) => {
      const animationId = requestAnimationFrame(animate);

      material.uniforms.uTime.value = time * 0.001;

      // Smooth camera movement
      targetX += (mouseX * 5 - targetX) * 0.05;
      targetY += (mouseY * 5 - targetY) * 0.05;

      camera.position.x += (targetX - camera.position.x) * 0.1;
      camera.position.y += (targetY - camera.position.y) * 0.1;
      camera.lookAt(0, 0, 0);

      points.rotation.y += 0.001;
      icoGroup.rotation.y -= 0.0005;
      icoGroup.rotation.z += 0.0002;

      renderer.render(scene, camera);
      sceneRef.current = { scene, camera, renderer, animationId, points };
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      icoGeom.dispose();
      icoMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (!webglSupported) {
    return (
      <div className="fixed inset-0 -z-10 bg-[#0a0a0a]" />
    );
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 bg-[#020617]"
      data-testid="three-background"
    />
  );
}
