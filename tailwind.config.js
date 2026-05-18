module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "rgb(var(--color-primary) / <alpha-value>)",
          light: "rgb(var(--color-primary-light) / <alpha-value>)",
          dark: "rgb(var(--color-primary-dark) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--color-accent) / <alpha-value>)",
          light: "rgb(var(--color-accent-light) / <alpha-value>)",
          dark: "rgb(var(--color-accent-dark) / <alpha-value>)",
        },
        danger: {
          DEFAULT: "rgb(var(--color-danger) / <alpha-value>)",
          light: "rgb(var(--color-danger-light) / <alpha-value>)",
          dark: "rgb(var(--color-danger-dark) / <alpha-value>)",
        },
        neutral: "rgb(var(--color-neutral) / <alpha-value>)",
        info: "rgb(var(--color-info) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        background: "rgb(var(--color-background) / <alpha-value>)",
        border: "rgb(var(--color-border) / <alpha-value>)",
        main: "rgb(var(--color-text) / <alpha-value>)", // Adaptive main text color
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'sm': '2px',
        'md': '4px',
        'lg': '8px',
        'xl': '12px',
        '2xl': '16px',
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
      },
      fontSize: {
        'label': ['0.72rem', { letterSpacing: '0.08em', fontWeight: '600' }],
        'body': ['0.95rem', { lineHeight: '1.6', fontWeight: '400' }],
        'h1': ['1.9rem', { fontWeight: '500' }],
        'display': ['3.5rem', { letterSpacing: '-0.02em', fontWeight: '500' }],
      }
    },
  },
  plugins: [],
}