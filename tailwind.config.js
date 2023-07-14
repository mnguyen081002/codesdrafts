/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    preflight: true,
  },
  theme: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    extend: {
      colors: {
        light: {
          primary: '#1363DF',
          dark: '#0847AA',
          hoverPrimary: '#F5F9FF',
          secondary: '#007eff',
          tertiary: '#0037ff',
          gray: '#fafafa',
          grayDarker: '#e5e5e5',
          sectionSelected: '#E7EFFC',
          text: {
            primary: '#4C4E64',
            sencondary: 'rgba(76, 78, 100, 0.68)',
            main: '#4D92FF',
            placeholder: '#adb5bd',
          },
          error: {
            main: '#FF4D49',
            background: '#ffe9e9',
            content: '#e64542',
          },
          warning: {
            main: '#FDB528',
          },
          border: '#ced4da',
        },

        dark: { 90: '#1e1e27' },
        gray: {
          100: '#f7fafc',
          200: '#edf2f7',
          300: '#e2e8f0',
          400: '#cbd5e0',
          500: '#a0aec0',
          600: '#718096',
          700: '#4a5568',
          800: '#2d3748',
          900: '#1a202c',
        },
        blue: {
          100: '#ebf8ff',
          200: '#bee3f8',
          300: '#90cdf4',
          400: '#63b3ed',
          500: '#4299e1',
          600: '#3182ce',
          700: '#2b6cb0',
          800: '#2c5282',
          900: '#2a4365',
        },
      },
      width: {
        sidebar: '120px',
      },
      padding: {
        sidebar: '120px',
      },
      borderRadius: {
        normal: '6px',
      },
      boxShadow: {
        forfun: '#7bc3f9 0px 3px 8px',
        button: '8px 8px 23px #a9b0b7, -8px -8px 23px #ffffff;',
        md: '0 1px 4px 0px rgba(0, 0, 0, 0.25)',
      },
      borderColor: {
        light: { primary: '#63b3ed' },
        selected: '#0076FF',
      },
      fontFamily: {
        table: ['Gelasio', 'sans-serif'],
        'lexend-deca': ['Lexend Deca', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        instructorSidebar: ['Plus Jakarta Sans', 'sans-serif'],
      },
      // animation: 'name duration timing-function delay iteration-count direction fill-mode play-state;
      animation: {
        'co-fast': 'fast 0.8s ease-in-out',
        'co-slow': 'slow 1.2s ease-in-out',
      },

      keyframes: {
        fast: { '0%': { width: '0' }, '100%': { width: '100%' } },
        slow: { '20%': { width: '0' }, '100%': { width: '100%' } },
      },
    },
  },
  plugins: [],
};
