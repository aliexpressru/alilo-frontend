const webpack = require("webpack");
const config = require("./env.config.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ProgressBarWebpackPlugin = require("progress-bar-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');
// const BundleAnalyzerPlugin =
//   require("webpack-bundle-analyzer").BundleAnalyzerPlugin
// TODO потестить загрузку лоадеров
// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
// const smp = new SpeedMeasurePlugin();
const chalk = require("chalk");

module.exports = (env, argv) => {
	const isDev = argv.mode === "development";
	const isProd = argv.mode === "production";
	return {
		entry: ["./src/index.tsx"],
		output: {
			path: config.paths.buildPath,
			filename: "[name].[contenthash].js",
			publicPath: '/',
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					use: [
						{
							loader: "babel-loader",
							options: {
								presets: [
									"@babel/preset-env",
									"@babel/preset-react",
								],
							},
						},
					],
					exclude: /node_modules/,
				},
				{
					test: /\.(css|scss|sass)$/,
					use: [
						isProd ? MiniCssExtractPlugin.loader : "style-loader",
						{
							loader: "css-loader",
							options: {
								sourceMap: isDev,
							},
						},
						{
							loader: "sass-loader",
							options: {
								sourceMap: isDev,
							},
						},
					],
				},
				{
					test: /\.(png|svg|jpg|jpeg|gif)$/i,
					type: "asset/resource",
				},

				{
					test: /\.ts(x)?$/,
					loader: "ts-loader",
					options: {
						transpileOnly: true,
					},
					exclude: /node_modules/,
				},
			],
		},
		plugins: [
			new CleanWebpackPlugin(),
			new HtmlWebpackPlugin({
				template: config.paths.appHtml,
				filename: "index.html",
				title: config.constants.appTitle,
				favicon: config.paths.appFavicon,
			}),
			// TODO тянет только en момента
			new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
			new LodashModuleReplacementPlugin(),
			// TODO влияет ли на тс-лоадер
			// ускоряет проверку типов
			new ForkTsCheckerWebpackPlugin({
				typescript: {
					configFile: config.paths.appTsConfig,
				},
			}),
			// inspect bundle size
			// new BundleAnalyzerPlugin(),
			new MiniCssExtractPlugin({
				filename: "[name].[fullhash].css",
			}),
			new ProgressBarWebpackPlugin({
				format: `  :msg [:bar] ${chalk.yellow.bold(
					":percent"
				)} (:elapsed s)`,
			}),
			new ESLintPlugin({
				extensions: ['js', 'jsx', 'ts', 'tsx'],
				eslintPath: require.resolve('eslint'),
				emitWarning: false,
				emitError: true
			}),
		],
		resolve: {
			extensions: [".tsx", ".ts", ".js"],
			alias: config.aliases,
			fallback: { assert: false, util: false },
		},
		performance: {
			maxEntrypointSize: 512000,
			maxAssetSize: 512000
		}
	};
};

// return smp.wrap(config);
