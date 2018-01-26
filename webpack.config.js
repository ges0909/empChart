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
    // story_1_1: './story_1_1.html',
    // story_1_4: './story_1_4.html',
    // story_1_5: './story_1_5.html',
    // story_1_6: './story_1_6.html',
    // story_1_6_1: './story_1_6_1.html',
    // story_2_1: './story_2_1.html',
    // story_2_2: './story_2_1.html'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /\.js$/i,
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