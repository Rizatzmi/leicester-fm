import React from "react";
import { AbsoluteFill, random } from "remotion";
import { Stage } from "../components/Stage";
import { Stadium } from "../components/Stadium";
import { Scoreboard } from "../components/Scoreboard";
import { Pop } from "../components/Text2D";
import { DangerEdge, Vignette } from "../components/Overlays";
import { useSceneTime } from "../lib/timing";
import { easeOut, ip, ip3 } from "../lib/anim";
import { COLORS } from "../theme";

// Adegan 1: papan skor 5000 : 1
export const Scene01: React.FC<{ total: number }> = ({ total }) => {
  const { frame, at } = useSceneTime(0, total);

  const stop = Math.round(at(1, 0.1)); // angka berhenti saat narasi menyebut angkanya
  const spinStart = 20;
  const glow = ip(frame, [0, 20], [0, 1]);

  let text = "";
  if (frame >= spinStart && frame < stop) {
    const d = (i: number) => Math.floor(random(`spin${frame}-${i}`) * 10);
    text = `${d(0)}${d(1)}${d(2)}${d(3)}:${d(4)}`;
  } else if (frame >= stop) {
    text = "5000:1";
  }

  const since = frame - stop;
  const shake =
    since >= 0 ? Math.sin(since * 2.8) * 0.35 * Math.exp(-since / 6) : 0;

  // push-in tegas dalam 3 detik pertama (90 frame), lalu pelan
  const eye = ip3(
    frame,
    [0, 90, total],
    [
      [0, 9, 34],
      [0, 10, 2],
      [0, 11, -2],
    ],
    easeOut,
  );
  const fov = ip(frame, [stop, stop + 5], [50, 40], easeOut); // snap zoom lalu diam

  return (
    <AbsoluteFill>
      <Stage eye={eye} target={[0, 13, -36]} fov={fov} warm={0}>
        <Stadium lights={0.3} />
        <Scoreboard text={text} glow={glow} shake={shake} />
      </Stage>
      <Vignette />
      <DangerEdge />
      <Pop
        at={Math.round(at(0, 0.45))}
        top={430}
        size={110}
        color={COLORS.ivory}
      >
        JUARA LIGA
      </Pop>
      <Pop at={stop} top={150} size={250} color={COLORS.gold}>
        5000 : 1
      </Pop>
    </AbsoluteFill>
  );
};
