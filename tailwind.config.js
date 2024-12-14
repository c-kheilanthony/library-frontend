/** @type {import('tailwindcss').Config} */
module.exports = {
  // Enable dark mode based on a "class" strategy
  darkMode: ["class"],

  // Specify paths to all template files
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all files in the src directory
  ],

  theme: {
    extend: {
      colors: {
        // Updated theme colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        primary: {
          DEFAULT: "#4F46E5", // Main primary color
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#22C55E", // Main secondary color
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "#EF4444", // Destructive actions (e.g., delete buttons)
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#F59E0B", // Accent color
          foreground: "#FFFFFF",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },

        // Added gradient colors
        gradient: {
          from: "#FFE4E6", // Light pink (from-pink-50)
          via: "#F3E8FF", // Light purple (via-purple-50)
          to: "#EBF8FF", // Light blue (to-blue-50)
        },

        // Added text colors
        text: {
          primary: "#4A299B", // Active tab text (purple-900)
          header: "#6B46C1", // Header text (purple-700)
        },

        // Button-specific colors
        button: {
          primary: {
            DEFAULT: "#EC4899", // Logout button background
            hover: "#DB2777", // Logout button hover background
          },
          focus: {
            DEFAULT: "#FDE8F4", // Focus ring color
          },
        },
      },

      // Border radius definitions
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      // Keyframes for animations
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },

      // Animations
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },

      // Gradients
      backgroundImage: {
        "primary-gradient":
          "linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-via), var(--tw-gradient-to))",
      },
    },
  },

  // Include the Tailwind CSS Animate plugin
  plugins: [require("tailwindcss-animate")],
};
