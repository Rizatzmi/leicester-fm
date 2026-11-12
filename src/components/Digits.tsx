import React from "react";
import { COLORS } from "../theme";

// Angka gaya 7-segmen dari kotak sederhana (tanpa font 3D)
const SEG: Record<string, string> = {
  "0": "abcdef",
  "1": "bc",
  "2": "abdeg",
  "3": "abcdg",
  "4": "bcfg",
  "5": "acdfg",
  "6": "acdefg",
  "7": "abc",
  "8": "abcdefg",
  "9": "abcdfg",
};
const W = 1.5;
const H = 2.8;
const T = 0.32;
const HV = H / 2 - T;

const DEFS: Record<string, [number, number, number, number]> = {
  a: [0, H / 2 - T / 2, W - T, T],
  g: [0, 0, W - T, T],
  d: [0, -H / 2 + T / 2, W - T, T],
  f: [-W / 2 + T / 2, H / 4, T, HV],
  b: [W / 2 - T / 2, H / 4, T, HV],
  e: [-W / 2 + T / 2, -H / 4, T, HV],
  c: [W / 2 - T / 2, -H / 4, T, HV],
};

const Box: React.FC<{
  p: [number, number];
  s: [number, number];
  color: string;
  glow: number;
}> = ({ p, s, color, glow }) => (
  <mesh position={[p[0], p[1], 0]}>
    <boxGeometry args={[s[0], s[1], T]} />
    <meshStandardMaterial
      color={color}
      emissive={color}
      emissiveIntensity={glow}
      flatShading
    />
  </mesh>
);

const advance = (c: string) => (c === ":" || c === " " ? 1.0 : 2.1);

type DigitsProps = { text: string; color?: string; glow?: number };

export const Digits: React.FC<DigitsProps> = ({
  text,
  color = COLORS.gold,
  glow = 1,
}) => {
  const chars = text.split("");
  const total = chars.reduce((s, c) => s + advance(c), 0);
  let cursor = 0;
  return (
    <group position={[-total / 2, 0, 0]}>
      {chars.map((c, i) => {
        const x = cursor + advance(c) / 2;
        cursor += advance(c);
        if (c === ":") {
          return (
            <group key={i} position={[x, 0, 0]}>
              <Box p={[0, 0.6]} s={[0.36, 0.36]} color={color} glow={glow} />
              <Box p={[0, -0.6]} s={[0.36, 0.36]} color={color} glow={glow} />
            </group>
          );
        }
        const on = SEG[c] ?? "";
        return (
          <group key={i} position={[x, 0, 0]}>
            {on.split("").map((k) => (
              <Box
                key={k}
                p={[DEFS[k][0], DEFS[k][1]]}
                s={[DEFS[k][2], DEFS[k][3]]}
                color={color}
                glow={glow}
              />
            ))}
          </group>
        );
      })}
    </group>
  );
};
