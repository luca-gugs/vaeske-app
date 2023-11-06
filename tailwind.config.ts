import { fontFamily } from "tailwindcss/defaultTheme";
const plugin = require("tailwindcss/plugin");
const { blackA, mauve, violet, indigo, purple } = require("@radix-ui/colors");

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        ...blackA,
        ...mauve,
        ...violet,
        ...purple,
        ...indigo,
      },
      keyframes: {
        "fade-in-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        // enterFromRight: {
        //   from: { opacity: 0, transform: "translateX(200px)" },
        //   to: { opacity: 1, transform: "translateX(0)" },
        // },
        // enterFromLeft: {
        //   from: { opacity: 0, transform: "translateX(-200px)" },
        //   to: { opacity: 1, transform: "translateX(0)" },
        // },
        // exitToRight: {
        //   from: { opacity: 1, transform: "translateX(0)" },
        //   to: { opacity: 0, transform: "translateX(200px)" },
        // },
        // exitToLeft: {
        //   from: { opacity: 1, transform: "translateX(0)" },
        //   to: { opacity: 0, transform: "translateX(-200px)" },
        // },
        // scaleIn: {
        //   from: { opacity: 0, transform: "rotateX(-10deg) scale(0.9)" },
        //   to: { opacity: 1, transform: "rotateX(0deg) scale(1)" },
        // },
        // scaleOut: {
        //   from: { opacity: 1, transform: "rotateX(0deg) scale(1)" },
        //   to: { opacity: 0, transform: "rotateX(-10deg) scale(0.95)" },
        // },
        // fadeIn: {
        //   from: { opacity: 0 },
        //   to: { opacity: 1 },
        // },
        // fadeOut: {
        //   from: { opacity: 1 },
        //   to: { opacity: 0 },
        // },
      },
    },
    animation: {
      "fade-in-down": "fade-in-down 0.75s ease-out",
      scaleIn: "scaleIn 200ms ease",
      scaleOut: "scaleOut 200ms ease",
      fadeIn: "fadeIn 200ms ease",
      fadeOut: "fadeOut 200ms ease",
      enterFromLeft: "enterFromLeft 250ms ease",
      enterFromRight: "enterFromRight 250ms ease",
      exitToLeft: "exitToLeft 250ms ease",
      exitToRight: "exitToRight 250ms ease",
    },
  },
  plugins: [
    plugin(({ matchUtilities }: any) => {
      matchUtilities({
        perspective: (value: any) => ({
          perspective: value,
        }),
      });
    }),
  ],
};
