const { useState } = require('react');

require('dotenv').config();
module.exports = {
  siteMetadata: {
    title: `Gloss`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [{
    resolve: "gatsby-plugin-firebase",
      options: {
        credentials: {
          apiKey: "AIzaSyAfnxyM2o2uNrcunKE2ZocNep5HFc8PauU",
          authDomain: "gloss-d2259.firebaseapp.com",
          databaseURL: "https://gloss-d2259-default-rtdb.firebaseio.com",
          projectId: "gloss-d2259",
          storageBucket: "gloss-d2259.appspot.com",
          messagingSenderId: "182288273607",
          appId: "1:182288273607:web:9c94b8575519922dffaee2",
          measurementId: "G-QLYK7M8RG3"
        }
      }
    },
    ],
}