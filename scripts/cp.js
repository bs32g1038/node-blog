const path = require('path');
const shell = require('shelljs');

shell.cp('-Rf', path.resolve(__dirname, '../build/server.js'), path.resolve(__dirname, '../../node-blog/react-ssr'));

shell.cp('-Rf', path.resolve(__dirname, '../build/public/static/js'), path.resolve(__dirname, '../../node-blog/static'));

shell.exit(0);