'use strict';
const yargs = require('yargs');
const shelljs = require('shelljs');
const path = require('path');
const fs = require('fs');
module.exports = () => {
	const cpFile = () => {
		const targetDir = shelljs.pwd() + '/';
		const srcDir = path.join(__dirname, './template/');
		shelljs.exec(`cp -rf ${srcDir} ${targetDir}`,function(code, stdout, stderr) {
			console.log('文件拷贝完毕！');
			console.log('初始化依赖包-start！')
			shelljs.exec('npm install', function() {
				console.log('初始化依赖包-end！')
				console.log('初始化完毕！')
			})
		});
	}
	const logo = [
		'   _   _   _   _   _  ',
		'  / \\ / \\ / \\ / \\ / \\ ',
		' ( A | R | I | E | S )',
		'  \\_/ \\_/ \\_/ \\_/ \\_/ ',
		'   欢迎使用Aries模板    ',
	].join('\n');
	const argv = yargs.command('init', '初始化 项目', function(options) {
		shelljs.echo(logo);
		cpFile();
	}).command('dev', '本地调试开始', function(options) {
		console.log(options.argv, '本地调试开始');
	}).help('h')
	.alias('h', 'help')
	.epilog('copyright 2018')
	.argv;
};

