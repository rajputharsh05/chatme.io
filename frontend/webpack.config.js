// webpack.config.js
const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      "crypto": false,
      "stream": false,
      "buffer": false,
    },
  },
};


