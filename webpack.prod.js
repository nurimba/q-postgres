const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  devtool: '#source-map',
  debug: false,

  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder

  entry: {
    bundle: './src/q-postgres.js'
  },

  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, 'dist'),
    filename: 'q-postgres.min.js'
  },

  resolve: {
    modulesDirectories: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ]
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },

  plugins: [
    // new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.optimize.DedupePlugin(),

    // new webpack.DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: JSON.stringify('production')
    //   }
    // })

    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: true
    //   }
    // })
  ]
}
