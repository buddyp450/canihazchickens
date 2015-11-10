

module.exports = {
	entry: './src/js/app.js',
	output: {
		filename: './build/bundle.js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: [
		{
			test: /\.js?$/,
		    exclude: /(node_modules|bower_components)/,
		    loader: 'babel', // 'babel-loader' is also a legal name to reference
		    query: {
		        presets: ['es2015', 'react']
			  	}
		},
		{
			test: /\.jsx?$/,
		    exclude: /(node_modules|bower_components)/,
		    loader: 'babel', // 'babel-loader' is also a legal name to reference
		    query: {
		        presets: ['es2015', 'react']
			  	}
		},
		{
			test: /\.css?$/,
			loaders: ['style', 'css']
		}
		]
	}
}

