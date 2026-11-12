import React from "react";
import { COLORS } from "../theme";
import { V3 } from "../lib/anim";
import { Digits } from "./Digits";

type PlayerProps = {
  position?: V3;
  rotY?: number; // 0 = menghadap +z (ke arah kamera di kebanyakan adegan)
  scale?: number;
  color?: string; // warna kostum
  pants?: string;
  number?: string; // nomor punggung
  silhouette?: boolean; // seluruh badan gelap polos
  swing?: number; // -1 sampai 1, ayunan langkah
  slump?: number; // 0 sampai 1, menunduk lesu
  cheer?: number; // 0 sampai 1, tangan terangkat merayakan
  jump?: number; // tambahan tinggi lompat
  nod?: number; // sudut mengangguk (radian)
  yaw?: number; // sudut menggeleng (radian)
};

const Mat: React.FC<{ color: string }> = ({ color }) => (
  <meshStandardMaterial color={color} flatShading />
);

// Karakter low-poly generik: wajah polos, badan dari bentuk facet sederhana
export const Player: React.FC<PlayerProps> = ({
  position = [0, 0, 0],
  rotY = 0,
  scale = 1,
  color = COLORS.royal,
  pants = COLORS.navy,
  number,
  silhouette = false,
  swing = 0,
  slump = 0,
  cheer = 0,
  jump = 0,
  nod = 0,
  yaw = 0,
}) => {
  const cShirt = silhouette ? "#0A1226" : color;
  const cPants = silhouette ? "#0A1226" : pants;
  const cSkin = silhouette ? "#0A1226" : COLORS.skin;
  // gerakan kaku: ayunan dibulatkan ke beberapa langkah saja
  const sw = Math.round(swing * 3) / 3;
  const armBase = 0.15 * slump;
  return (
    <group
      position={[position[0], position[1] + jump, position[2]]}
      rotation={[0, rotY, 0]}
      scale={scale}
    >
      {/* kaki */}
      {[-1, 1].map((s) => (
        <group
          key={s}
          position={[s * 0.16, 0.9, 0]}
          rotation={[s * sw * 0.7, 0, 0]}
        >
          <mesh position={[0, -0.42, 0]}>
            <capsuleGeometry args={[0.11, 0.56, 2, 5]} />
            <Mat color={cPants} />
          </mesh>
        </group>
      ))}

      {/* badan atas berputar di pinggul untuk gerak menunduk */}
      <group position={[0, 0.95, 0]} rotation={[slump * 0.45, 0, 0]}>
        <mesh position={[0, 0.3, 0]} rotation={[0, Math.PI / 6, 0]}>
          <cylinderGeometry args={[0.3, 0.24, 0.7, 6]} />
          <Mat color={cShirt} />
        </mesh>

        {/* lengan */}
        {[-1, 1].map((s) => (
          <group
            key={s}
            position={[s * 0.38, 0.58, 0]}
            rotation={[
              -s * sw * 0.7 + armBase - cheer * 2.7,
              0,
              s * (0.1 + cheer * 0.5),
            ]}
          >
            <mesh position={[0, -0.3, 0]}>
              <capsuleGeometry args={[0.08, 0.46, 2, 5]} />
              <Mat color={cShirt} />
            </mesh>
          </group>
        ))}

        {/* kepala polos tanpa detail wajah */}
        <group position={[0, 0.87, 0]} rotation={[nod + slump * 0.5, yaw, 0]}>
          <mesh>
            <sphereGeometry args={[0.24, 6, 5]} />
            <Mat color={cSkin} />
          </mesh>
        </group>

        {/* nomor punggung dari kotak 7-segmen */}
        {number && !silhouette && (
          <group
            position={[0, 0.34, -0.27]}
            rotation={[0, Math.PI, 0]}
            scale={0.1}
          >
            <Digits text={number} color={COLORS.ivory} glow={0} />
          </group>
        )}
      </group>
    </group>
  );
};
