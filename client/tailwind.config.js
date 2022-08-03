module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      mobile: '375px',
      tablet: '640px',
      // => @media (min-width: 640px) { ... }

      laptop: '1024px',
      // => @media (min-width: 1024px) { ... }

      desktop: '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      colors: {
        reddit_orange: '#f54404',
        reddit_red: '#f54404',
        reddit_dark: {
          DEFAULT: '#030303',
          brighter: '#1a1a1a',
          brightest: '#272728',
        },
        reddit_border: {
          DEFAULT: '#343536',
        },
        reddit_text: {
          DEFAULT: 'rgb(215, 218, 220)',
          darker: '#818384',
        },
      },
    },
  },
  plugins: [],
};
