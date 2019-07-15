module.exports = {
    reactScriptsVersion: 'react-scripts' /* (default value) */,
    babel: {
        plugins: [
            [
                'import',
                {
                    libraryName: 'antd', //需按需打包的库
                    libraryDirectory: 'es',
                    style: 'css',
                },
            ],
        ],
    },
};
