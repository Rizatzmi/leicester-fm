import React from "react";
import { AbsoluteFill } from "remotion";
import { Stage } from "../components/Stage";
import { Stadium } from "../components/Stadium";
import { Player } from "../components/Player";
import { Ball } from "../components/Ball";
import { Pop } from "../components/Text2D";
import { Vignette } from "../components/Overlays";
import { useSceneTime } from "../lib/timing";
import { V3, easeIn, easeInOut, easeOut, ip, lerp } from "../lib/anim";
import { COLORS } from "../theme";

type P2 = [number, number]; // x, z

const BLUE_LOOSE: P2[] = [
  [0, 21],
  [-9, 15],
  [-3, 15],
  [3, 15],
  [9, 15],
  [-9, 8],
  [-3, 8],
  [3, 8],
  [9, 8],
  [-3, 1],
  [3, 1],
];
const BLUE_TIGHT: P2[] = [
  [0, 21],
  [-5, 16.5],
  [-1.7, 16.5],
  [1.7, 16.5],
  [5, 16.5],
  [-5, 12.5],
  [-1.7, 12.5],
  [1.7, 12.5],
  [5, 12.5],
  [-2, 9],
  [2, 9],
];
const OPP_START: P2[] = [
  [0, -21],
  [-9, -14],
  [-3, -14],
  [3, -14],
  [9, -14],
  [-6, -8],
  [0, -8],
  [6, -8],
  [-8, -2],
  [0, -3],
  [8, -2],
];

const mix = (a: P2, b: P2, t: number): P2 => [
  lerp(a[0], b[0], t),
  lerp(a[1], b[1], t),
];

// Adegan 6: bertahan rapat lalu serang balik
export const Scene06: React.FC<{ total: number }> = ({ total }) => {
  const { frame, at } = useSceneTime(5, total);

  const tTight = ip(frame, [at(1, 0), at(1, 0.35)], [0, 1], easeInOut);
  const tPush = ip(frame, [at(0, 0.3), at(1, 0.5)], [0, 1]);
  const kick = Math.round(at(1, 0.55));
  const tAttack = ip(frame, [kick, at(2, 0.3)], [0, 1], easeIn);
  const slump = ip(frame, [at(2, 0), at(2, 0.6)], [0, 0.9]);

  const blue = BLUE_LOOSE.map((p, i) => {
    const base = mix(p, BLUE_TIGHT[i], tTight);
    // pemain luar kiper maju ke depan saat serangan balik
    const z = i === 0 ? base[1] : base[1] - 14 * tAttack;
    return [base[0], z] as P2;
  });
  const opp = OPP_START.map(
    (p, i) => [p[0], i === 0 ? p[1] : p[1] + 12 * tPush] as P2,
  );

  const moving =
    (tTight > 0 && tTight < 1) || (tAttack > 0 && tAttack < 1)
      ? Math.sin(frame * 0.9)
      : 0;

  // bola melesat ke depan
  const bz = ip(frame, [kick, kick + 28], [12.5, -20], easeOut);
  const bx = ip(frame, [kick, kick + 28], [-1.7, 0.5]);
  const bounce =
    frame >= kick ? Math.abs(Math.sin((frame - kick) * 0.45)) * 0.9 : 0;
  const ballPos: V3 = [
    frame >= kick ? bx : -1.7,
    0.4 + bounce,
    frame >= kick ? bz : 12.5,
  ];

  // panah emas mengikuti bola
  const arrowLen = Math.max(0, 12.5 - bz);

  // kamera: top-down statis, lalu follow cepat
  const f = ip(frame, [kick - 6, kick + 10], [0, 1], easeInOut);
  const eye: V3 = [0, lerp(50, 34, f), lerp(5, bz + 8, f)];
  const target: V3 = [0, 0, lerp(0, bz - 3, f)];

  // papan taktik kecil di pojok
  const d = ip(frame, [at(1, 0), at(1, 0.3)], [0, 1]);
  const a = ip(frame, [at(1, 0.5), at(1, 0.8)], [0, 1]);

  return (
    <AbsoluteFill>
      <Stage eye={eye} target={target} fov={50} warm={0.55}>
        <Stadium lights={0.7} />
        {blue.map((p, i) => (
          <Player
            key={`b${i}`}
            position={[p[0], 0, p[1]]}
            rotY={Math.PI}
            scale={2}
            swing={moving}
            number={String(i + 1)}
          />
        ))}
        {opp.map((p, i) => (
          <Player
            key={`o${i}`}
            position={[p[0], 0, p[1]]}
            scale={2}
            color={COLORS.neutral}
            pants="#5B6275"
            swing={frame < kick ? moving : 0}
            slump={slump}
          />
        ))}
        <Ball position={ballPos} spin={frame * 0.3} scale={1.6} />
        {arrowLen > 0.5 && (
          <group position={[bx, 0.35, 0]}>
            <mesh position={[0, 0, 12.5 - arrowLen / 2]}>
              <boxGeometry args={[0.5, 0.15, arrowLen]} />
              <meshStandardMaterial
                color={COLORS.gold}
                emissive={COLORS.gold}
                emissiveIntensity={0.8}
                flatShading
              />
            </mesh>
            <mesh position={[0, 0, bz - 0.9]} rotation={[-Math.PI / 2, 0, 0]}>
              <coneGeometry args={[0.9, 1.8, 4]} />
              <meshStandardMaterial
                color={COLORS.gold}
                emissive={COLORS.gold}
                emissiveIntensity={0.8}
                flatShading
              />
            </mesh>
          </group>
        )}
      </Stage>
      <Vignette />

      <Pop
        at={Math.round(at(1, 0))}
        until={kick}
        top={150}
        size={190}
        color={COLORS.ivory}
      >
        BERTAHAN RAPAT
      </Pop>
      <Pop at={kick} top={150} size={200} color={COLORS.gold}>
        SERANG BALIK
      </Pop>

      <svg
        width={240}
        height={340}
        viewBox="0 0 240 340"
        style={{
          position: "absolute",
          right: 50,
          top: 420,
          opacity: ip(frame, [at(1, 0), at(1, 0.1)], [0, 1]),
        }}
      >
        <rect
          x="2"
          y="2"
          width="236"
          height="336"
          rx="14"
          fill="rgba(11,30,63,0.75)"
          stroke={COLORS.ivory}
          strokeWidth="3"
        />
        <line
          x1="2"
          y1="170"
          x2="238"
          y2="170"
          stroke={COLORS.ivory}
          strokeWidth="2"
          opacity="0.3"
        />
        <line
          x1="30"
          y1="250"
          x2="210"
          y2="250"
          stroke={COLORS.ivory}
          strokeWidth="8"
          strokeDasharray={`${180 * d} 180`}
        />
        <path
          d="M120 250 L120 60"
          stroke={COLORS.gold}
          strokeWidth="8"
          fill="none"
          strokeDasharray={`${190 * a} 190`}
        />
        <polygon points="120,30 102,66 138,66" fill={COLORS.gold} opacity={a} />
      </svg>
    </AbsoluteFill>
  );
};
