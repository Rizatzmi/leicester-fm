import React from "react";
import { AbsoluteFill } from "remotion";
import { Stage } from "../components/Stage";
import { Stadium } from "../components/Stadium";
import { Scoreboard } from "../components/Scoreboard";
import { Laptop, SCREEN_CENTER } from "../components/Laptop";
import { Pop } from "../components/Text2D";
import { Vignette } from "../components/Overlays";
import { useSceneTime } from "../lib/timing";
import { V3, easeInOut, easeOut, ip, ip3 } from "../lib/anim";
import { COLORS } from "../theme";

// Adegan 9: layar laptop memenuhi frame, ajakan mengikuti series
export const Scene09: React.FC<{ total: number }> = ({ total }) => {
  const { frame, at } = useSceneTime(8, total);

  // mulai dari posisi akhir adegan 8, lalu push-in halus
  const eye = ip3(
    frame,
    [0, total],
    [
      [7, 6, 78],
      [7, 5.2, 67.2],
    ] as V3[],
    easeInOut,
  );
  const dots = ip(frame, [at(0, 0.15), at(1, 0.3)], [0, 11]);
  const lift = ip(frame, [at(1, 0.4), at(1, 0.95)], [0, 1], easeOut);

  return (
    <AbsoluteFill>
      <Stage eye={eye} target={SCREEN_CENTER} fov={50} warm={0.5}>
        <Stadium lights={0.5} />
        <Scoreboard text="0:0" glow={0.15} />
        <Laptop on={1} dots={dots} ballLift={lift} />
      </Stage>
      <Vignette />

      <Pop at={Math.round(at(0, 0.1))} top={150} size={230} color={COLORS.gold}>
        ROAD TO GLORY
      </Pop>
      <Pop at={Math.round(at(1, 0))} top={420} size={110} color={COLORS.ivory}>
        KEAJAIBAN KEDUA DIMULAI
      </Pop>
      <Pop
        at={Math.round(at(1, 0.4))}
        bottom={560}
        size={46}
        color={COLORS.ivory}
        font="text"
      >
        IKUTI SERIES INI
      </Pop>
    </AbsoluteFill>
  );
};
