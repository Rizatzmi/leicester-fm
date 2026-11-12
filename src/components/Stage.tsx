import React, { useLayoutEffect } from "react";
import { useVideoConfig } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { V3, mixColor } from "../lib/anim";
import { COLORS } from "../theme";

// Mengatur posisi kamera dari nilai frame (tanpa useFrame)
const CameraRig: React.FC<{ eye: V3; target: V3; fov: number }> = ({
  eye,
  target,
  fov,
}) => {
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);
  useLayoutEffect(() => {
    camera.position.set(eye[0], eye[1], eye[2]);
    camera.lookAt(target[0], target[1], target[2]);
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = fov;
      camera.aspect = size.width / size.height;
      camera.near = 0.1;
      camera.far = 500;
      camera.updateProjectionMatrix();
    }
    camera.updateMatrixWorld();
  });
  return null;
};

type StageProps = {
  eye: V3;
  target: V3;
  fov?: number;
  warm?: number; // 0 = dingin dan gelap, 1 = hangat dan terang
  children: React.ReactNode;
};

// Kanvas 3D + kamera + pencahayaan. Semua nilai datang dari frame
export const Stage: React.FC<StageProps> = ({
  eye,
  target,
  fov = 50,
  warm = 0,
  children,
}) => {
  const { width, height } = useVideoConfig();
  const sky = mixColor(COLORS.navy, "#33497F", warm);
  return (
    <ThreeCanvas
      width={width}
      height={height}
      style={{ position: "absolute", inset: 0 }}
    >
      <color attach="background" args={[sky]} />
      <fog attach="fog" args={[sky, 70, 260]} />
      <ambientLight
        intensity={0.55 + 0.4 * warm}
        color={mixColor("#8FA5D8", "#FFE3B8", warm)}
      />
      <directionalLight
        position={[20, 40, 25]}
        intensity={1.0 + 0.9 * warm}
        color={mixColor("#B4C8FF", "#FFD9A0", warm)}
      />
      <CameraRig eye={eye} target={target} fov={fov} />
      {children}
    </ThreeCanvas>
  );
};
