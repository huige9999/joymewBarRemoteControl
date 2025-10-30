module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-url': {},
    'postcss-write-svg': {
      utf8: false,
    },
    'postcss-cssnext': {
      features: {
        customProperties: {
          warnings: false,
        },
      },
    },
    'postcss-px-to-viewport': {
      viewportWidth: 750,
      viewportHeight: 1334,
      unitPrecision: 3,
      viewportUnit: 'vw',
      selectorBlackList: [
        '.ignore',
        '.hairlines',
      ],
      minPixelValue: 1,
      mediaQuery: true,
      exclude: [/node_modules\/photoswipe/i],
      // "exclude": /node_modules/i

    },
    cssnano: {
      preset: 'default',
      autoprefixer: false,
      zindex: false,
    },
    'postcss-aspect-ratio-mini': {},
  },

};
