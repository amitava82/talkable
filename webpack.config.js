var webpack = require('webpack');
var path = require('path');


var projectRoot = process.cwd(); // Absolute path to the project root
var resolveRoot = path.join(projectRoot, 'node_modules'); // project root/node_modules
var publicPath = './public/scripts';

var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('vendors', 'vendor.js');
var env = new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')});

var plugins = [commonsPlugin];

if(process.env.NODE_ENV == 'production'){
    plugins.push(env);
    plugins.push(new webpack.optimize.OccurenceOrderPlugin());
    plugins.push(new webpack.optimize.DedupePlugin());
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compressor: { warnings: false }
    }));
}

module.exports = {
    entry: {
        app: path.resolve(__dirname, 'client/scripts/client.js'),
        vendors: ['react', 'react-dom', 'redux-thunk', 'lodash', 'firebase',
            'redux', 'autobind-decorator']
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
        path: publicPath,
        publicPath: '/public/scripts/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: [resolveRoot],
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', "stage-1", 'react'],
                    plugins: ["transform-decorators-legacy"]
                }
            },
            { test: /\.json$/, loader: 'json' }
        ]
    },
    resolve: {
        root: [
            resolveRoot,
            path.join(__dirname, 'node_modules')
        ],
        extensions: ['', '.js', '.json']
    },
    plugins: plugins,
    modulesDirectories: [
        'node_modules'
    ]
};