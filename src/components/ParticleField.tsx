import { useRef, useMemo, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Particles = ({ count = 800, color = '#00EAFF' }: { count?: number; color?: string }) => {
  const mesh = useRef<THREE.Points>(null);
  const light = useRef<THREE.PointLight>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      scales[i] = Math.random() * 2 + 0.5;
      speeds[i] = Math.random() * 0.5 + 0.1;
    }

    return { positions, scales, speeds };
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.elapsedTime;

    mesh.current.rotation.x = Math.sin(time * 0.1) * 0.1;
    mesh.current.rotation.y = time * 0.05;

    const positions = mesh.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3 + 1] += Math.sin(time * particles.speeds[i] + i) * 0.002;
      positions[i3] += Math.cos(time * particles.speeds[i] * 0.5 + i) * 0.001;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;

    if (light.current) {
      light.current.position.x = Math.sin(time * 0.3) * 5;
      light.current.position.y = Math.cos(time * 0.2) * 5;
    }
  });

  return (
    <>
      <pointLight ref={light} color={color} intensity={2} distance={15} />
      <points ref={mesh}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={particles.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-scale"
            count={count}
            array={particles.scales}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          color={color}
          size={0.03}
          transparent
          opacity={0.6}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  );
};

const FloatingGeometry = () => {
  const group = useRef<THREE.Group>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const octaRef = useRef<THREE.Mesh>(null);
  const icoRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = t * 0.03;

    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.2;
      torusRef.current.rotation.z = t * 0.15;
      torusRef.current.position.y = Math.sin(t * 0.5) * 0.5;
    }
    if (octaRef.current) {
      octaRef.current.rotation.x = t * 0.15;
      octaRef.current.rotation.y = t * 0.25;
      octaRef.current.position.y = Math.cos(t * 0.4) * 0.3;
    }
    if (icoRef.current) {
      icoRef.current.rotation.z = t * 0.1;
      icoRef.current.rotation.x = t * 0.2;
      icoRef.current.position.y = Math.sin(t * 0.6 + 1) * 0.4;
    }
  });

  const material = useMemo(() => (
    <meshStandardMaterial
      color="#00EAFF"
      wireframe
      transparent
      opacity={0.15}
      emissive="#00EAFF"
      emissiveIntensity={0.3}
    />
  ), []);

  return (
    <group ref={group}>
      <mesh ref={torusRef} position={[-4, 1, -3]}>
        <torusGeometry args={[1, 0.3, 16, 32]} />
        {material}
      </mesh>
      <mesh ref={octaRef} position={[4, -1, -2]}>
        <octahedronGeometry args={[0.8]} />
        {material}
      </mesh>
      <mesh ref={icoRef} position={[0, 2, -4]}>
        <icosahedronGeometry args={[0.6]} />
        {material}
      </mesh>
    </group>
  );
};

interface ParticleFieldProps {
  className?: string;
  particleCount?: number;
  showGeometry?: boolean;
  intensity?: 'low' | 'medium' | 'high';
}

const ParticleField = ({ 
  className = '', 
  particleCount, 
  showGeometry = true,
  intensity = 'medium' 
}: ParticleFieldProps) => {
  const count = particleCount || (intensity === 'low' ? 300 : intensity === 'high' ? 1200 : 600);

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.1} />
        <Particles count={count} />
        {showGeometry && <FloatingGeometry />}
      </Canvas>
    </div>
  );
};

export default ParticleField;
