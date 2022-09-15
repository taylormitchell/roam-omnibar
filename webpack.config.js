const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devtool: "eval-cheap-source-map",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      // First Rule
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },

      // Second Rule
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader", options: { attributes: { id: "roam-omnibar" } } },
          { loader: "css-loader" },
        ],
      },
    ],
  },
};
