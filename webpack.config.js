const path = require('path');
const WebpackBundleAnalyzer = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        main: './src/index.ts'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        chunkFilename: "[id].[chunkhash].js"
    },
    devServer: {
        static: './dist',
    },
    plugins: [
        //new WebpackBundleAnalyzer(),
        new HtmlWebpackPlugin(),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all",
                    reuseExistingChunk: true,
                    idHint: "vendors",
                    maxSize: 50000,
                }
            }
        }
    }
};