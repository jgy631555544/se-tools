const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const { NODE_ENV } = process.env;
const isEnvProduction = NODE_ENV === "production";
const entryPath = path.resolve(__dirname, "src");
const outputPath = path.resolve(__dirname, "lib");

// const componentPath = (name) => path.resolve(__dirname, "src", name);

const config = {
  mode: NODE_ENV,
  bail: true,
  entry: {
    index: entryPath,
  },
  output: {
    path: outputPath,
    filename: "[name].js",
    library: "se-tools",
    libraryTarget: "umd",
    globalObject: "this",
  },
  externals: [],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    alias: { "@": entryPath },
  },
  plugins: [],
  module: {
    strictExportPresence: true,
    rules: [
      { parser: { requireEnsure: false, system: false } },
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: entryPath,
        exclude: /node_modules/,
        loader: require.resolve("babel-loader"),
        options: {
          cacheDirectory: true,
          cacheCompression: false,
          compact: isEnvProduction,
        },
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          isEnvProduction ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|bmp|webm)(\?\S*)?$/,
        loader: "url-loader",
        options: {
          limit: 8192,
          name: "[name].[ext]",
        },
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader",
        options: {
          limit: 8192,
          name: "[name].[ext]",
        },
      },
    ],
  },
  stats: {
    errorDetails: true,
  },
  devtool: isEnvProduction ? false : "source-map",
  devServer: {
    https: true,
    allowedHosts: "all",
    host: "localhost",
    port: "8008",
    hot: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    overlay: true,
  },
};

module.exports = config;
