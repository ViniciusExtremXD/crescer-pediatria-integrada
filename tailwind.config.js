/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        /* Verde-petróleo do logo e dos posts */
        pine: {
          50: "#EEF5F2",
          100: "#DCEAE4",
          200: "#BFD8CF",
          300: "#8DB3A5",
          400: "#5F8F80",
          500: "#3F7366",
          600: "#2F5B54",
          700: "#254B45",
          800: "#1C3B36",
          900: "#142D29",
          950: "#0D1F1C",
        },
        /* Rosa do "Pediatria Integrada" */
        rose: {
          50: "#FFF4F4",
          100: "#FFEDED",
          200: "#FBDADD",
          300: "#F2B8BF",
          400: "#D4898F",
          500: "#C46F78",
          600: "#A44E5E",
          700: "#873E4C",
        },
        /* Creme e madeira do ambiente da clínica */
        cream: {
          50: "#FFFBF7",
          100: "#FFF6EF",
          200: "#FBEDE2",
          300: "#F2DFCD",
        },
        wood: {
          300: "#E8D5C0",
          400: "#D9B996",
          500: "#C9A27E",
        },
        ink: "#1E2B28",
      },
      fontFamily: {
        display: ['"Fraunces Variable"', "Georgia", "serif"],
        sans: ['"Plus Jakarta Sans Variable"', "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      /* Sombras em camadas, tingidas de verde-petróleo (nunca preto puro) */
      boxShadow: {
        soft: "0 1px 2px rgba(20,45,41,0.04), 0 4px 10px -4px rgba(20,45,41,0.08), 0 18px 36px -18px rgba(20,45,41,0.18)",
        card: "0 1px 2px rgba(20,45,41,0.05), 0 8px 18px -8px rgba(20,45,41,0.12), 0 30px 60px -30px rgba(20,45,41,0.30)",
        lift: "0 2px 4px rgba(20,45,41,0.06), 0 14px 28px -10px rgba(20,45,41,0.18), 0 44px 80px -36px rgba(20,45,41,0.42)",
        float: "0 2px 6px rgba(20,45,41,0.08), 0 22px 44px -16px rgba(20,45,41,0.32), 0 60px 110px -50px rgba(20,45,41,0.5)",
        rose: "0 10px 24px -10px rgba(196,111,120,0.45), 0 30px 60px -28px rgba(196,111,120,0.55)",
        pine: "0 10px 24px -10px rgba(47,91,84,0.5), 0 30px 60px -28px rgba(47,91,84,0.6)",
        "inner-line": "inset 0 0 0 1px rgba(47,91,84,0.07)",
        glass: "inset 0 1px 0 rgba(255,255,255,0.12), 0 20px 40px -24px rgba(0,0,0,0.5)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.75rem",
      },
      keyframes: {
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.55" },
          "100%": { transform: "scale(1.9)", opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(3deg)" },
        },
        sway: {
          "0%, 100%": { transform: "rotate(-6deg)" },
          "50%": { transform: "rotate(6deg)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "marquee-rev": {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
      },
      animation: {
        marquee: "marquee 60s linear infinite",
        "marquee-rev": "marquee-rev 64s linear infinite",
        "pulse-ring": "pulse-ring 2s cubic-bezier(0.2, 0.6, 0.3, 1) infinite",
        float: "float 7s ease-in-out infinite",
        sway: "sway 5s ease-in-out infinite",
        "spin-slow": "spin-slow 24s linear infinite",
      },
    },
  },
  plugins: [],
};
