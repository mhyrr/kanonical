/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./layouts/**/*.html",
    "./content/**/*.md",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Catppuccin-inspired palette with warmth
      colors: {
        // Light mode (Catppuccin Latte - warm)
        latte: {
          base: '#eff1f5',
          surface: '#e6e9ef',
          overlay: '#dce0e8',
          text: '#4c4f69',
          subtext: '#6c6f85',
        },
        // Dark mode (Catppuccin Mocha - cozy)
        mocha: {
          base: '#1e1e2e',
          surface: '#313244',
          overlay: '#45475a',
          text: '#cdd6f4',
          subtext: '#a6adc8',
        },
        // Warm accent colors from Catppuccin
        peach: '#fab387',
        yellow: '#f9e2af',
        maroon: '#eba0ac',
        flamingo: '#f2cdcd',
        mauve: '#cba6f7',
        teal: '#94e2d5',
        green: '#a6e3a1',
        // Semantic aliases
        primary: '#fab387',      // Peach - warm, inviting
        secondary: '#eba0ac',    // Maroon - subtle warmth
        accent: '#f9e2af',       // Yellow - highlights
      },
      fontFamily: {
        serif: ['Libre Baskerville', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: theme('colors.mocha.text'),
            a: {
              color: theme('colors.peach'),
              textDecoration: 'underline',
              textUnderlineOffset: '2px',
              '&:hover': {
                color: theme('colors.yellow'),
              },
            },
            strong: {
              color: theme('colors.flamingo'),
            },
            h1: {
              color: theme('colors.mocha.text'),
            },
            h2: {
              color: theme('colors.mocha.text'),
            },
            h3: {
              color: theme('colors.mocha.text'),
            },
            blockquote: {
              borderLeftColor: theme('colors.peach'),
              color: theme('colors.mocha.subtext'),
            },
            code: {
              color: theme('colors.flamingo'),
              backgroundColor: theme('colors.mocha.surface'),
              padding: '0.125rem 0.375rem',
              borderRadius: '0.25rem',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: theme('colors.mocha.surface'),
              color: theme('colors.mocha.text'),
            },
          },
        },
        // Light mode overrides
        latte: {
          css: {
            color: theme('colors.latte.text'),
            a: {
              color: '#d06b00', // Darker peach for light mode
            },
            strong: {
              color: '#b44a5a', // Darker flamingo
            },
            h1: { color: theme('colors.latte.text') },
            h2: { color: theme('colors.latte.text') },
            h3: { color: theme('colors.latte.text') },
            blockquote: {
              borderLeftColor: '#d06b00',
              color: theme('colors.latte.subtext'),
            },
            code: {
              color: '#b44a5a',
              backgroundColor: theme('colors.latte.surface'),
            },
            pre: {
              backgroundColor: '#313244',
              color: '#cdd6f4',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
