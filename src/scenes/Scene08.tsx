import React from "react";
import { AbsoluteFill } from "remotion";
import { Stage } from "../components/Stage";
import { Stadium } from "../components/Stadium";
import { Tower } from "../components/Tower";
import { Trophy } from "../components/Trophy";
import { Scoreboard } from "../components/Scoreboard";
import { Confetti } from "../components/Confetti";
import { Laptop, SCREEN_CENTER } from "../components/Laptop";
import { Pop } from "../components/Text2D";
import { Vignette } from "../components/Overlays";
import { useSceneTime } from "../lib/timing";
import { V3, easeInOut, ip, ip3 } from "../lib/anim";
import { COLORS } from "../theme";

const TITLE = "FOOTBALL MANAGER 27";

// Adegan 8: stadion dingin lagi, kamera mundur keluar menuju layar laptop
export const Scene08: React.FC<{ total: number }> = ({ total }) => {
  const { frame, at } = useSceneTime(7, total);

  const cool = ip(frame, [0, at(0, 0.9)], [1, 0.1]);
  const rho = ip(frame, [0, total], [1, 6], easeInOut);
  const on = ip(frame, [at(1, 0.2), at(1, 0.5)], [0, 1]);

  const t1 = Math.round(at(1, 0));
  const t2 = Math.round(at(1, 0.7));
  const eye = ip3(
    frame,
    [0, t1, t2, total],
    [
      [14, 12, 30],
      [-10, 10, 50],
      [-2, 7.5, 74],
      [7, 6, 78],
    ] as V3[],
    easeInOut,
  );
  const target = ip3(
    frame,
    [0, t1, t2, total],
    [[0, 12, 0], [0, 10, 0], SCREEN_CENTER, SCREEN_CENTER] as V3[],
    easeInOut,
  );

  // efek ketik ringan
  const typed = Math.floor(
    ip(frame, [at(1, 0.05), at(1, 0.45)], [0, TITLE.length]),
  );
  const cursor =
    typed < TITLE.length && Math.floor(frame / 6) % 2 === 0 ? "|" : "";

  return (
    <AbsoluteFill>
      <Stage eye={eye} target={target} fov={50} warm={cool}>
        <Stadium lights={cool} />
        <Scoreboard text="0:0" glow={0.15} />
        <Tower rho={rho} zone={false} />
        <Trophy position={[0, 20.15, 0]} scale={1} glow={0.2 + 0.2 * cool} />
        <Confetti start={-40} origin={[0, 21, 0]} count={40} life={5} />
        <Laptop on={on} />
      </Stage>
      <Vignette />

      <Pop at={0} until={t1} top={150} size={180} color={COLORS.ivory}>
        10 TAHUN BERLALU
      </Pop>
      <Pop
        at={Math.round(at(1, 0.05))}
        top={150}
        size={140}
        color={COLORS.gold}
      >
        {TITLE.slice(0, typed)}
        {cursor}
      </Pop>
    </AbsoluteFill>
  );
};
