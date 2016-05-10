module.exports = {
    entry: './src/main.js',
    output: {
        path: 'build/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.scss$/,
            loader: 'style!css?sourceMap!sass?sourceMap'
        }]
    }
};