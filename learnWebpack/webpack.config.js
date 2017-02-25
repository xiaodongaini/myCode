var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH,'app');
var BUILD_PATH = path.resolve(ROOT_PATH,'build');
var TEM_PATH = path.resolve(ROOT_PATH, 'templates');

module.exports = {
	entry:{
		app: path.resolve(APP_PATH,'index.js'),
		mobile: path.resolve(APP_PATH,'mobile.js'),
		vendors: ['jquery','moment']
	},
	output:{
		path: BUILD_PATH,
		filename:'[name].[hash].js'
	},
	plugins:[
		new HtmlwebpackPlugin({
			title: 'Hello World app',
			template: path.resolve(TEM_PATH,'index.html'),
			filename: 'index.html',
			chunks: ['app','vendors'],
			inject: 'body'
		}),
		new HtmlwebpackPlugin({
			title: 'Hello Mobile app',
			template: path.resolve(TEM_PATH,'mobile.html'),
			filename: 'mobile.html',
			chunks: ['mobile','vendors'],
			inject: 'body'
		}),
		//使用uglifyJs压缩代码
		new webpack.optimize.UglifyJsPlugin({
			minimize:true
		}),
		//把入口文件里面的vendors数组打包成vendors.js
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendors',
			filename: 'vendors-[hash].min.js'
		}),
		new webpack.ProvidePlugin({
			$:"jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery"
		})
	],
	// devtool: 'eval-source-map',
	devServer:{
		hot:true,
		inline:true
	},
	module:{
		rules:[
			{
				test: /\.css$/,
				use: [
					{
						loader: "style-loader"
					},
					{
						loader:"css-loader",
						options:{
							modules:true
						}
					}
					// "style-loader",
					// "css-loader"
				],
				include: APP_PATH
			},
			{
				test: /\.scss$/,
				use:[
					"style-loader",
					"css-loader?sourceMap",
					"sass-loader?sourceMap"
				],
				include: APP_PATH
			},
			{
				test: /\.(png|jpg)$/,
				use: [
					"url-loader?limit = 40000"
				]
			},
			{
				test: /\.jsx?$/,
				use: [
					"babel-loader"
				],
				include: APP_PATH
			}
		]
	}
};