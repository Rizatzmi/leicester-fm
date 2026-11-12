import React from "react";
import { AbsoluteFill, random, useCurrentFrame } from "remotion";
import { COLORS } from "../theme";
import { FONT_TEXT, FONT_TITLE } from "../fonts";
import { clamp01, ip } from "../lib/anim";

export const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{
      pointerEvents: "none",
      background:
        "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(5,10,25,0.65) 100%)",
    }}
  />
);

// Garis merah bata berkedip di tepi layar (kesan bahaya)
export const DangerEdge: React.FC<{ strength?: number }> = ({
  strength = 1,
}) => {
  const frame = useCurrentFrame();
  const pulse = 0.5 + 0.5 * Math.sin(frame * 0.45);
  const a = (0.25 + 0.4 * pulse) * strength;
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        boxShadow: `inset 0 0 70px 12px rgba(217,79,61,${a})`,
        border: `3px solid rgba(217,79,61,${a + 0.2})`,
      }}
    />
  );
};

// Garis-garis glitch tipis selama jendela frame tertentu
export const GlitchBars: React.FC<{ start: number; len: number }> = ({
  start,
  len,
}) => {
  const frame = useCurrentFrame();
  if (frame < start || frame > start + len) return null;
  const colors = [COLORS.brick, COLORS.ivory, COLORS.royal];
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: random(`gy${frame}-${i}`) * 1800,
            height: 6 + random(`gh${frame}-${i}`) * 26,
            background: colors[i % 3],
            opacity: 0.22,
            transform: `translateX(${(random(`gx${frame}-${i}`) - 0.5) * 60}px)`,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

// Rel kecil di sisi kiri: tiga kasta, penanda bergerak mengikuti posisi balok Leicester
export const TierRail: React.FC<{ rho: number }> = ({ rho }) => {
  const tier = clamp01((rho - 20) / 2.9) * 2; // 0 = kasta 1, 2 = kasta 3
  const labels = ["KASTA 1", "KASTA 2", "KASTA 3"];
  const slot = 150;
  const markerY = ip(tier, [0, 2], [0, slot * 2]);
  const hot = tier > 1.5;
  return (
    <div style={{ position: "absolute", left: 40, top: 560, width: 190 }}>
      {labels.map((t, i) => (
        <div
          key={t}
          style={{
            height: slot - 14,
            marginBottom: 14,
            borderRadius: 14,
            border: `3px solid ${i === 2 && hot ? COLORS.brick : COLORS.ivory}`,
            background: "rgba(7,20,43,0.65)",
            color: i === 2 && hot ? COLORS.brick : COLORS.ivory,
            fontFamily: FONT_TITLE,
            fontSize: 44,
            letterSpacing: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {t}
        </div>
      ))}
      <div
        style={{
          position: "absolute",
          left: 198,
          top: markerY + 38,
          width: 0,
          height: 0,
          borderTop: "22px solid transparent",
          borderBottom: "22px solid transparent",
          borderRight: `34px solid ${COLORS.royal}`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          top: -50,
          fontFamily: FONT_TEXT,
          fontWeight: 700,
          fontSize: 28,
          color: COLORS.ivory,
        }}
      >
        LEICESTER
      </div>
    </div>
  );
};
