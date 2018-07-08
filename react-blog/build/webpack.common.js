const path = require('path');

module.exports = {
    entry: {
        app: path.resolve(__dirname, '../src/index.js')
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [['@babel/preset-env', {
                        "targets": {
                            "node": 'current'
                        }
                    }], '@babel/preset-react'],
                    plugins: ["@babel/plugin-syntax-dynamic-import", ["import", { libraryName: "antd", style: "css" }]]
                }
            }
        }]
    },
    resolve: {
        extensions: [".js", ".jsx"]
    }
};