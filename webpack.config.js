const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const config = (
    env,
    argv,
) => ({
    entry: {
                index: './src/app/index.ts',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist/'),
        publicPath: process.env.HOST_PATH || path.resolve(__dirname, 'dist/'),
    },
    mode: argv.mode || 'development',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        watchContentBase: true,
        hot: true,
        port: 8080,
    },
    devtool: argv.mode === 'production' ? false : 'source-map',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s?css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: process.env.HOST_PATH || '',
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: argv.mode !== 'production',
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [require('autoprefixer')],
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]',
                    publicPath: process.env.HOST_PATH || '/',
                },
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            chunks: ['index'],
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ],
    optimization: {
        minimizer: [new UglifyJsPlugin()],
    },
});

new webpack.DefinePlugin({
    'process.env': {
        HOST_PATH: JSON.stringify(process.env.HOST_PATH || ''),
    },
});

module.exports = config;
