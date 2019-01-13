'use strict';

module.exports = {
  plugins: ['typescript'],
  modify: (config, { target, dev }, webpack) => {
    const appConfig = config;

    // 打包所有依赖，包括react
    if (target === 'node') {
      appConfig.externals = []
    }

    return appConfig;
  },
};
