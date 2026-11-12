import React from "react";
import { COLORS } from "../theme";
import { V3 } from "../lib/anim";

const Gold: React.FC<{ glow: number }> = ({ glow }) => (
  <meshStandardMaterial
    color={COLORS.gold}
    emissive={COLORS.gold}
    emissiveIntensity={glow}
    flatShading
  />
);

// Piala emas generik, tanpa logo liga
export const Trophy: React.FC<{
  position: V3;
  scale?: number;
  glow?: number;
  rotY?: number;
}> = ({ position, scale = 1, glow = 0.35, rotY = 0 }) => (
  <group position={position} scale={scale} rotation={[0, rotY, 0]}>
    <mesh position={[0, 0.15, 0]}>
      <boxGeometry args={[1.8, 0.3, 1.8]} />
      <meshStandardMaterial color="#B8902A" flatShading />
    </mesh>
    <mesh position={[0, 0.6, 0]}>
      <cylinderGeometry args={[0.7, 0.95, 0.6, 6]} />
      <Gold glow={glow} />
    </mesh>
    <mesh position={[0, 1.4, 0]}>
      <cylinderGeometry args={[0.2, 0.28, 1.0, 6]} />
      <Gold glow={glow} />
    </mesh>
    <mesh position={[0, 2.45, 0]}>
      <cylinderGeometry args={[1.0, 0.45, 1.3, 8]} />
      <Gold glow={glow} />
    </mesh>
    {[-1, 1].map((s) => (
      <mesh key={s} position={[s * 1.15, 2.5, 0]} rotation={[0, 0, s * 0.35]}>
        <boxGeometry args={[0.2, 0.9, 0.2]} />
        <Gold glow={glow} />
      </mesh>
    ))}
  </group>
);
