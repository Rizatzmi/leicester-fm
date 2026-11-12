import React from "react";
import { AbsoluteFill, random } from "remotion";
import { Stage } from "../components/Stage";
import { Player } from "../components/Player";
import { Pop, textStyle } from "../components/Text2D";
import { Vignette } from "../components/Overlays";
import { useSceneTime } from "../lib/timing";
import { V3, easeOut, ip } from "../lib/anim";
import { COLORS } from "../theme";

const XS = [-4, 0, 4];
const NUMBERS = ["9", "10", "4"];
const NAMES = [
  { name: "VARDY", label: "DARI KASTA BAWAH INGGRIS" },
  { name: "MAHREZ", label: "DARI KASTA KEDUA PRANCIS" },
  { name: "KANTE", label: "DARI CAEN" },
];

// Lapangan berpetak
const GrassPatch: React.FC = () => (
  <group>
    <mesh position={[0, -0.2, 0]}>
      <boxGeometry args={[44, 0.4, 34]} />
      <meshStandardMaterial color={COLORS.grass} flatShading />
    </mesh>
    {[0, 2, 4].map((i) => (
      <mesh key={i} position={[0, 0.03, -17 + (i + 0.5) * (34 / 5)]}>
        <boxGeometry args={[44, 0.06, 34 / 5]} />
        <meshStandardMaterial color={COLORS.grassLight} flatShading />
      </mesh>
    ))}
  </group>
);

// Siluet kota asal, hanya kotak gelap tanpa logo
const Skyline: React.FC<{ x: number; seed: string }> = ({ x, seed }) => (
  <group position={[x, 0, -4.5]}>
    {[0, 1, 2, 3, 4].map((i) => {
      const h = 2.5 + random(`${seed}${i}`) * 3.5;
      return (
        <mesh key={i} position={[(i - 2) * 1.3, h / 2, 0]}>
          <boxGeometry args={[1.15, h, 0.4]} />
          <meshStandardMaterial
            color="#12203F"
            emissive="#1B3366"
            emissiveIntensity={0.3}
            flatShading
          />
        </mesh>
      );
    })}
  </group>
);

// Adegan 5: Vardy, Mahrez, Kante melangkah maju saat namanya disebut
export const Scene05: React.FC<{ total: number }> = ({ total }) => {
  const { frame, at } = useSceneTime(4, total);

  const times = [
    Math.round(at(1, 0.05)),
    Math.round(at(1, 0.55)),
    Math.round(at(2, 0.1)),
  ];

  let shot = -1;
  if (frame >= times[0]) shot = 0;
  if (frame >= times[1]) shot = 1;
  if (frame >= times[2]) shot = 2;

  // bahu: sebelum disebut, pemain sedikit menunduk
  let eye: V3 = [0, 3.2, ip(frame, [0, times[0]], [14, 12])];
  let target: V3 = [0, 1.4, 0];
  let fov = 45;
  if (shot >= 0) {
    const px = XS[shot];
    const push = ip(frame, [times[shot], times[shot] + 45], [0, 0.9]);
    eye = [px + 1.1, 1.8, 1.6 + 4.6 - push];
    target = [px, 1.55, 1.6];
    fov = 42;
  }

  return (
    <AbsoluteFill>
      <Stage eye={eye} target={target} fov={fov} warm={0.4}>
        <GrassPatch />
        {XS.map((x, j) => {
          const t = times[j];
          const step = ip(frame, [t, t + 10], [0, 1], easeOut) * 1.6;
          const moving =
            frame > t && frame < t + 10 ? Math.sin(frame * 1.2) : 0;
          return (
            <group key={j}>
              <Skyline x={x} seed={`sky${j}`} />
              <Player
                position={[x, 0, step]}
                scale={1.25}
                number={NUMBERS[j]}
                swing={moving}
                slump={frame < t ? 0.25 : 0}
              />
            </group>
          );
        })}
      </Stage>
      <Vignette />

      {NAMES.map((n, j) => (
        <Pop
          key={n.name}
          at={times[j]}
          until={j < 2 ? times[j + 1] : undefined}
          top={1130}
          size={200}
          color={COLORS.ivory}
        >
          {n.name}
          <div style={{ ...textStyle(44, COLORS.gold), marginTop: 8 }}>
            {n.label}
          </div>
        </Pop>
      ))}
    </AbsoluteFill>
  );
};
