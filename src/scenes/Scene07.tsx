import React from "react";
import { AbsoluteFill, Easing, spring, useVideoConfig } from "remotion";
import { Stage } from "../components/Stage";
import { Stadium } from "../components/Stadium";
import { Tower, leicY } from "../components/Tower";
import { Trophy } from "../components/Trophy";
import { Confetti } from "../components/Confetti";
import { Pop } from "../components/Text2D";
import { Vignette } from "../components/Overlays";
import { useSceneTime } from "../lib/timing";
import { V3, easeOut, ip } from "../lib/anim";
import { COLORS } from "../theme";

// Adegan 7: balok Leicester naik ke puncak, piala dan konfeti
export const Scene07: React.FC<{ total: number }> = ({ total }) => {
  const { frame, at } = useSceneTime(6, total);
  const { fps } = useVideoConfig();

  const start = 8;
  const top = Math.round(at(0, 0.92)); // tiba di puncak
  // makin cepat saat menanjak
  const rho = ip(frame, [start, top], [20, 1], Easing.in(Easing.quad));

  const warm = ip(frame, [0, top + 10], [0.3, 1]);
  const lights = ip(frame, [0, top], [0.4, 1]);

  // tilt naik mengikuti balok, lalu snap zoom ke piala dan diam
  const lead = Math.max(4, leicY(rho));
  const snap = ip(frame, [top, top + 6], [0, 1], easeOut);
  const ty = frame < top ? lead : 19.5 + 2 * snap;
  const eye: V3 = [14, 5 + ty * 0.35, 28];
  const fov = 50 - 26 * snap;

  const trophyScale =
    frame >= top
      ? spring({
          frame: frame - top,
          fps,
          config: { damping: 10, stiffness: 120 },
        })
      : 0;

  return (
    <AbsoluteFill>
      <Stage eye={eye} target={[0, ty, 0]} fov={fov} warm={warm}>
        <Stadium lights={lights} />
        <Tower rho={rho} />
        {trophyScale > 0 && (
          <Trophy
            position={[0, 20.15, 0]}
            scale={trophyScale}
            rotY={(frame - top) * 0.03}
          />
        )}
        <Confetti start={top} origin={[0, 21, 0]} count={70} life={5} />
      </Stage>
      <Vignette />

      <Pop at={0} until={top} top={150} size={230} color={COLORS.ivory}>
        2 MEI 2016
      </Pop>
      <Pop at={top} top={150} size={320} color={COLORS.gold}>
        JUARA
      </Pop>
      <Pop
        at={Math.round(at(1, 0.1))}
        bottom={560}
        size={54}
        color={COLORS.ivory}
        font="text"
      >
        2 LAGA TERSISA
      </Pop>
    </AbsoluteFill>
  );
};
