import React from "react";
import { COLORS } from "../theme";
import { V3 } from "../lib/anim";

export const Ball: React.FC<{
  position: V3;
  spin?: number;
  scale?: number;
}> = ({ position, spin = 0, scale = 1 }) => (
  <group position={position} rotation={[spin, spin * 0.6, 0]} scale={scale}>
    <mesh>
      <icosahedronGeometry args={[0.4, 1]} />
      <meshStandardMaterial color={COLORS.ivory} flatShading />
    </mesh>
    <mesh>
      <icosahedronGeometry args={[0.41, 1]} />
      <meshBasicMaterial color="#1B2233" wireframe />
    </mesh>
  </group>
);
