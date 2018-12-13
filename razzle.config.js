'use strict';

module.exports = {
  plugins: ['typescript'],
  modify: (config, { target, dev }, webpack) => {
    // do something to config
    // if (config.devServer) {
    //   Object.assign(config.devServer, {
    //     proxy: {
    //       '/api/*': {
    //         target: 'http://127.0.0.1:8080',
    //         secure: false,
    //         changeOrigin: true
    //       },
    //       '/static/upload': {
    //         target: 'http://127.0.0.1:8080',
    //         secure: false,
    //         changeOrigin: true
    //       }
    //     }
    //   })

    // }

    if(target === 'node'){
      config.externals = []
    }

    return config;
    //   proxy: {
    //     '/api': {
    //         target: 'http://127.0.0.1:8080',
    //         secure: false,
    //         changeOrigin: true
    //     },
    //     '/static/upload': {
    //         target: 'http://127.0.0.1:8080',
    //         secure: false,
    //         changeOrigin: true
    //     }
    // },
  },
};
