const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// assets.js
const Assets = require('./assets');

module.exports = {
  entry: {
    // use relative pathes only
    story_1_1: './public_html/story_1_1.html',
    story_1_4: './public_html/story_1_4.html',
    story_1_5: './public_html/story_1_5.html',
    story_1_6: './public_html/story_1_6.html',
    story_1_6_1: './public_html/story_1_6_1.html',
    story_2_1: './public_html/story_2_1.html',
    story_2_2: './public_html/story_2_1.html'
  },
  output: {
    path: __dirname + '/public_html/',
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      { test: /\.html$/, use: 'html-loader' }
    ]
  },
  plugins: [
    new CopyWebpackPlugin(
            Assets.map(asset => {
              return {
                from: path.resolve(__dirname, `./node_modules/${asset}`),
                to: path.resolve(__dirname, './public_html/ext')
              };
            })
            )
  ]
};
