import React from "react";
import { AbsoluteFill, Easing } from "remotion";
import { Stage } from "../components/Stage";
import { Stadium } from "../components/Stadium";
import { Tower, leicY } from "../components/Tower";
import { Pop, textStyle } from "../components/Text2D";
import { GlitchBars, TierRail, Vignette } from "../components/Overlays";
import { useSceneTime } from "../lib/timing";
import { V3, easeInOut, ip, mixColor } from "../lib/anim";
import { COLORS } from "../theme";
import { random } from "remotion";

const FLOOR = 22.95; // peringkat "di bawah tabel" tempat balok mendarat di kasta ketiga

// Adegan 2: sejarah. Tahap 1 (kalimat 1 sampai 3) lalu tahap 2 (kalimat 4 dan 5)
export const Scene02: React.FC<{ total: number }> = ({ total }) => {
  const { frame, at } = useSceneTime(1, total);

  const grow = ip(frame, [0, at(1, 0.6)], [0, 1]);
  const towerOn = frame >= at(1, 0.15);

  // titik waktu penting
  const a1 = at(1, 0.25);
  const a2 = at(1, 0.5);
  const a3 = at(1, 0.8);
  const f1 = Math.round(at(2, 0.4)); // jatuh pertama (2008)
  const land1 = f1 + 34;
  const r1 = Math.round(at(3, 0.1)); // diputar ulang
  const f2 = Math.round(at(4, 0.1)); // jatuh kedua (2026/27), lebih lambat dan berat
  const land2 = f2 + 70;

  let rho = 13;
  if (frame >= a1) rho = ip(frame, [a1, a2], [13, 10], easeInOut);
  if (frame >= a2) rho = ip(frame, [a2, a3], [10, 14], easeInOut);
  if (frame >= a3) rho = ip(frame, [a3, f1], [14, 12], easeInOut);
  if (frame >= f1)
    rho = ip(frame, [f1, land1], [12, FLOOR], Easing.in(Easing.quad));
  if (frame >= r1) rho = 12;
  if (frame >= f2)
    rho = ip(frame, [f2, land2], [12, FLOOR], Easing.in(Easing.cubic));

  const bounce = (f: number, h: number) =>
    frame >= f && frame < f + 14
      ? Math.sin(((frame - f) / 14) * Math.PI) * h
      : 0;
  const hop = bounce(land1, 0.9) + bounce(land2, 0.6);

  // glitch tipis saat kejadian diputar ulang
  const g0 = Math.round(at(3, 0));
  const glitching = frame >= g0 && frame <= g0 + 14;
  const jx = glitching ? (random(`jit${frame}`) - 0.5) * 1.2 : 0;

  // orbit pelan, lalu tilt turun mengikuti balok yang jatuh
  const ang = ip(frame, [0, total], [-0.5, 1.5]);
  const lead = leicY(rho) + 6;
  const ty = 14 + 0.6 * (Math.min(lead, 14) - 14);
  const eye: V3 = [
    40 * Math.sin(ang),
    15 + 0.35 * (ty - 14),
    40 * Math.cos(ang),
  ];

  // garis waktu di bawah
  const prog = ip(frame, [0, at(2, 0.4), at(4, 0.1), total], [0, 0.867, 1, 1]);
  const markerStyle = (left: string): React.CSSProperties => ({
    position: "absolute",
    left,
    top: 18,
    transform: "translateX(-50%)",
    ...textStyle(30, COLORS.ivory),
  });

  return (
    <AbsoluteFill>
      <Stage eye={eye} target={[0, ty, 0]} fov={50} warm={0.05}>
        <Stadium old grow={grow} lights={0.2} />
        {towerOn && (
          <Tower
            rho={rho}
            hop={hop}
            position={[jx, 6, 0]}
            lowerTier
            zone={false}
          />
        )}
      </Stage>
      <Vignette />

      {/* tahap 1 */}
      <Pop
        at={0}
        until={Math.round(at(2, 0))}
        top={140}
        size={230}
        color={COLORS.gold}
      >
        1884
      </Pop>
      <Pop
        at={Math.round(at(1, 0.05))}
        until={Math.round(at(2, 0))}
        top={400}
        size={66}
        color={COLORS.ivory}
      >
        BELUM PERNAH JUARA LIGA TERATAS
      </Pop>
      <Pop
        at={Math.round(at(2, 0))}
        until={Math.round(at(3, 0))}
        top={140}
        size={230}
        color={ivoryOr(frame, f1)}
      >
        2008
      </Pop>
      <Pop
        at={land1 - 6}
        until={Math.round(at(3, 0))}
        top={400}
        size={100}
        color={COLORS.brick}
      >
        KASTA KETIGA
      </Pop>

      {/* tahap 2: dua tahun berdampingan agar paralelnya terasa */}
      <Pop at={Math.round(at(3, 0.05))} top={140} size={170}>
        <span style={{ color: mixColor(COLORS.ivory, COLORS.navy, 0.4) }}>
          2008
        </span>
        <span style={{ color: COLORS.brick, margin: "0 28px" }}>=</span>
        <span style={{ color: COLORS.gold }}>2026/27</span>
      </Pop>
      <Pop at={land2 - 8} top={400} size={100} color={COLORS.brick}>
        KASTA KETIGA LAGI
      </Pop>

      {towerOn && <TierRail rho={rho} />}

      {/* garis waktu tipis */}
      <div
        style={{
          position: "absolute",
          left: 90,
          right: 90,
          bottom: 560,
          height: 6,
          background: "rgba(244,241,232,0.25)",
        }}
      >
        <div
          style={{
            width: `${prog * 100}%`,
            height: "100%",
            background: COLORS.gold,
          }}
        />
        <div style={markerStyle("0%")}>1884</div>
        <div style={markerStyle("86.7%")}>2008</div>
        <div style={markerStyle("100%")}>2026/27</div>
      </div>

      <GlitchBars start={g0} len={14} />
    </AbsoluteFill>
  );
};

// "2008" berubah merah bata saat balok jatuh
const ivoryOr = (frame: number, fall: number) =>
  frame >= fall ? COLORS.brick : COLORS.ivory;
