import type { Config } from "tailwindcss";

// We want each package to be responsible for its own content.
const config: Omit<Config, "content"> = {
  theme: {
    extend: {
      backgroundImage: {
        "glow-conic":
          "conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)",
      },
      colors: {
        'main-bg': '#0f0f0f',
        'sub1': '#1b1b1b',
        'sub2': '#292929',
        'sub3': '#bbbbbb',
        'sub4': '#151515',
        'main-yellow': '#d9b432',
        'sub-yellow': '#E5B842',
        'sub2-yellow': '#A49A80',
        'sub3-yellow': '#e5b7431a'
      }
    },
  },
  plugins: [],
};
export default config;
