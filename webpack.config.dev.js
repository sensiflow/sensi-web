const Dotenv = require('dotenv-webpack');
module.exports = {
    mode: "development",
    resolve: {
        extensions: [".js", ".ts", ".tsx"],
    },
    devServer: {
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                  'style-loader',
                  'css-loader'
                ]
              }
        ]
    },
    plugins: [
        new Dotenv({
            path: "./.env.example",
        }),
    ],
}