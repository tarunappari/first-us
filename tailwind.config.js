/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          // Brand colors
          'deep-navy': '#121622',
          'corporate-blue': '#1481b9',
          'sky-blue': '#189dd6',

          // CSS variable-based colors for consistency with shadcn/ui
          background: 'var(--background)',
          foreground: 'var(--foreground)',
          card: {
            DEFAULT: 'var(--card)',
            foreground: 'var(--card-foreground)',
          },
          popover: {
            DEFAULT: 'var(--popover)',
            foreground: 'var(--popover-foreground)',
          },
          primary: {
            DEFAULT: 'var(--primary)',
            foreground: 'var(--primary-foreground)',
          },
          secondary: {
            DEFAULT: 'var(--secondary)',
            foreground: 'var(--secondary-foreground)',
          },
          muted: {
            DEFAULT: 'var(--muted)',
            foreground: 'var(--muted-foreground)',
          },
          accent: {
            DEFAULT: 'var(--accent)',
            foreground: 'var(--accent-foreground)',
          },
          destructive: {
            DEFAULT: 'var(--destructive)',
            foreground: 'var(--destructive-foreground)',
          },
          border: 'var(--border)',
          input: 'var(--input)',
          ring: 'var(--ring)',
        },
        keyframes: {
          "accordion-down": {
            from: { height: "0px", opacity: "0" },
            to: { height: "var(--radix-accordion-content-height)", opacity: "1" },
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
            to: { height: "0px", opacity: "0" },
          },
        },
        animation: {
          "accordion-down": "accordion-down 0.6s ease-out", // Increased from 0.3s
          "accordion-up": "accordion-up 0.6s ease-in", // Increased from 0.3s
        },
      },
    },
    plugins: [],
  };
  