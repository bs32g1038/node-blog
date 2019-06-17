const path = require('path');
const shell = require('shelljs');

shell.cp('-Rf', path.resolve(__dirname, '../dist/*'), path.resolve(__dirname, '../../node-blog/static/admin'));

shell.exit(0);