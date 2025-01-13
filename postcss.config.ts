import { Plugin } from "postcss"

const config: { plugins: { [key: string]: Plugin | Record<string, unknown> } } = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

export default config
