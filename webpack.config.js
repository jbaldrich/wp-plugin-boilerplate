const path = require('path');

// Include the js minification plugin.
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// Include the css extraction and minification plugins.
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

// Main configuration.
const config = {
	mode: 'production',
	output: {
		filename: 'plugin-name-[name].min.js'
	},
	module: {
		rules: [
			// Perform js babelization on all .js files.
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			// Compile all .scss files to plain old css.
			{
				test: /\.(sass|scss)$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader'
				]
			}
		]
	},
	optimization: {
		minimizer: [
			// Enable the js minification plugin.
			new UglifyJSPlugin({
				cache: true,
				parallel: true
			}),
			// Enable the css minification plugin.
			new OptimizeCSSAssetsPlugin({})
		]
	},
	plugins: [
		// Extract css into dedicated file.
		new MiniCssExtractPlugin({
			filename: '../css/plugin-name-[name].min.css'
		})
	]
};

// Admin configuration.
const admin = {
	...config,
	entry: {
		admin: [
			'./admin/src/main-admin.js',
			'./admin/src/sass/main-admin.scss',
		]
	},
	output: {
		...config.output,
		path: path.resolve(__dirname, 'admin/js')
	}
};

// Public configuration.
const public = {
	...config,
	entry: {
		public: [
			'./public/src/main-public.js',
			'./public/src/sass/main-public.scss',
		]
	},
	output: {
		...config.output,
		path: path.resolve(__dirname, 'public/js')
	}
};

module.exports = [
	admin,
	public
];
