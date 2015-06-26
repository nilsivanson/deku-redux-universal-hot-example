var webpack = require('webpack');
var path = require('path');
var loaders = require('./loaders');

module.exports = {
    name: 'browser',
    target: 'web',
    cache: false,
    context: __dirname,
    devtool: false,
    entry: ['./src/client'],
    output: {
        path: path.join(__dirname, 'static/dist'),
        filename: 'client.js',
        chunkFilename: 'client.[name].js',
        publicPath: 'dist/'
    },
    module: {
        loaders: loaders.concat([
            {
                include: /\.js$/,
                loaders: ['babel-loader?stage=0&optional=runtime&plugins=typecheck'],
                exclude: /node_modules/
            }])
    },
    plugins: [
        new webpack.DefinePlugin({__CLIENT__: true, __SERVER__: false}),
        new webpack.DefinePlugin({'process.env': {NODE_ENV: '"production"'}}),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ],
    resolve: {
        modulesDirectories: [
            'src',
            'node_modules'
        ],
        extensions: ['', '.json', '.js']
    },
    node: {
        __dirname: true,
        fs: 'empty'
    }
};
