import { defineConfig } from "eslint/config";
import expoConfig from "eslint-config-expo/flat.js";
import gts from "gts";
import boundaries from "eslint-plugin-boundaries";
import checkFile from "eslint-plugin-check-file";

export default defineConfig([
  { ignores: ["src/global/api/generated/**"] },
  ...expoConfig,
  ...gts,

  {
    files: ["src/**/*.{js,ts,jsx,tsx}"],
    plugins: { boundaries, "check-file": checkFile },
    settings: {

      "boundaries/elements": [
        {
          type: "feature",
          pattern: "src/features/*",
          capture: ["featureName"],
        },
        {
          type: "app",
          pattern: "src/app/*",
        },
        {
          type: "global",
          pattern: "src/global/*",
        },
      ],
    },
    rules: {

      "boundaries/element-types": [
        "error",
        {
          default: "allow",
          rules: [
            {
              from: ["feature"],
              allow: [
                ["feature", { featureName: "${from.featureName}" }],
                "global",
              ],
            },
            {
              from: ["global"],
              allow: ["global"],
            },
          ],
        },
      ],

      "import/no-default-export": ["error"],

      "check-file/filename-naming-convention": [
        "error",
        { "src/**/*.{js,ts,jsx,tsx}": "KEBAB_CASE" },
      ],

      "max-lines": [
        "error",
        {
          max: 300,
          skipBlankLines: false,
          skipComments: false,
        },
      ],
    },
  },
  
  {
    files: ["src/app/**/*.{js,ts,jsx,tsx}"],
    rules: {
      "import/no-default-export": "off",
    },
  },

  {
    files: ["**/_layout.{js,ts,jsx,tsx}"],
    rules: {
      "check-file/filename-naming-convention": "off",
    },
  },
]);