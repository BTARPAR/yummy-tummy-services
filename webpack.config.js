const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

const webpackConfig = ({
  mode = 'development'
}, argv)=>  ({
    entry: './index.js',
    target: 'node',
    plugins: [
        new CleanWebpackPlugin()
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
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
})

module.exports = webpackConfig