module.exports = {
	plugins: [
		require('autoprefixer')({
			'browsers': [
				"last 10 versions",
				"Android >= 4.0",
				"ios 6"
			]
		})
	]
};