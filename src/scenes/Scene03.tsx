import React from "react";
import { AbsoluteFill } from "remotion";
import { Stage } from "../components/Stage";
import { Stadium } from "../components/Stadium";
import { Tower } from "../components/Tower";
import { Pop } from "../components/Text2D";
import { Vignette } from "../components/Overlays";
import { useSceneTime } from "../lib/timing";
import { V3, easeInOut, easeOut, ip3, ip } from "../lib/anim";
import { COLORS } from "../theme";

// Adegan 3: 2014/15, tujuh lompatan keluar dari zona degradasi
export const Scene03: React.FC<{ total: number }> = ({ total }) => {
  const { frame, at } = useSceneTime(2, total);

  const hopStart = Math.round(at(2, 0.05));
  const hopEnd = Math.round(at(2, 0.85));
  const per = (hopEnd - hopStart) / 7;

  const k = frame < hopStart ? 0 : Math.min(7, (frame - hopStart) / per);
  const kf = Math.min(Math.floor(k), 6);
  const u = k - kf;
  const rho = 20 - (6 * (kf + easeInOut(u))) / 7;
  const hop = frame >= hopStart && k < 7 ? Math.sin(Math.PI * u) * 1.1 : 0;

  // bergetar sebelum mulai melompat
  const shake =
    frame < hopStart && frame > at(1, 0) ? Math.sin(frame * 2.1) * 0.09 : 0;

  // close-up statis di dasar, lalu pull-back cepat saat balok naik
  const pb0 = Math.round(at(2, 0));
  const pb1 = Math.round(at(2, 0.55));
  const eye = ip3(
    frame,
    [0, pb0, pb1, total],
    [
      [5, 2.2, 9],
      [5, 2.2, 9],
      [16, 9, 26],
      [17, 10, 28],
    ] as V3[],
    easeInOut,
  );
  const target = ip3(
    frame,
    [0, pb0, pb1, total],
    [
      [0, 1.4, 0],
      [0, 1.4, 0],
      [0, 7, 0],
      [0, 8, 0],
    ] as V3[],
    easeInOut,
  );

  return (
    <AbsoluteFill>
      <Stage eye={eye} target={target} fov={50} warm={0.05}>
        <Stadium lights={0.3} />
        <Tower rho={rho} hop={hop} shake={shake} />
      </Stage>
      <Vignette />

      <Pop
        at={Math.round(at(1, 0))}
        until={Math.round(at(2, 0))}
        top={150}
        size={230}
        color={COLORS.ivory}
      >
        2014/15
      </Pop>
      <Pop
        at={Math.round(at(2, 0))}
        until={hopEnd}
        top={150}
        size={230}
        color={COLORS.gold}
      >
        7 DARI 9
      </Pop>
      <Pop at={hopEnd} top={150} size={230} color={COLORS.ivory}>
        SELAMAT
      </Pop>

      {/* penghitung kemenangan: tujuh titik emas menyala satu per satu */}
      <div
        style={{
          position: "absolute",
          top: 440,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 22,
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6].map((j) => {
          const land = hopStart + (j + 1) * per;
          const s = ip(frame, [land, land + 8], [0.4, 1], easeOut);
          const lit = frame >= land;
          return (
            <div
              key={j}
              style={{
                width: 54,
                height: 54,
                borderRadius: 27,
                background: lit ? COLORS.gold : "rgba(244,241,232,0.18)",
                transform: `scale(${lit ? s : 1})`,
                boxShadow: lit ? "0 0 24px rgba(245,200,66,0.8)" : "none",
                opacity: frame >= at(2, 0) ? 1 : 0,
              }}
            />
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
