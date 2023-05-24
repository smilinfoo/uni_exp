const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
    mode:'development',
    entry: './src/index.js',
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:'STARTER',
        }),
        new CopyPlugin({
            patterns: [
                { from: "public" }
            ],
        }),


    ],
    output:{
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean:true,
    },
    module:{
        rules:[
            {
                test:/\.css$/i,
                use:['style-loader', 'css-loader'],
            },
            {
                test:/\.(png|svg|jpeg|jpg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test:/\.(glb|gltf|bin)$/,
                type: 'asset/resource',
            },
            {
                test:/\.(glb|gltf|bin)$/,
                type: 'asset/resource',
            },
        ],
    },
};