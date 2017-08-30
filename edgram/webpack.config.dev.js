import webpack from 'webpack';
import { resolve, join } from 'path'; //http://tips.tutorialhorizon.com/2017/05/01/path-join-vs-path-resolve-in-node-js/

import HtmlWebpackPlugin from 'html-webpack-plugin';
import ReloadPlugin from 'reload-html-webpack-plugin';

const srcDir = resolve(__dirname, 'src');
const publicDir = resolve(__dirname, 'public');

export default {
  context: srcDir,
  devtool: 'source-map',
  entry: {
    script: './index.js',
    another_script: './another.js'
  },
  output: {
    path: publicDir,
    filename: '[name].js',
    publicPath: './',
    sourceMapFilename: 'main.map'
  },
  devServer: {
    contentBase: srcDir,
    publicPath: '/',
    historyApiFallback: true,
    compress: true,
    open: true,
    hot: true,
    stats: 'errors-only',
    port: 3000,
    openPage: ''
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        use: 'json-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'resolve-url-loader',
          'sass-loader?sourceMap'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg|webp)$/i,
        use: [
          'file-loader?name=[path][name].[ext]',
          'image-webpack-loader?bypassOnDebug'
        ]
      },
      {
        test: /\.(ttf|eot|woff2?|mp4|mp3|txt|xml)$/,
        use: 'file-loader?name=[path][name].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new ReloadPlugin(),
    new HtmlWebpackPlugin({
      template: join(srcDir, 'template.html'),
      filename: 'index.html',
      chunks: ['script']
    }),
    new HtmlWebpackPlugin({
      template: join(srcDir, 'template.html'),
      filename: 'another.html',
      chunks: ['another_script']
    })
  ]
}
