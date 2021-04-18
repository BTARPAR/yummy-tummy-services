const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

const webpackConfig = {
    entry: './checkAuth.js',
    target: 'node',
    plugins: [
        new CleanWebpackPlugin()
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'checkAuth.js'
    },
    context: path.resolve(__dirname, '.'),
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /(node_modules)/,
                use: [
                    'babel-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js']
    }
}

module.exports = webpackConfig