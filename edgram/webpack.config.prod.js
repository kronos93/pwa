import webpack from "webpack";
import { resolve, join } from "path"; //http://tips.tutorialhorizon.com/2017/05/01/path-join-vs-path-resolve-in-node-js/

import glob from "glob-all";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin";
import PurifyCSSPlugin from "purifycss-webpack";

const srcDir = resolve(__dirname, "src");
const publicDir = resolve(__dirname, "public");

export default {
  context: srcDir,
  devtool: "hidden-source-map",
  entry: {
    script: "./index.js",
    another_script: "./another.js"
  },
  output: {
    path: publicDir,
    filename: "[name].js",
    publicPath: "./",
    sourceMapFilename: "main.map"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        use: "json-loader"
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "resolve-url-loader"
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ],
          publicPath: "./"
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg|webp)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]"
            }
          },
          {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|woff2?|mp4|mp3|txt|xml)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]"
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new ExtractTextPlugin({
      filename: "style.css",
      disable: false,
      allChunks: true
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: { discardComments: { removeAll: true } }
    }),
    new PurifyCSSPlugin({
      paths: glob.sync([
        join(__dirname, "src/*.html"),
        join(__dirname, "src/**/*.js")
      ]),
      purifyOptions: { whitelist: [".fa-github"] }
    }),
    new HtmlWebpackPlugin({
      template: join(srcDir, "template.html"),
      filename: "index.html",
      title: "Webpack Starter Kit - Vanilla JS",
      description:
        "Bienvenid@s, esta aplicación fue construida con Webpack, Vanilla JS y la filosofía de los componentes web.",
      favicon: "./assets/img/favicon.ico",
      hash: true,
      minify: {
        collapseWhitespace: true,
        removeComments: true
      },
      chunks: ["script"]
    }),
    new HtmlWebpackPlugin({
      template: join(srcDir, "template.html"),
      filename: "another.html",
      title: "Webpack Starter Kit - React",
      description:
        "Bienvenid@s, esta aplicación fue construida con Webpack, React y la filosofía de los componentes web.",
      favicon: "./assets/img/favicon.ico",
      hash: true,
      minify: {
        collapseWhitespace: true,
        removeComments: true
      },
      chunks: ["another_script"]
    })
  ],
  devServer: {
    contentBase: publicDir,
    publicPath: "/",
    historyApiFallback: true,
    compress: true,
    open: true,
    port: 3000,
    openPage: ""
  }
};
