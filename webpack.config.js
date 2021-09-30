const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: ["/src/main.js"],
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "main.js",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist/"),
      serveIndex: true,
    },
    port: 8080,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.(png|jpg)$/,
        type: "asset",
        parser: { dataUrlCondition: { maxSize: 15000 } },
      },
    ],
  },
};
