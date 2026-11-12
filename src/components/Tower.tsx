import React from "react";
import { COLORS } from "../theme";
import { V3, clamp01 } from "../lib/anim";

export const RANKS = 20;

// Tinggi tengah balok Leicester untuk peringkat rho (1 = puncak, 20 = dasar, lebih dari 20 = jatuh ke kasta bawah)
export const leicY = (rho: number) => RANKS - rho + 0.5;

type TowerProps = {
  rho: number; // peringkat Leicester (angka desimal, boleh di antara dua peringkat)
  hop?: number; // tambahan tinggi lompatan
  shake?: number; // getar ke samping
  zone?: boolean; // tampilkan garis merah zona degradasi
  lowerTier?: boolean; // tampilkan lantai kasta bawah
  position?: V3;
};

// Menara 20 balok klasemen. Balok lain bergeser turun saat Leicester melewatinya
export const Tower: React.FC<TowerProps> = ({
  rho,
  hop = 0,
  shake = 0,
  zone = true,
  lowerTier = false,
  position = [0, 0, 0],
}) => {
  const others = Array.from({ length: RANKS - 1 }, (_, i) => i + 1); // o = 1..19
  return (
    <group position={position}>
      {others.map((o) => {
        const rank = o + clamp01(1 - rho + o);
        const y = RANKS - rank + 0.5;
        return (
          <mesh key={o} position={[0, y, 0]}>
            <boxGeometry args={[3, 0.88, 3]} />
            <meshStandardMaterial
              color={o % 2 === 0 ? COLORS.steel : COLORS.steelLight}
              flatShading
            />
          </mesh>
        );
      })}

      {/* balok Leicester: lebih lebar dan menyala supaya jadi fokus */}
      <mesh position={[shake, leicY(rho) + hop, 0.35]}>
        <boxGeometry args={[3.5, 0.92, 3.9]} />
        <meshStandardMaterial
          color={COLORS.royal}
          emissive={COLORS.royal}
          emissiveIntensity={0.45}
          flatShading
        />
      </mesh>

      {/* garis zona degradasi, di bawah peringkat 17 */}
      {zone && (
        <mesh position={[0, 3.0, 0]}>
          <boxGeometry args={[3.7, 0.12, 3.7]} />
          <meshStandardMaterial
            color={COLORS.brick}
            emissive={COLORS.brick}
            emissiveIntensity={0.9}
            flatShading
          />
        </mesh>
      )}

      {/* alas menara */}
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[4.4, 0.3, 4.4]} />
        <meshStandardMaterial color={COLORS.dark} flatShading />
      </mesh>

      {/* kasta bawah: lantai di bawah menara tempat balok jatuh */}
      {lowerTier && (
        <mesh position={[0, -3.2, 0]}>
          <boxGeometry args={[7, 0.4, 7]} />
          <meshStandardMaterial color="#4A2A35" flatShading />
        </mesh>
      )}

      {/* tiang penyangga bila menara dinaikkan dari tanah */}
      {position[1] > 0 && (
        <mesh position={[0, -position[1] / 2, 0]}>
          <boxGeometry args={[1.2, position[1], 1.2]} />
          <meshStandardMaterial color={COLORS.dark} flatShading />
        </mesh>
      )}
    </group>
  );
};
