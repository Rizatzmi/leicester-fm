import React from "react";
import { COLORS } from "../theme";
import { V3 } from "../lib/anim";
import { Digits } from "./Digits";

type Props = {
  text: string; // contoh: '5000:1'
  glow?: number; // 0 padam, 1 menyala penuh
  shake?: number; // getaran ke samping
  position?: V3;
};

// Papan skor besar di atas stadion
export const Scoreboard: React.FC<Props> = ({
  text,
  glow = 1,
  shake = 0,
  position = [0, 13, -36],
}) => (
  <group position={[position[0] + shake, position[1], position[2]]}>
    {[-5, 5].map((x) => (
      <mesh key={x} position={[x, -6.5, -0.2]}>
        <boxGeometry args={[0.9, 13, 0.9]} />
        <meshStandardMaterial color={COLORS.steel} flatShading />
      </mesh>
    ))}
    <mesh>
      <boxGeometry args={[14.4, 6.8, 0.8]} />
      <meshStandardMaterial color={COLORS.steel} flatShading />
    </mesh>
    <mesh position={[0, 0, 0.45]}>
      <boxGeometry args={[13.4, 5.8, 0.2]} />
      <meshStandardMaterial
        color={COLORS.navyDeep}
        emissive={COLORS.navy}
        emissiveIntensity={0.4 * glow}
        flatShading
      />
    </mesh>
    <group position={[0, 0, 0.7]}>
      <Digits text={text} color={COLORS.gold} glow={glow} />
    </group>
    {/* lampu kecil merah bata di tepi atas */}
    {[-6, -3, 0, 3, 6].map((x) => (
      <mesh key={x} position={[x, 3.7, 0.2]}>
        <boxGeometry args={[0.8, 0.3, 0.4]} />
        <meshStandardMaterial
          color={COLORS.brick}
          emissive={COLORS.brick}
          emissiveIntensity={glow}
          flatShading
        />
      </mesh>
    ))}
  </group>
);
