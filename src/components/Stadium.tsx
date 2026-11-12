import React from "react";
import { COLORS } from "../theme";
import { V3, clamp01, easeOut, mixColor } from "../lib/anim";

type Block = { p: V3; s: V3; c: string };

const standColor = (old: boolean, k: number) =>
  old
    ? ["#6E5C49", "#7D6A55", "#8C7961"][k]
    : ["#2B3A57", "#34466A", "#3E5380"][k];

// Tribun tiga tingkat di empat sisi lapangan
const buildBlocks = (old: boolean): Block[] => {
  const out: Block[] = [];
  const steps = [0, 1, 2];
  steps.forEach((k) => {
    const h = 1.6 * (k + 1);
    const c = standColor(old, k);
    const edge = 16.5 + 3 * k;
    out.push({ p: [-edge, h / 2, 0], s: [3, h, 52], c });
    out.push({ p: [edge, h / 2, 0], s: [3, h, 52], c });
    out.push({ p: [0, h / 2, -(26.5 + 3 * k)], s: [2 * edge + 3, h, 3], c });
    out.push({ p: [0, h / 2, 26.5 + 3 * k], s: [2 * edge + 3, h, 3], c });
  });
  return out;
};

const TOWERS: [number, number][] = [
  [-25, -33],
  [25, -33],
  [-25, 33],
  [25, 33],
];

const LightTower: React.FC<{
  x: number;
  z: number;
  glow: number;
  warm: string;
}> = ({ x, z, glow, warm }) => {
  const rotY = Math.atan2(-x, -z);
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 8, 0]}>
        <boxGeometry args={[0.7, 16, 0.7]} />
        <meshStandardMaterial color={COLORS.steel} flatShading />
      </mesh>
      <group position={[0, 17, 0]} rotation={[0.25, rotY, 0]}>
        <mesh>
          <boxGeometry args={[5.4, 3.4, 0.4]} />
          <meshStandardMaterial color={COLORS.dark} flatShading />
        </mesh>
        {[-1.7, 0, 1.7].map((px) =>
          [0.8, -0.8].map((py) => (
            <mesh key={`${px}${py}`} position={[px, py, 0.3]}>
              <boxGeometry args={[1.3, 1.2, 0.3]} />
              <meshStandardMaterial
                color={warm}
                emissive={warm}
                emissiveIntensity={0.1 + 1.7 * glow}
                flatShading
              />
            </mesh>
          )),
        )}
      </group>
    </group>
  );
};

type StadiumProps = {
  old?: boolean; // versi kuno dari balok sederhana
  grow?: number; // 0 sampai 1, tribun tumbuh dari tanah balok demi balok
  lights?: number; // 0 sampai 1, terang lampu sorot
};

export const Stadium: React.FC<StadiumProps> = ({
  old = false,
  grow = 1,
  lights = 0.4,
}) => {
  const blocks = buildBlocks(old);
  const n = blocks.length;
  const pitchA = old ? "#4F7A4A" : COLORS.grass;
  const pitchB = old ? "#5A8554" : COLORS.grassLight;
  const warmLight = mixColor(COLORS.ivory, "#FFE2A8", lights);
  return (
    <group>
      {/* tanah di sekeliling */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.45, 0]}>
        <planeGeometry args={[600, 600]} />
        <meshStandardMaterial color={COLORS.navyDeep} />
      </mesh>

      {/* lapangan berpetak */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[30, 0.4, 46]} />
        <meshStandardMaterial color={pitchA} flatShading />
      </mesh>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) =>
        i % 2 === 0 ? (
          <mesh key={i} position={[0, 0.03, -23 + (i + 0.5) * (46 / 8)]}>
            <boxGeometry args={[30, 0.06, 46 / 8]} />
            <meshStandardMaterial color={pitchB} flatShading />
          </mesh>
        ) : null,
      )}

      {/* garis lapangan */}
      <mesh position={[0, 0.08, 0]}>
        <boxGeometry args={[30, 0.04, 0.2]} />
        <meshStandardMaterial color={COLORS.ivory} flatShading />
      </mesh>
      {[-15, 15].map((x) => (
        <mesh key={x} position={[x, 0.08, 0]}>
          <boxGeometry args={[0.2, 0.04, 46]} />
          <meshStandardMaterial color={COLORS.ivory} flatShading />
        </mesh>
      ))}
      {[-23, 23].map((z) => (
        <mesh key={z} position={[0, 0.08, z]}>
          <boxGeometry args={[30, 0.04, 0.2]} />
          <meshStandardMaterial color={COLORS.ivory} flatShading />
        </mesh>
      ))}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
        <ringGeometry args={[3.6, 3.85, 16]} />
        <meshStandardMaterial color={COLORS.ivory} flatShading />
      </mesh>

      {/* tribun */}
      {blocks.map((b, i) => {
        const start = (i / n) * 0.7;
        const local = easeOut(clamp01((grow - start) / 0.3));
        return (
          <group
            key={i}
            position={[b.p[0], 0, b.p[2]]}
            scale={[1, Math.max(local, 0.001), 1]}
          >
            <mesh position={[0, b.s[1] / 2, 0]} visible={local > 0}>
              <boxGeometry args={b.s} />
              <meshStandardMaterial color={b.c} flatShading />
            </mesh>
          </group>
        );
      })}

      {/* lampu sorot kotak-kotak */}
      {!old &&
        TOWERS.map(([x, z]) => (
          <LightTower
            key={`${x}${z}`}
            x={x}
            z={z}
            glow={lights}
            warm={warmLight}
          />
        ))}
    </group>
  );
};
