// @ts-expect-error - nativewind/preset types are empty/not a module in this version
import nativewindPreset from 'nativewind/preset';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [nativewindPreset],
  theme: {
    extend: {},
  },
  plugins: [],
};
