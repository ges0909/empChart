const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// assets.js
const Assets = require('./assets');

module.exports = {
  context: path.resolve(__dirname, 'src'), // __dirname refers to the directory where' webpack.config.js' lives
  entry: {
    // use relative pathes only
    chart: './js/chart.js',
    story: './js/story.js'
    // story_1_1: './public_html/story_1_1.html',
    // story_1_4: './public_html/story_1_4.html',
    // story_1_5: './public_html/story_1_5.html',
    // story_1_6: './public_html/story_1_6.html',
    // story_1_6_1: './public_html/story_1_6_1.html',
    // story_2_1: './public_html/story_2_1.html',
    // story_2_2: './public_html/story_2_1.html'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin(
      Assets.map(asset => {
        return {
          from: path.resolve(__dirname, `./node_modules/${asset}`),
          to: path.resolve(__dirname, 'dist/ext')
        };
      })
    )
  ]
};