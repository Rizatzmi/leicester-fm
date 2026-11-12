import { Easing, interpolate } from "remotion";
import * as THREE from "three";

export type V3 = [number, number, number];

export const easeOut = Easing.out(Easing.cubic);
export const easeIn = Easing.in(Easing.cubic);
export const easeInOut = Easing.inOut(Easing.cubic);

// memastikan titik waktu selalu naik (syarat interpolate), aman untuk adegan pendek
const fix = (input: number[]) => {
  const out: number[] = [];
  input.forEach((v, i) => {
    out.push(i === 0 ? v : Math.max(v, out[i - 1] + 0.01));
  });
  return out;
};

// interpolasi dengan batas (tidak melewati nilai awal dan akhir)
export const ip = (
  frame: number,
  input: number[],
  output: number[],
  easing?: (t: number) => number,
) =>
  interpolate(frame, fix(input), output, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });

export const ip3 = (
  frame: number,
  input: number[],
  pts: V3[],
  easing?: (t: number) => number,
): V3 => [
  ip(
    frame,
    input,
    pts.map((p) => p[0]),
    easing,
  ),
  ip(
    frame,
    input,
    pts.map((p) => p[1]),
    easing,
  ),
  ip(
    frame,
    input,
    pts.map((p) => p[2]),
    easing,
  ),
];

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const mixColor = (a: string, b: string, t: number) =>
  "#" + new THREE.Color(a).lerp(new THREE.Color(b), clamp01(t)).getHexString();
