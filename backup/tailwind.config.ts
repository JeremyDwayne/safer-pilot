import flowbite from "flowbite/plugin";
import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
export default {
  content: [
    "./public/**/*.html",
    "./src/app/**/*.{ts,tsx}",
    "./node_modules/flowbite-react/lib/esm/**/*.js",
    "./node_modules/flowbite-react/lib/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
    //     Usage Tips:
    // Backgrounds: Use Cloud White or Aluminum Grey for a clean and professional look.
    // Text: Jet Black for primary text to ensure readability, with Midnight Blue for secondary text.
    // Buttons and Calls to Action: Sunset Orange and Turquoise are great for drawing attention.
    // Headings and Key Elements: Sky Blue can be used to highlight important areas or headings.
    // Accents: Crimson Red and Turquoise for icons, links, or key graphics.
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
  plugins: [flowbite],
} satisfies Config;
