/**
 * Created by Administrator on 2016/2/8.
 */
var marked = require('marked');
marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
});

//marked.setOptions({
//    highlight: function (code) {
//        return require('codePrettify.js').highlightAuto(code).value;
//    }
//});

module.exports = marked;