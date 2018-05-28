"use strict";
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const isDev = process.env.NODE_ENV === 'production'? false : true;
const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
/*
	获取html模板，并注入公共组件 js和css 和对应的js文件
 */
const buildHTML = () =>{
	let rlt = [];
	const _dir ='src/views';
	const arr = fs.readdirSync(path.resolve(_dir), {});
	arr.forEach((html) => {
		rlt.push(
			new HtmlWebpackPlugin({
				filename: html,
				template: `${_dir}/${html}`,
				hash: true,
				minify: {
					collapseWhitespace: !isDev,
					minifyCSS: !isDev,
					minifyJS: !isDev,
					removeComments: !isDev,
					removeEmptyAttributes: !isDev,
				},
				chunks:[
					'vendors',
					'common',
					`${html.split('.')[0]}`
				]
			})
		)
	})
	return rlt;
}
/*
	获取所有入口文件
 */
const entrys = () => {
	const _dir ='src/js';
	const arr = fs.readdirSync(path.resolve(_dir), {});
	const obj = {};
	arr.forEach((entry) => {
		obj[entry.split('.')[0]] = `./${_dir}/${entry}`;
	})
	return obj;
};
module.exports = merge({
	plugins: buildHTML()
},{
	entry: entrys(),
	output: {
		filename: "js/[name].js",
		path: __dirname + '/dist'
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					name: 'vendors',
					test: /node_modules\//,
					chunks: 'all',
					minSize: 1,
					minChunks: 2,
					enforce: true,
				},
				common: {
					name: 'common',
					test: /src\//,
					chunks: 'all',
					minSize: 1,
					minChunks: 2,
					enforce: true,
				},
			},
		},
		runtimeChunk: {
			name: 'vendors'
		},
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new ExtractTextPlugin({
			filename:  (getPath) => {
				return getPath('css/[name].css').replace('css/js', 'css');
			},
			allChunks: true
		}),
	],
	module: {
		rules: [{
			test: require.resolve('jquery'),
			use: [{
				loader: 'expose-loader',
				options: 'jQuery'
			},{
				loader: 'expose-loader',
				options: '$'
			}]
		},
			{
				test: /\.js$/,
				exclude: /node_module/,
				loader: 'babel-loader'
			},
			{
				test:/\.css/,
				use: [
					'style-loader',
					'css-loader',
				]
			},
			{
				test:/\.less/,
				use: isDev? [
					'style-loader',
					'css-loader',
					'less-loader',
				] : ExtractTextPlugin.extract({
					fallback:'style-loader',
					use: [{
						loader: 'css-loader',
						options: {
							minimize: true
						}
					},'postcss-loader','less-loader'],
					publicPath:'../'
				})
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name:'imgs/[name].[hash:4].[ext]'
				}
			},
			{
				test: /\.(eot|svg|ttf|woff)/,
				loader: 'file-loader',
				options: {
					name: 'fonts/[name].[hash:4].[ext]'
				}
			},
			{
				test: /\.html/,
				loader: 'html-loader'
			}
		]
	},
	devServer: {
		host: "0.0.0.0",
		// port: 8500,
		proxy: {

		},
		inline: true,
		hot: true,
		open: true
	}
});