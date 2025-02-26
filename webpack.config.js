const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    devtool: "cheap-module-source-map",
    entry: {
        popup: path.resolve('./src/popup/popup.tsx'),
        background: path.resolve('./src/background/background.js'),
        content: path.resolve('./src/content/content.js'),
        automation: path.resolve('./src/content/automation.js'),

    },
    module: {
        rules: [
            {
                use: "ts-loader",
                test: /\.tsx$/,
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: path.resolve('src/assets/manifest.json'), to: path.resolve('dist') },
                { from: path.resolve('src/assets/icon-16.png'), to: path.resolve('dist') },
                { from: path.resolve('src/assets/icon-48.png'), to: path.resolve('dist') },
                { from: path.resolve('src/assets/icon-128.png'), to: path.resolve('dist') },
            ]
        }),
        new HtmlWebpackPlugin({
            title: "Link Ginie",
            filename: "popup.html",
            chunks: ["popup"]
        })
    ],
    resolve: {
        extensions: [".js", ".ts", ".tsx"]
    },
    output: {
        filename: "[name].js"
    }
}