import React from "react";
import { CalculateMetadataFunction, Composition } from "remotion";
import { MainVideo, MainProps } from "./MainVideo";
import { SceneShell, ShellProps } from "./SceneShell";
import { SCENES } from "./data/scenes";
import { sceneFrames } from "./lib/duration";
import { FPS, HEIGHT, WIDTH } from "./theme";

// Durasi video penuh = jumlah durasi 9 file audio
const fullMeta: CalculateMetadataFunction<MainProps> = async () => {
  const totals = await Promise.all(SCENES.map((_, i) => sceneFrames(i)));
  return {
    durationInFrames: totals.reduce((a, b) => a + b, 0),
    props: { totals },
  };
};

// Durasi satu adegan = durasi file audio adegan itu
const sceneMeta: CalculateMetadataFunction<ShellProps> = async ({ props }) => {
  const total = await sceneFrames(props.index);
  return { durationInFrames: total, props: { ...props, total } };
};

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="Full"
      component={MainVideo}
      durationInFrames={300}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
      defaultProps={{ totals: SCENES.map(() => 300) }}
      calculateMetadata={fullMeta}
    />
    {SCENES.map((_, i) => (
      <Composition
        key={i}
        id={`Scene0${i + 1}`}
        component={SceneShell}
        durationInFrames={300}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{ index: i, total: 300 }}
        calculateMetadata={sceneMeta}
      />
    ))}
  </>
);
