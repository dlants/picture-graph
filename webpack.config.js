// `CheckerPlugin` is optional. Use it if you want async error reporting.
// We need this plugin to detect a `--watch` mode. It may be removed later
// after https://github.com/webpack/webpack/issues/3460 will be resolved.
// const { CheckerPlugin } = require('awesome-typescript-loader')

const transformInferno = require("ts-transform-inferno").default
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },

  devtool: 'source-map',

  devServer: {
    contentBase: "src/",
    historyApiFallback: true
  },

  resolve: {
    extensions: [ '.tsx', '.ts', '.js' , '.json'],
  },

  module: {
    rules: [
      {
        test: /\.tsx$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          getCustomTransformers: () => ({
            before: [transformInferno()]
          })
        }
      }, {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: "body"
    })
  ]
};
