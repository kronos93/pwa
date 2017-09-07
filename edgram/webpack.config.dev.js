import webpack from "webpack";
import { resolve, join } from "path"; //http://tips.tutorialhorizon.com/2017/05/01/path-join-vs-path-resolve-in-node-js/

import HtmlWebpackPlugin from "html-webpack-plugin";
import ReloadPlugin from "reload-html-webpack-plugin";

const srcDir = resolve(__dirname, "src");
const publicDir = resolve(__dirname, "public");

export default {
  context: srcDir,
  devtool: "source-map",
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
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        use: "json-loader"
      },
      {
        //https://webpack.js.org/loaders/sass-loader/
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "resolve-url-loader"
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
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
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    // new ReloadPlugin(),
    new HtmlWebpackPlugin({
      template: "./template.html",
      filename: "index.html",
      chunks: ["script"]
    }),
    new HtmlWebpackPlugin({
      template: "./template.html",
      filename: "another.html",
      chunks: ["another_script"]
    }),
    // function(){
    //   this.plugin('compilation', function(compilation) {
    //     console.log('The compiler is starting a new compilation...');
    //     console.log(this.options);

    //   });
    // }
  ],
  devServer: {
    contentBase: srcDir,
    publicPath: "/",
    historyApiFallback: true,
    compress: true,
    open: true,
    hot: true,
    stats: "errors-only",
    port: 3000,
    openPage: ""
  }
};
