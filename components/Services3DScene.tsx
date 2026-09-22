// components/Services3DScene.tsx
'use client';

import { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { type ServiceCardData } from './NewServiceCard';
import Card3DMesh from './Card3DMesh';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Services3DSceneProps {
    services: ServiceCardData[];
    /** Integer index of the current centre card */
    activeIdx: number;
    /** Fractional card offset from a live drag gesture (range ≈ ±1) */
    dragOffsetNorm: number;
    onCardClick: (index: number) => void;
}

// ─── Responsive Camera Rig ────────────────────────────────────────────────────
// Scales perspective, FOV, and z-distance dynamically across 1440p, 4K, ultrawide,
// desktop, and mobile displays without distortion or off-screen clipping.

function ResponsiveCamera({
    activeIdx,
    total,
}: {
    activeIdx: number;
    total: number;
}) {
    const { size } = useThree();
    const cameraRef = useRef<THREE.PerspectiveCamera>(null);

    useFrame((_, delta) => {
        if (!cameraRef.current) return;

        const aspect = size.width / Math.max(size.height, 1);

        // Responsive scaling adjustments
        let targetZ = 10;
        let targetY = 0.5;
        let targetFov = 45;

        if (aspect < 0.9) {
            // Mobile portrait
            targetZ = 12.5;
            targetY = 1.0;
            targetFov = 50;
        } else if (aspect < 1.3) {
            // Tablet / standard laptop
            targetZ = 10.8;
            targetY = 0.7;
            targetFov = 46;
        } else {
            // 1440p, 4K, and Ultrawide displays
            targetZ = 10.0;
            targetY = 0.5;
            targetFov = 45;
        }

        // Gentle camera lean to track active index
        const leanX = ((activeIdx / Math.max(total - 1, 1)) - 0.5) * -0.6;

        // Framerate-independent interpolation
        cameraRef.current.position.x = THREE.MathUtils.lerp(cameraRef.current.position.x, leanX, delta * 4);
        cameraRef.current.position.y = THREE.MathUtils.lerp(cameraRef.current.position.y, targetY, delta * 4);
        cameraRef.current.position.z = THREE.MathUtils.lerp(cameraRef.current.position.z, targetZ, delta * 4);

        if (Math.abs(cameraRef.current.fov - targetFov) > 0.01) {
            cameraRef.current.fov = THREE.MathUtils.lerp(cameraRef.current.fov, targetFov, delta * 4);
            cameraRef.current.updateProjectionMatrix();
        }

        cameraRef.current.lookAt(0, -0.2, 0);
    });

    return (
        <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            fov={45}
            position={[0, 0, 10]}
            near={0.1}
            far={100}
        />
    );
}

// ─── Floor Ring Arc Track Geometry ────────────────────────────────────────────
// Rendered at y = -2.05 with ringGeometry [7.8, 7.82, 64] flat on horizontal floor plane.

function FloorArcTrack() {
    return (
        <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -2.05, 0]}
            renderOrder={0}
            castShadow={false}
            receiveShadow={false}
        >
            <ringGeometry args={[7.8, 7.82, 64]} />
            <meshBasicMaterial
                color="#06b6d4"
                transparent
                opacity={0.35}
                side={THREE.DoubleSide}
                depthWrite={false}
                toneMapped={false}
            />
        </mesh>
    );
}

// ─── Scene Root ───────────────────────────────────────────────────────────────

export default function Services3DScene({
    services,
    activeIdx,
    dragOffsetNorm,
    onCardClick,
}: Services3DSceneProps) {
    const total = services.length;

    return (
        <Canvas
            dpr={[1, 1.5]}
            gl={{
                antialias: true,
                alpha: true,
                powerPreference: 'high-performance',
            }}
            style={{ background: 'transparent', width: '100%', height: '100%' }}
            shadows={false}
        >
            <ResponsiveCamera activeIdx={activeIdx} total={total} />

            {/* Pure ambient lighting - soft, seamless illumination without directional shadow boundaries */}
            <ambientLight intensity={2.0} />
            <directionalLight position={[5, 10, 7]} intensity={1.2} color="#ffffff" castShadow={false} />
            <directionalLight position={[-5, 6, 4]} intensity={0.5} color="#f0f6ff" castShadow={false} />
            <directionalLight position={[0, 3, -7]} intensity={0.3} color="#d8eeff" castShadow={false} />
            <pointLight position={[0, 2.5, 3]} intensity={2.8} color="#06b6d4" distance={9} decay={2} castShadow={false} />

            {/* Floor Ring Arc Track */}
            <FloorArcTrack />

            {/* Contact Shadow Mesh */}
            <ContactShadows
                position={[0, -2.05, 0]}
                opacity={0.35}
                scale={16}
                blur={2}
                far={45}
                color="#030712"
                frames={1}
            />

            {/* 3D Coverflow Cards */}
            {services.map((service, i) => (
                <Card3DMesh
                    key={service.id}
                    service={service}
                    index={i}
                    total={total}
                    activeIdx={activeIdx}
                    dragOffsetNorm={dragOffsetNorm}
                    onClick={() => onCardClick(i)}
                />
            ))}
        </Canvas>
    );
}
