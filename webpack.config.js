const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        filename: 'app.bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: {
                // attach the presets to the loader (most projects use .babelrc file instead)
                presets: ["@babel/preset-env", "@babel/preset-react"]
            }
        }],
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};