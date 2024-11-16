// tailwind config is required for editor support

import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";


const config: Pick<Config, "content" | "presets"> = {
  content: ["./src/app/**/*.tsx", "./src/app/*.tsx"],
  presets: [sharedConfig, {
    theme: {
      extend: {
        backgroundImage: {
          'thumbnail': "url('/bg-connect.svg')",
          'header': "url('/bg_header.png')"
        }
      }
    }
  }],
};

export default config;
