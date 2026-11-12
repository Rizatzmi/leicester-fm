import React from "react";
import { AbsoluteFill, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { SCENES } from "./data/scenes";
import { Subtitle } from "./components/Subtitle";
import { COLORS } from "./theme";
import { Scene01 } from "./scenes/Scene01";
import { Scene02 } from "./scenes/Scene02";
import { Scene03 } from "./scenes/Scene03";
import { Scene04 } from "./scenes/Scene04";
import { Scene05 } from "./scenes/Scene05";
import { Scene06 } from "./scenes/Scene06";
import { Scene07 } from "./scenes/Scene07";
import { Scene08 } from "./scenes/Scene08";
import { Scene09 } from "./scenes/Scene09";

const SCENE_COMPONENTS: React.FC<{ total: number }>[] = [
  Scene01,
  Scene02,
  Scene03,
  Scene04,
  Scene05,
  Scene06,
  Scene07,
  Scene08,
  Scene09,
];

export type ShellProps = { index: number; total: number };

// Satu adegan utuh: visual 3D, subtitle, dan audio narasinya
export const SceneShell: React.FC<ShellProps> = ({ index, total }) => {
  const Comp = SCENE_COMPONENTS[index];
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.navy }}>
      <Comp total={total} />
      <Subtitle index={index} total={total} />
      <Audio src={staticFile(SCENES[index].audio)} />
    </AbsoluteFill>
  );
};
