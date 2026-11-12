import { Input, ALL_FORMATS, UrlSource } from "mediabunny";
import { staticFile } from "remotion";
import { SCENES } from "../data/scenes";
import { FPS } from "../theme";

const getAudioSeconds = async (src: string) => {
  const input = new Input({
    formats: ALL_FORMATS,
    source: new UrlSource(src, { getRetryDelay: () => null }),
  });
  return input.computeDuration();
};

// Jumlah frame satu adegan, dibaca dari panjang file audionya
export const sceneFrames = async (index: number) => {
  const seconds = await getAudioSeconds(staticFile(SCENES[index].audio));
  return Math.max(1, Math.ceil(seconds * FPS));
};
