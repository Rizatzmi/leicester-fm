import { useCurrentFrame } from "remotion";
import { SCENES } from "../data/scenes";

export type Bound = { start: number; end: number };

// Membagi durasi audio adegan ke tiap kalimat, sesuai panjang karakter kalimat TTS
export const sentenceBounds = (tts: string[], total: number): Bound[] => {
  const lens = tts.map((s) => s.length);
  const sum = lens.reduce((a, b) => a + b, 0);
  let acc = 0;
  return lens.map((len) => {
    const start = Math.round((acc / sum) * total);
    acc += len;
    const end = Math.round((acc / sum) * total);
    return { start, end };
  });
};

// at(i, 0.5) = frame di tengah kalimat ke-i (mulai dari 0)
export const useSceneTime = (index: number, total: number) => {
  const frame = useCurrentFrame();
  const bounds = sentenceBounds(SCENES[index].tts, total);
  const at = (i: number, frac = 0) =>
    bounds[i].start + (bounds[i].end - bounds[i].start) * frac;
  return { frame, total, bounds, at };
};
