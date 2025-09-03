const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const config = require("./env.config");

module.exports = (env, argv) =>
	merge(common(env, argv), {
		mode: "development",
		output: {
			path: config.paths.buildPath,
			filename: "[name].bundle.js",
		},
		infrastructureLogging: {
			debug: [name => name.includes('webpack-dev-server')],
		},
		devtool: "eval",
		devServer: {
			proxy: {
				"/v1": {
					target: 'http://localhost:8084',
					changeOrigin: true,
					logLevel: "info",
				},
				"/api": {
					target: 'https://localhost:8084',
					changeOrigin: true,
					logLevel: "info",
				},
				"/v3": {
					target: 'http://localhost:8084',
					changeOrigin: true,
					logLevel: "info",
					pathRewrite: { '/v3': '/v1' }
				},
				"/v4": {
					target: 'http://localhost:8084',
					changeOrigin: true,
					logLevel: "info",
					pathRewrite: { '/v4': '/v1' }
				},
				"/v5": {
					target: 'http://localhost:8084',
					changeOrigin: true,
					logLevel: "info",
					pathRewrite: { '/v5': '' }
				},
			},
			historyApiFallback: true,
			port: 8080,
		},
	});
