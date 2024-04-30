const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { Template } = require('webpack');

module.exports = {
  mode: 'development',
  entry: './index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        use: ['svg-inline-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.scss'],
  },
  plugins: [
    new HtmlWebpackPlugin({template: "index.html", filename: '../index.html'}),
    new Dotenv(),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../backend/static/assets'),
    // publicPath: path.resolve(__dirname, '../backend/static/assets'),
  },
  devServer: {
    hot: true,
    open:true,
    static: {
      directory: "../backend/static",
    },
  },
};