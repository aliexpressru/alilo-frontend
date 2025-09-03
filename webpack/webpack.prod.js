const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = (env, argv) =>
	merge(common(env, argv), {
		mode: "production",
		optimization: {
			minimizer: [
				new CssMinimizerPlugin({
					parallel: 4,
				}),
			],
			runtimeChunk: 'single',
			splitChunks: {
				cacheGroups: {
				  vendor: {
					test: /node_modules/,
					chunks: 'initial',
					name: 'vendor',
					enforce: true
				  },
				}
			  },
		},
	});
