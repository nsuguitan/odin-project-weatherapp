const path = require('path');
const webpack = require('webpack');
const nodeExternals = require("webpack-node-externals");
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve:{
    fallback: {
        "fs": false,
        "tls": false,
        "net": false,
        "path": false,
        "zlib": false,
        "http": false,
        "https": false,
        "stream": false,
        "crypto": false,
        "util":false,
        "buffer":false,
        "url":false,
        "vm":false,
        "querystring":false,
        "module":false,
        "os":false,
        "esbuild":false,
        "uglify-js":false
      } 
  },
  externalsPresets: { node: true },  
  externals: [nodeExternals()], 
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
     {
       test: /\.(png|svg|jpg|jpeg|gif)$/i,
       type: 'asset/resource',
     },
    ],
    // env:{
    //     WEATHER_API_KEY: process.env.WEATHER_API_KEY,
    // }
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new Dotenv({
        path: './.env', // Path to .env file (this is the default)
    })
  ]
};