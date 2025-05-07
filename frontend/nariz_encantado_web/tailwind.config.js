/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#f59e0b", // yellow-500
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#f3f4f6", // gray-100
          foreground: "#1f2937", // gray-800
        },
        destructive: {
          DEFAULT: "#ef4444", // red-500
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#f3f4f6", // gray-100
          foreground: "#6b7280", // gray-500
        },
        accent: {
          DEFAULT: "#fef3c7", // yellow-100
          foreground: "#92400e", // yellow-800
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#1f2937", // gray-800
        },
        background: "#ffffff",
        foreground: "#1f2937", // gray-800
        border: "#e5e7eb", // gray-200
        input: "#e5e7eb", // gray-200
        ring: "#f59e0b", // yellow-500
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
    },
  },
  plugins: [],
}
