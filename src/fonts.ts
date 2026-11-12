import { loadFont as loadBebas } from "@remotion/google-fonts/BebasNeue";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

const bebas = loadBebas("normal", { weights: ["400"], subsets: ["latin"] });
const inter = loadInter("normal", {
  weights: ["500", "700"],
  subsets: ["latin"],
});

export const FONT_TITLE = bebas.fontFamily;
export const FONT_TEXT = inter.fontFamily;
