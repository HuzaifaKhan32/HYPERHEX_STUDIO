// components/Card3DMesh.tsx
'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import ServiceCard, { type ServiceCardData } from './NewServiceCard';

// ─── Discrete slot layout ─────────────────────────────────────────────────────

interface SlotConfig {
    x: number;
    y: number;
    z: number;
    rotY: number;  // Y-axis rotation in radians (positive = face inward from left)
    scale: number;
    opacity: number;
    renderOrder: number;
}

function getSlotConfig(offset: number): SlotConfig {
    const abs = Math.abs(offset);
    const sign = offset < 0 ? -1 : 1;  // -1 = left side, +1 = right side

    if (offset === 0) {
        return { x: 0, y: 0, z: 0.8, rotY: 0, scale: 1.05, opacity: 1.0, renderOrder: 30 };
    }
    if (abs === 1) {
        return { x: sign * 2.8, y: -0.15, z: 0, rotY: -sign * (Math.PI / 12), scale: 0.9, opacity: 0.85, renderOrder: 20 };
    }
    if (abs === 2) {
        return { x: sign * 5.2, y: -0.3, z: -0.8, rotY: -sign * (Math.PI / 6), scale: 0.8, opacity: 0.60, renderOrder: 10 };
    }
    // Hidden — off-screen, no pointer events
    return { x: sign * 9.0, y: -0.5, z: -2.0, rotY: -sign * (Math.PI / 4), scale: 0.5, opacity: 0.0, renderOrder: 0 };
}

// ─── Exponential decay spring ─────────────────────────────────────────────────

function expDecay(current: number, target: number, decay: number, dt: number): number {
    return target + (current - target) * Math.exp(-decay * dt);
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface Card3DMeshProps {
    service: ServiceCardData;
    index: number;
    total: number;
    activeIdx: number;
    dragOffsetNorm: number;  // fractional drag offset from gesture (range ≈ ±1)
    onClick: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Card3DMesh({
    service,
    index,
    total,
    activeIdx,
    dragOffsetNorm,
    onClick,
}: Card3DMeshProps) {
    const groupRef = useRef<THREE.Group>(null);

    // Animated spring values — stored in refs to stay off the React render cycle
    const sX = useRef<number>(0);
    const sY = useRef<number>(0);
    const sZ = useRef<number>(0);
    const sRotY = useRef<number>(0);
    const sScale = useRef<number>(1);
    const sOpacity = useRef<number>(1);

    // Raw numeric offset tracked in state for depth shadow gradient & pin marker
    const [currentOffset, setCurrentOffset] = useState<number>(index - activeIdx);
    const [isFocused, setIsFocused] = useState(index === activeIdx);

    useFrame((_, delta) => {
        if (!groupRef.current) return;

        // ── 1. Shortest-path circular offset (handles wrap-around) ───────────────
        let offset = index - (activeIdx + dragOffsetNorm);
        if (offset > total / 2) offset -= total;
        if (offset < -total / 2) offset += total;

        // ── 2. Snap to nearest integer for slot lookup, blend smoothly ───────────
        const lo = Math.floor(offset);
        const hi = Math.ceil(offset);
        const t = offset - lo;  // fractional blend factor [0,1]

        const cfgLo = getSlotConfig(lo);
        const cfgHi = getSlotConfig(hi);

        // Linear blend between the two discrete slot configs
        const blend = (a: number, b: number) => a + (b - a) * t;

        const targetX = blend(cfgLo.x, cfgHi.x);
        const targetY = blend(cfgLo.y, cfgHi.y);
        const targetZ = blend(cfgLo.z, cfgHi.z);
        const targetRotY = blend(cfgLo.rotY, cfgHi.rotY);
        const targetScale = blend(cfgLo.scale, cfgHi.scale);
        const targetOpacity = blend(cfgLo.opacity, cfgHi.opacity);

        // ── 3. Exponential-decay smoothing ────────────────────────────────────────
        const DECAY = 10;
        sX.current = expDecay(sX.current, targetX, DECAY, delta);
        sY.current = expDecay(sY.current, targetY, DECAY, delta);
        sZ.current = expDecay(sZ.current, targetZ, DECAY, delta);
        sRotY.current = expDecay(sRotY.current, targetRotY, DECAY, delta);
        sScale.current = expDecay(sScale.current, targetScale, DECAY, delta);
        sOpacity.current = expDecay(sOpacity.current, targetOpacity, DECAY, delta);

        // ── 4. Apply to Three.js group ────────────────────────────────────────────
        groupRef.current.position.set(sX.current, sY.current, sZ.current);
        groupRef.current.rotation.set(0, sRotY.current, 0);
        groupRef.current.scale.setScalar(sScale.current);

        const nearestConfig = getSlotConfig(Math.round(offset));
        groupRef.current.renderOrder = nearestConfig.renderOrder;

        // ── 5. Sync state for Html overlay ────────────────────────────────────────
        const focused = Math.abs(offset) < 0.42;
        setIsFocused((prev) => (prev !== focused ? focused : prev));
        setCurrentOffset((prev) => (Math.abs(prev - offset) > 0.05 ? offset : prev));
    });

    return (
        <group ref={groupRef}>
            {/* 3D hit plane for click navigation */}
            <mesh onClick={onClick} renderOrder={2} castShadow={false} receiveShadow={false}>
                <planeGeometry args={[2.9, 3.6]} />
                <meshBasicMaterial transparent opacity={0} depthWrite={false} side={THREE.DoubleSide} />
            </mesh>

            {/* HTML Card Container */}
            <Html
                transform
                occlude="blending"
                distanceFactor={5.5}
                zIndexRange={[1, 100]}
                style={{
                    pointerEvents: isFocused ? 'auto' : 'none',
                    userSelect: isFocused ? 'auto' : 'none',
                    opacity: sOpacity.current,
                }}
            >
                <div className="relative" style={{ isolation: 'isolate', transform: 'translateZ(0)' }}>
                    {/* Active Center Pin Indicator */}
                    {isFocused && (
                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-30">
                            <div className="w-[2px] h-6 bg-cyan-400 shadow-[0_0_8px_#06b6d4] rounded-full" />
                        </div>
                    )}

                    {/* Core Service Card Component */}
                    <ServiceCard data={service} isFocused={isFocused} />
                </div>
            </Html>
        </group>
    );
}
