const Dotenv = require('dotenv-webpack');
module.exports = {
    mode: "production",
    resolve: {
        extensions: [".js", ".ts", ".tsx"],
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