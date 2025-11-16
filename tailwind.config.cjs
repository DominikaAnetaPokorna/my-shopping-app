// tailwind.config.cjs
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        groceo: {
          DEFAULT: "#08346a",   // tmavě modrá z wireframu
          light: "#e9f0fb",     // světlejší pozadí pro pill
          accent: "#0b57c6",    // akcentní modrá (může se ladit)
        },
        cardbg: "#fffdf6",     // jemné krémové pozadí
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        display: ["'Merriweather', serif"], // pro větší, seriffový look (volitelně)
      },
      borderRadius: {
        xl2: "1.5rem",
      },
    },
  },
  plugins: [],
};
