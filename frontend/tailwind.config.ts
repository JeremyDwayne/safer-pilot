import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./node_modules/flowbite-react/**/*.js", "./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
    colors: {
      // primary colors
      "sky-blue": "#4D9DE0",
      "jet-black": "#30323D",
      "cloud-white": "#EFEFEF",
      // secondary colors
      "sunset-orange": "#F2B138",
      "midnight-blue": "#1E255E",
      "aluminum-grey": "#A9BCD0",
      // tirtiary colors
      turquoise: "#39A9DB",
      "crimson-red": "#D7263D",
    },
  },
  plugins: [require("flowbite/plugin")],
} satisfies Config;
