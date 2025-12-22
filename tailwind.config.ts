import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Rufina: ["Rufina", "serif"],
        lato: ["Lato", "sans-serif"],
        IBM_Plex_Sans: ["IBM Plex Sans", "serif"],
        resort: ["var(--font-resort)"],
        baskerville: ["Baskervville", "serif"],
        minaret: ["var(--font-minaret)"],
      },
      colors: {
        heroTextColor: "#E5CBBD",
        mainColor: "#381112",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.1s",
        "accordion-up": "accordion-up 0.1s ",
      },
    },
    screens: {
      xxxxl: {
        max: "1500px",
      },
      xxxl: {
        max: "1450px",
      },
      xxl: {
        max: "1350px",
      },
      xlll: {
        max: "1285px",
      },
      xll: {
        max: "1270px",
      },
      xl: {
        max: "1200px",
      },
      alg: {
        max: "1180px",
      },
      lg: {
        max: "1130px",
      },
      cll: {
        max: "1080px",
      },
      clg: {
        max: "1024px",
      },
      cmd: {
        max: "980px",
      },
      blg: {
        max: "950px",
      },
      amd: {
        max: "900px",
      },
      lmd: {
        max: "870px",
      },
      ltablet: {
        max: "790px",
      },
      tablet: {
        max: "768px",
      },
      fmd: {
        max: "750px",
      },
      bmd: {
        max: "719px",
      },
      dmd: {
        max: "700px",
      },
      asmm: {
        max: "670px",
      },
      asm: {
        max: "650px",
      },
      ss: {
        max: "600px",
      },
      sm: {
        max: "550px",
      },
      lMobile: {
        max: "500px",
      },
      mobile: {
        max: "450px",
      },
      axs: {
        max: "435px",
      },
      bxs: {
        max: "400px",
      },
      xs: {
        max: "380px",
      },
      lmb: {
        max: "335px",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
export default config;
