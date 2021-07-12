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
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    // without additional settings, this will reference .babelrc
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'public/index.html'
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        // port: 3000
    },
    devtool: 'source-map'
};