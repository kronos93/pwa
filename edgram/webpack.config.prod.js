import webpack from 'webpack';
import { resolve, join } from 'path'; //http://tips.tutorialhorizon.com/2017/05/01/path-join-vs-path-resolve-in-node-js/

import glob from 'glob-all';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import PurifyCSSPlugin from 'purifycss-webpack';

const srcDir = resolve(__dirname, 'src');
const publicDir = resolve(__dirname, 'public');

export default {
  context: srcDir,
  devtool: 'hidden-source-map',
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
    contentBase: publicDir,
    publicPath: '/',
    historyApiFallback: true,
    compress: true,
    open: true,
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'resolve-url-loader',
            'postcss-loader?sourceMap',
            'sass-loader?sourceMap'
          ],
          publicPath: './'
        })
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
    new webpack.HashedModuleIdsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin({
      filename: 'style.css',
      disable: false,
      allChunks: true
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: { discardComments: { removeAll: true } }
    }),
    new PurifyCSSPlugin({
      paths: glob.sync([
        join(__dirname, 'src/*.html'),
        join(__dirname, 'src/**/*.js')
      ]),
      purifyOptions: { whitelist: ['.fa-github'] }
    }),
    new HtmlWebpackPlugin({
      template: join(srcDir, 'template.html'),
      filename: 'index.html',
      title: 'Webpack Starter Kit - Vanilla JS',
      description: 'Bienvenid@s, esta aplicación fue construida con Webpack, Vanilla JS y la filosofía de los componentes web.',
      favicon: './assets/img/favicon.ico',
      hash: true,
      minify: {
        collapseWhitespace: true,
        removeComments: true
      },
      chunks: ['script']
    }),
    new HtmlWebpackPlugin({
      template: join(srcDir, 'template.html'),
      filename: 'another.html',
      title: 'Webpack Starter Kit - React',
      description: 'Bienvenid@s, esta aplicación fue construida con Webpack, React y la filosofía de los componentes web.',
      favicon: './assets/img/favicon.ico',
      hash: true,
      minify: {
        collapseWhitespace: true,
        removeComments: true
      },
      chunks: ['another_script']
    })
  ]
}
