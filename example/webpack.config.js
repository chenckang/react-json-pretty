var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        example: "./app/Example.jsx",
        common: ['react']
    },
    output: {
        path: path.join(__dirname, 'public'),
        filename: "[name].js"
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: "style!css"},
            {test: /\.jsx?$/, loader: "babel-loader"},
            {test: /\.json$/, loader: "json-loader"},
            {test: /\.styl$/, loader: "style!css!stylus"}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: 'body'
        })
    ]
};
