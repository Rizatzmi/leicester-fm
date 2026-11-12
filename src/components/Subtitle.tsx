import React from "react";
import { useCurrentFrame } from "remotion";
import { SCENES } from "../data/scenes";
import { sentenceBounds } from "../lib/timing";
import { ip } from "../lib/anim";
import { FONT_TEXT } from "../fonts";
import { COLORS } from "../theme";

// Subtitle versi ejaan asli. Waktu tiap kalimat dihitung dari panjang karakter kalimat TTS
export const Subtitle: React.FC<{ index: number; total: number }> = ({
  index,
  total,
}) => {
  const frame = useCurrentFrame();
  const scene = SCENES[index];
  const bounds = sentenceBounds(scene.tts, total);
  let i = bounds.findIndex((b) => frame >= b.start && frame < b.end);
  if (i < 0) i = frame < bounds[0].start ? 0 : bounds.length - 1;
  const opacity = ip(frame, [bounds[i].start, bounds[i].start + 6], [0, 1]);
  return (
    <div
      style={{
        position: "absolute",
        left: 60,
        right: 60,
        bottom: 300,
        display: "flex",
        justifyContent: "center",
        opacity,
      }}
    >
      <div
        style={{
          fontFamily: FONT_TEXT,
          fontWeight: 700,
          fontSize: 48,
          lineHeight: 1.25,
          color: COLORS.ivory,
          textAlign: "center",
          background: "rgba(7,20,43,0.72)",
          padding: "16px 28px",
          borderRadius: 18,
        }}
      >
        {scene.subtitle[i]}
      </div>
    </div>
  );
};
