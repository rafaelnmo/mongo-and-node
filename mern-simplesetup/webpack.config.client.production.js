const path = require("path");
const webpack = require("webpack");
const CURRENT_WORKING_DIR = process.cwd();

const config = {
	mode: "production",
	//	entry: [path.join(CURRENT_WORKING_DIR, "client/main.js")],
	entry: [path.join(CURRENT_WORKING_DIR, "src/index.js")],
	output: {
		path: path.join(CURRENT_WORKING_DIR, "/dist"),
		filename: "bundle.js",
		publicPath: "/dist/",
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: ["babel-loader"],
			},
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.svg$/,
				loader: "svg-inline-loader",
			},
		],
	},
};

module.exports = config;
