module.exports = {
    modify: (config, { target, dev }, webpack) => {
        const appConfig = config;
        if(!dev){
            config.devtool = ''
        }
        appConfig.resolve.extensions = [...appConfig.resolve.extensions, '.ts', '.tsx'];
        appConfig.module.rules[1].test = /\.(ts|js|jsx|mjs|tsx)$/;
        return appConfig;
    },
};
