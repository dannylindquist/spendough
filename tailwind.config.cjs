const colors = require("tailwindcss/colors");
const theme = require("tailwindcss/defaultTheme");
const { tailwindExtractor } = require("tailwindcss/lib/lib/purgeUnusedStyles");

const svelteClassColonExtractor = (content) => {
  return content.match(/(?<=class:)([a-zA-Z0-9_-]+)/gm) || [];
};

module.exports = {
  mode: "jit",
  purge: {
    enabled: "true",
    content: ["./src/**/*.{js,ts,svelte,html}"],
    options: {
      safelist: [/svelte-/],
      defaultExtractor: (content) => {
        // WARNING: tailwindExtractor is internal tailwind api
        // if this breaks after a tailwind update, report to svite repo
        return [
          ...tailwindExtractor(content),
          ...svelteClassColonExtractor(content),
        ];
      },
      keyframes: true,
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: colors.warmGray,
      },
      fontFamily: {
        sans: ["Inter Var", theme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {
      borderColor: ["group-checked"],
    },
  },
  plugins: [],
};
