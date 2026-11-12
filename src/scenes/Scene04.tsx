import React from "react";
import { AbsoluteFill, Easing } from "remotion";
import { Stage } from "../components/Stage";
import { Player } from "../components/Player";
import { Pop, titleStyle } from "../components/Text2D";
import { Vignette } from "../components/Overlays";
import { useSceneTime } from "../lib/timing";
import { V3, ip, ip3 } from "../lib/anim";
import { COLORS } from "../theme";

const B: React.FC<{ p: V3; s: V3; c: string; glow?: number }> = ({
  p,
  s,
  c,
  glow = 0,
}) => (
  <mesh position={p}>
    <boxGeometry args={s} />
    <meshStandardMaterial
      color={c}
      emissive={glow > 0 ? c : "#000000"}
      emissiveIntensity={glow}
      flatShading
    />
  </mesh>
);

// Lorong ruang ganti dari kotak sederhana
const Corridor: React.FC = () => (
  <group>
    <B p={[0, -0.1, -6]} s={[12, 0.2, 44]} c="#1B2438" />
    <B p={[-6, 3.5, -6]} s={[0.4, 7, 44]} c="#26324D" />
    <B p={[6, 3.5, -6]} s={[0.4, 7, 44]} c="#26324D" />
    <B p={[0, 3.5, -28]} s={[12, 7, 0.4]} c="#26324D" />
    <B p={[0, 7, -6]} s={[12, 0.2, 44]} c="#1B2438" />
    {[8, 1, -6, -13, -20].map((z) => (
      <B
        key={z}
        p={[0, 6.85, z]}
        s={[2.6, 0.15, 0.7]}
        c={COLORS.ivory}
        glow={0.9}
      />
    ))}
    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
      <group key={i}>
        <B
          p={[-5.3, 1.8, 6 - i * 4]}
          s={[1, 3.6, 1.6]}
          c={i % 2 ? "#2E4066" : "#3A4F7C"}
        />
        <B
          p={[5.3, 1.8, 6 - i * 4]}
          s={[1, 3.6, 1.6]}
          c={i % 2 ? "#3A4F7C" : "#2E4066"}
        />
      </group>
    ))}
  </group>
);

// Papan taktik kosong di samping pelatih
const TacticsStand: React.FC = () => (
  <group position={[2.4, 0, -0.8]} rotation={[0, -0.35, 0]}>
    <B p={[-1.2, 1, 0]} s={[0.12, 2, 0.12]} c={COLORS.steel} />
    <B p={[1.2, 1, 0]} s={[0.12, 2, 0.12]} c={COLORS.steel} />
    <B p={[0, 2.5, 0]} s={[3.4, 2.4, 0.14]} c={COLORS.dark} />
    <B p={[0, 2.5, 0.08]} s={[3.1, 2.1, 0.06]} c={COLORS.ivory} />
  </group>
);

// Adegan 4: Ranieri datang, tidak ada yang percaya
export const Scene04: React.FC<{ total: number }> = ({ total }) => {
  const { frame, at } = useSceneTime(3, total);

  const nod = 0.22 * Math.max(0, Math.sin(frame / 13));
  const eye = ip3(
    frame,
    [0, total],
    [
      [0.9, 2.4, 11],
      [0.3, 1.9, 4.8],
    ],
    Easing.inOut(Easing.sin),
  );

  // bandul angka 5000 : 1 di pojok
  const sway = Math.sin(frame / 18) * 6;
  const hang = ip(frame, [at(1, 0), at(1, 0.2)], [0, 1]);

  return (
    <AbsoluteFill>
      <Stage eye={eye} target={[0, 1.7, 0]} fov={45} warm={0.1}>
        <Corridor />
        <TacticsStand />
        <Player
          position={[0, 0, 0]}
          scale={1.15}
          color="#1A1C26"
          pants="#1A1C26"
          nod={nod}
        />
        {/* siluet kecil orang-orang menggeleng di belakang */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <Player
            key={i}
            silhouette
            position={[-4 + i * 1.33, 0, -5 - (i % 2) * 1.6]}
            scale={0.9}
            slump={0.1}
            yaw={Math.sin(frame * 0.3 + i * 1.7) * 0.6}
          />
        ))}
      </Stage>
      <Vignette />

      <Pop
        at={Math.round(at(0, 0.3))}
        top={150}
        size={240}
        color={COLORS.ivory}
      >
        RANIERI
      </Pop>

      <div
        style={{
          position: "absolute",
          right: 110,
          top: 330,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transformOrigin: "50% 0",
          transform: `rotate(${sway}deg)`,
          opacity: hang,
        }}
      >
        <div style={{ width: 4, height: 110, background: COLORS.ivory }} />
        <div
          style={{
            ...titleStyle(130, COLORS.brick),
            padding: "6px 26px",
            border: `4px solid ${COLORS.brick}`,
            borderRadius: 14,
            background: "rgba(11,30,63,0.85)",
          }}
        >
          5000 : 1
        </div>
      </div>
    </AbsoluteFill>
  );
};
