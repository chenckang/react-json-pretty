var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    target: 'web',
    mode: 'development',
    entry: {
        example: "./app/Example.jsx",
        common: ['react']
    },
    output: {
        path: path.join(__dirname, 'public'),
        filename: "[name].js"
    },
    module: {
        rules: [
            {test: /\.css$/, loader: "style-loader!css-loader"},
            {test: /\.jsx?$/, loader: "babel-loader"},
            {test: /\.styl$/, loader: "style-loader!css-loader!stylus-loader"}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            inject: 'body'
        })
    ],
    devServer: {
        host: '0.0.0.0'
    }
};
