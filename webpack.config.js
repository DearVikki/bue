/**
 * Created by youngwind on 16/8/1.
 */

const webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    // watch: true,
    mode: 'development',
    entry: {
        index: ['./src/index.js'],
        example: ['./example/index.js']
    },
    output: {
        path: __dirname + '/dist',
        filename: "[name].js"
    },
    devServer: {
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: './example/index.html'
            }
        ], {}),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
};
