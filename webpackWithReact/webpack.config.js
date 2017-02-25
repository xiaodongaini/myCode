var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH,'app');
var BUILD_PATH = path.resolve(ROOT_PATH,'build');

module.exports = {
	entry:{
		app:path.resolve(APP_PATH,'index.jsx')
	},
	output:{
		path:BUILD_PATH,
		filename:'bundle.js'
	},
	devtool:'eval-source-map',
	module:{
		rules:[
			{
				test:/\.jsx?$/,
				use:[
					"babel-loader"
				],
				include:APP_PATH
			},
			{
				test: /\.scss$/,
				use:[
					"style-loader",
					"css-loader",
					"sass-loader"
				]
			}
		]
	},
	plugins:[
		new HtmlwebpackPlugin({
			title: 'My first react app'
		})
	],
	resolve:{
		extensions:['.js','.jsx']
	}
}