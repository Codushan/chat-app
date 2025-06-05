// postcss.config.js
export default {
  plugins: {
    tailwindcss: {
      config: './tailwind.config.js', // Explicitly point to your Tailwind config
    },
    autoprefixer: {},
  }
}
