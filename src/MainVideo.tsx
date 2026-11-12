import React from "react";
import { Series } from "remotion";
import { SceneShell } from "./SceneShell";

export type MainProps = { totals: number[] };

// Gabungan semua adegan berurutan
export const MainVideo: React.FC<MainProps> = ({ totals }) => (
  <Series>
    {totals.map((t, i) => (
      <Series.Sequence key={i} durationInFrames={t}>
        <SceneShell index={i} total={t} />
      </Series.Sequence>
    ))}
  </Series>
);
