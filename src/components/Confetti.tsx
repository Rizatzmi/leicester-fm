import React from "react";
import { random, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../theme";
import { V3, clamp01 } from "../lib/anim";

const PALETTE = [COLORS.gold, COLORS.ivory, COLORS.royal, COLORS.brick];
const GRAVITY = 14;

type Props = {
  start: number; // frame ledakan (boleh negatif agar sudah jatuh sejak awal adegan)
  origin: V3;
  count?: number;
  life?: number; // detik sebelum konfeti mengecil dan hilang
};

// Konfeti low-poly: posisi dihitung dari waktu sejak ledakan, tanpa simulasi
export const Confetti: React.FC<Props> = ({
  start,
  origin,
  count = 70,
  life = 4,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = (frame - start) / fps;
  if (t < 0) return null;
  return (
    <group>
      {Array.from({ length: count }, (_, i) => {
        const vx = (random(`cx${i}`) - 0.5) * 14;
        const vy = 8 + random(`cy${i}`) * 10;
        const vz = (random(`cz${i}`) - 0.5) * 14;
        const x = origin[0] + vx * t;
        const z = origin[2] + vz * t;
        const y = Math.max(0.15, origin[1] + vy * t - 0.5 * GRAVITY * t * t);
        const fade = 1 - clamp01((t - (life - 1)) / 1);
        if (fade <= 0) return null;
        const s = 0.28 * fade;
        return (
          <mesh
            key={i}
            position={[x, y, z]}
            rotation={[
              t * (2 + random(`rx${i}`) * 4),
              t * (2 + random(`ry${i}`) * 4),
              0,
            ]}
          >
            <boxGeometry args={[s, s, 0.05]} />
            <meshStandardMaterial
              color={PALETTE[i % PALETTE.length]}
              emissive={PALETTE[i % PALETTE.length]}
              emissiveIntensity={0.4}
              flatShading
            />
          </mesh>
        );
      })}
    </group>
  );
};
