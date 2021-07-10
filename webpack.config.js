const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './src/canvas.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'canvas_bundle.js',
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'public/index.html'
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        port: 3000
    },
    // watch: true,
    devtool: 'source-map'
};