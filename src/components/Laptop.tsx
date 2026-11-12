import React from "react";
import { COLORS } from "../theme";
import { V3, clamp01 } from "../lib/anim";
import { Ball } from "./Ball";

// Letak laptop di luar stadion, layar menghadap +z
export const LAPTOP_POS: V3 = [7, 0, 52];

// Titik tengah layar laptop di dunia 3D (dipakai sebagai target kamera)
export const SCREEN_CENTER: V3 = [7, 4.3, 47.7];

// Susunan 4-3-3 pada papan taktik (x, y dalam satuan papan)
const FORMATION: [number, number][] = [
  [-4.6, 0],
  [-3.1, -2.4],
  [-3.1, -0.8],
  [-3.1, 0.8],
  [-3.1, 2.4],
  [-0.4, -1.8],
  [-0.4, 0],
  [-0.4, 1.8],
  [2.6, -2.2],
  [2.6, 0],
  [2.6, 2.2],
];

const Bar: React.FC<{
  p: [number, number];
  s: [number, number];
  glow: number;
}> = ({ p, s, glow }) => (
  <mesh position={[p[0], p[1], 0.04]}>
    <boxGeometry args={[s[0], s[1], 0.04]} />
    <meshStandardMaterial
      color={COLORS.ivory}
      emissive={COLORS.ivory}
      emissiveIntensity={0.5 * glow}
      flatShading
    />
  </mesh>
);

// Papan taktik buatan sendiri (bukan tampilan Football Manager)
const TacticsBoard: React.FC<{ on: number; dots: number }> = ({ on, dots }) => (
  <group>
    <mesh>
      <boxGeometry args={[10.6, 6.4, 0.06]} />
      <meshStandardMaterial
        color={COLORS.grassDark}
        emissive={COLORS.grassDark}
        emissiveIntensity={0.8 * on}
        flatShading
      />
    </mesh>
    {/* garis tepi dan tengah */}
    <Bar p={[0, 3.05]} s={[10.2, 0.08]} glow={on} />
    <Bar p={[0, -3.05]} s={[10.2, 0.08]} glow={on} />
    <Bar p={[-5.05, 0]} s={[0.08, 6.1]} glow={on} />
    <Bar p={[5.05, 0]} s={[0.08, 6.1]} glow={on} />
    <Bar p={[0, 0]} s={[0.08, 6.1]} glow={on} />
    {/* kotak penalti */}
    {[-1, 1].map((s) => (
      <group key={s}>
        <Bar p={[s * 4.05, 1.8]} s={[2, 0.08]} glow={on} />
        <Bar p={[s * 4.05, -1.8]} s={[2, 0.08]} glow={on} />
        <Bar p={[s * 3.05, 0]} s={[0.08, 3.6]} glow={on} />
      </group>
    ))}
    <mesh position={[0, 0, 0.05]}>
      <ringGeometry args={[0.9, 1.0, 12]} />
      <meshStandardMaterial
        color={COLORS.ivory}
        emissive={COLORS.ivory}
        emissiveIntensity={0.5 * on}
      />
    </mesh>
    {/* titik formasi biru menyala satu per satu */}
    {FORMATION.map(([x, y], i) => {
      const s = clamp01(dots - i);
      return (
        <mesh
          key={i}
          position={[x, y, 0.12]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[s, s, s]}
          visible={s > 0}
        >
          <cylinderGeometry args={[0.32, 0.32, 0.12, 8]} />
          <meshStandardMaterial
            color={COLORS.royal}
            emissive={COLORS.royal}
            emissiveIntensity={0.9}
            flatShading
          />
        </mesh>
      );
    })}
  </group>
);

type LaptopProps = {
  on?: number; // 0 layar padam, 1 menyala
  dots?: number; // jumlah titik formasi yang sudah menyala (0 sampai 11)
  ballLift?: number; // 0 sampai 1, bola melambung dari layar
};

export const Laptop: React.FC<LaptopProps> = ({
  on = 1,
  dots = 0,
  ballLift = 0,
}) => (
  <group position={LAPTOP_POS}>
    {/* alas dan keyboard */}
    <mesh position={[0, 0.25, 0]}>
      <boxGeometry args={[12, 0.5, 8]} />
      <meshStandardMaterial color="#5A6783" flatShading />
    </mesh>
    <mesh position={[0, 0.56, 0.8]}>
      <boxGeometry args={[10.6, 0.12, 4.6]} />
      <meshStandardMaterial color={COLORS.dark} flatShading />
    </mesh>
    <mesh position={[0, 0.56, 3.1]}>
      <boxGeometry args={[3.2, 0.1, 1.6]} />
      <meshStandardMaterial color="#3A4560" flatShading />
    </mesh>

    {/* layar miring sedikit ke belakang */}
    <group position={[0, 0.5, -3.8]} rotation={[-0.22, 0, 0]}>
      <mesh position={[0, 3.8, 0]}>
        <boxGeometry args={[12, 7.6, 0.35]} />
        <meshStandardMaterial color="#5A6783" flatShading />
      </mesh>
      <mesh position={[0, 3.8, 0.2]}>
        <boxGeometry args={[11.2, 6.9, 0.1]} />
        <meshStandardMaterial
          color={COLORS.navyDeep}
          emissive={COLORS.navy}
          emissiveIntensity={0.9 * on}
          flatShading
        />
      </mesh>
      <group position={[0, 3.8, 0.3]}>
        {on > 0.02 && <TacticsBoard on={on} dots={dots} />}
        {ballLift > 0 && (
          <Ball
            position={[1.2, -0.5 + ballLift * 4, 0.6 + ballLift * 6]}
            spin={ballLift * 9}
            scale={0.9}
          />
        )}
      </group>
    </group>
  </group>
);
