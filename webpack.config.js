const path = require('path')
const nodeExternals = require('webpack-node-externals')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  devtool: 'cheap-module-source-map',
  mode: 'production',
  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder

  entry: {
    bundle: './src/index.js'
  },

  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, 'dist'),
    filename: 'q-postgres.js'
  },

  resolve: {
    modules: [path.resolve('./src')]
  },

  optimization: {
    splitChunks: {
      chunks: 'async'
    },

    minimizer: [
      new TerserPlugin({
        cache: false,
        parallel: true,
        sourceMap: false,

        terserOptions: {
          warnings: false,
          beautify: false,
          comments: false,
          sourceMap: false
        }
      })
    ]
  },

  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  }
}
