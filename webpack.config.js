const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const DEV_MODE = process.env.NODE_ENV === "development";
const SRC_DIR = path.resolve(__dirname, "src");
const BUILD_DIR = path.resolve(__dirname, "build");

const types = ["leaderboard", "mpu", "double-mpu", "mobile"];

const base = {
  mode: DEV_MODE ? "development" : "production",
  target: DEV_MODE ? "web" : "browserslist",
  stats: "minimal",
  entry: [path.join(SRC_DIR, "main.js"), path.join(SRC_DIR, "main.css")],
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|svg|pdf|woff)$/i,
        type: "asset/resource",
        generator: {
          filename: "[name][ext]",
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: DEV_MODE,
            },
          },
        ],
      },
    ],
  },
};

module.exports = types.map((type) => {
  const config = {
    ...base,
    devServer: {
      hot: true,
      devMiddleware: {
        writeToDisk: true,
      },
      static: {
        directory: BUILD_DIR,
        publicPath: "",
        watch: true,
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(SRC_DIR, "index.ejs"),
        inject: true,
        filename: "index.html",
        templateParameters: {
          type,
          mode: process.env.NODE_ENV,
        },
        minify: DEV_MODE
          ? undefined
          : {
              collapseWhitespace: true,
              removeComments: true,
              removeRedundantAttributes: true,
              removeScriptTypeAttributes: true,
              removeStyleLinkTypeAttributes: true,
              useShortDoctype: true,
            },
      }),
      new MiniCssExtractPlugin({ filename: "[name].css" }),
    ],
    output: {
      path: path.join(BUILD_DIR, type),
      clean: true,
      publicPath: "",
    },
  };
  if (!DEV_MODE) {
    //
  }
  return config;
});
