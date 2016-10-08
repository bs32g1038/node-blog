JSHL.language = JSHL.language || {};
JSHL.language.javascript = {
    //文档注释 --> 普通注释 --> 字符串 --> 关键字--> 变量 --> 内置对象-->数字-->boolean-->操作符
    //cls : ['js-doc','js-com','js-str','js-key'/*,'js-var'*/,'js-obj','js-num','js-bol','js-ope'],
    reg: {
        'doc': /.?(\/\*{2}[\s\S]*?\*\/)/, //文档注释
        'com': /(\/\*(?!\*)[\s\S]*?\*\/|\/\/.*)/, //普通注释
        'str': /('(?:(?:\\'|[^'\r\n])*?)'|"(?:(?:\\"|[^"\r\n])*?)")/, //字符串
        'key': /(?:[^\$_@\w])(break|delete|function|return|typeof|arguments|case|do|if|switch|var|catch|else|in|this|void|continue|instanceof|throw|while|debugger|finally|new|with|default|for|null|try)(?![$_@\w])/, //关键字
        'obj': /(?:[^\$_@\w])(Array|String|Date|Math|Boolean|Number|Function|Global|Error|RegExp|Object|window|document)(?:[^$_@\w])/, //内置对象
        'num': /\b(\d+(?:\.\d+)?(?:[Ee][-+]?(?:\d)+)?|NaN|Infinity)\b/, //数字
        'bol': /(?:[^$_@\w])(true|false)(?:[^$_@\w])/, //布尔值
        'ope': /(==|=|===|\+|-|\+=|-=|\*=|\\=|%=|&lt;|&lt;=|&gt;|&gt;=)/ //操作符
    }
}
JSHL.language.html = {
    cls: ['com', 'mrk', 'attr', 'val'],
    reg: {
        'com': /(&lt;\!--[\s\S]*?--&gt;)/, //注释
        'mrk': /(&lt;\/?\w+(?:.*?)&gt;)/ //标签
    },
    markup: true // markup support
        ,
    include: [{
        lang: 'javascript',
        wrapper: /<script>([\s\S]*?)<\/script>/g
    }, {
        lang: 'css',
        wrapper: /<style>([\s\S]*?)<\/style>/g
    }]
}
JSHL.language.css = {
    cls: ['com', 'attr', 'key', 'val'],
    reg: {
        'com': /(\/\*[\s\S]*?\*\/)/, //注释
        //'key' : /((?:\.|#)?(?:\w+(?:[,\s:#\w\.]+)?)+){/,  //选择器
        'key': /([^{\n\$\|]*?){/, //选择器
        'obj': /(?:([\w-]+?)\s*\:([\w\s"',\-\#]*))/ //属性名：属性值
    }
}

/**
 * 扩展语言
 * @param {String} langName 语言名称
 * @param {Object} langObj  配置参数
 */
JSHL.extendLanguage = function(langName, langObj) {
    JSHL.language[langName] = langObj;
    if (langObj.wrapper) {
        JSHL.language[langObj.wrapper].include.push(langObj.content);
    }
    JSHL(langName);
}

function JSHL(langName) {
    var pres = document.getElementsByTagName('pre'),
        len = pres.length,
        pre = null,
        index = 0,
        lang = 'javascript',
        html, outer;

    /**
     * 转义html字符
     * @param {String} html 要转义的html代码
     * @returns {String} 转义后的html字符串
     */
    function parseHTML(html) {
        return html.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/(\r?\n)$/g, '');
    }

    /**
     * 添加行号
     * @param {Number} nums 行数
     * @returns {string}
     */
    function addLineNumber(nums) {
        var html = ['<div class="', 'jshl-linenum', '">'],
            i = 1;
        for (; i < nums; i += 1) html.push(i + ' <br/>');
        html.push(nums, ' </div>');
        return html.join('')
    }
    /**
     * 根据语言高亮代码
     * @param {String} html
     * @param {String} lang
     * @param {Boolean} findParent
     * @returns {*}
     */
    function hlbylanguage(html, lang, findParent) {
        //var ln = addLineNumber(html.split('\n').length);
        if (!(lang in JSHL.language))
            return html + (findParent ? addLineNumber(html.split('\n').length) : '')
        var l = JSHL.language[lang];
        if (findParent && l.wrapper) l = JSHL.language[l.wrapper];
        if (!l) return html + (findParent ? addLineNumber(html.split('\n').length) : '')
        html = ' ' + html + ' ';

        var ln = /(&lt;div class="?jshl-linenum"?&gt;(?:.*?)&lt;\/div&gt;)/ig;

        if (ln.test(html)) { //已经加入了行号
            html = html.replace(ln, '{@jshl-linenum@}');
        }
        var //start = new Date(),
            pattern = l.reg,
            markup = l.markup,
            cls = l.cls || [],
            defaultCls = (cls.length === 0),
            inc = l.include,
            olanghl = [],
            placeholder = [],
            pl = '',
            wrapper,
            //  文档注释 --> com --> mrk --> 关键字-->vars -->内置对象-->数字-->boolean-->操作符
            type = ['doc', 'com', 'mrk', 'str', 'key', 'var', 'obj', 'num', 'bol', 'ope'],
            p = [],
            len = type.length,
            i = 0;

        /*if(cls.length === 0 || pattern.length === 0){
            return
         }*/
        for (; i < len; i += 1) {
            if (pattern[type[i]]) {
                p.push(pattern[type[i]].source); //正则表达式
                defaultCls && cls.push(type[i]); //对应的类名
            }
        }
        pattern = new RegExp(p.join("|"), 'g');

        //提取其他语言的代码
        if (inc && inc.length > 0) {
            for (i = 0; i < inc.length; i += 1) {
                wrapper = new RegExp(inc[i].wrapper.source.replace(/</g, '&lt;').replace(/>/g, '&gt;'), 'gi');
                html = html.replace(wrapper, function($0, $1) {
                    pl = '{@' + Math.random() + '@}';
                    placeholder.push(pl);
                    olanghl.push(hlbylanguage($1, inc[i].lang, false))
                    return $0.replace($1, pl);
                });
            }
        }
        html = html.replace(pattern, function() {
            var args = Array.prototype.slice.call(arguments, 0),
                currArg1 = null,
                currArg = null,
                len = args.length - 2,
                index = len;
            for (; index > 0; index -= 1) {
                currArg = args[index];
                if (currArg) {
                    if (markup && cls[index - 1] === 'mrk') {
                        currArg1 = currArg.replace(
                            /(\w+)=(".*?")/g,
                            '<span class="' + JSHL.language.html.cls[2] +
                            '">$1</span>=<span class="' + JSHL.language.html.cls[3] + '">$2</span>'
                        )
                    }
                    args[0] = args[0].replace(currArg, '<span class="' + cls[index - 1] + '">' + (currArg1 !== null ? currArg1 : currArg) + '</span>')
                }
            }
            return args[0];
        });
        for (i = 0; i < placeholder.length; i++) { //高亮包含的其他语言
            html = html.replace(new RegExp('{@.*?' + placeholder[i].replace(/[{@}]/g, '') + '.*?@}', 'g'), placeholder[i])
                .replace(placeholder[i], olanghl[i]);
        }

        /*
         * 替换css第一行首多出一个空格的bug
         * 感谢"落单的孤鸟"反馈
         */
        function rep($0) {
            return /^\s+$/.test($0) ? "" : $0.replace(/(\s+)$/, "")
        }
        return html.replace(/^(\<.*?\>)*(\s)|(\s)$/g, rep).replace('{@jshl-linenum@}', '') + (findParent ? addLineNumber(html.split('\n').length) : '');
    }

    for (; index < len; index += 1) {
        pre = pres[index];
        lang = (pre.getAttribute('data-language') || lang).toLowerCase();
        if (typeof langName !== 'undefined' && lang !== langName) {
            continue
        }
        html = parseHTML(pre.innerHTML);

        if (pre.outerHTML) {
            outer = pre.outerHTML.match(/<\w+\s*(.*?)>/)[1];
            pre.outerHTML = '<pre ' + outer + '>' + hlbylanguage(html, lang, true) + '</pre>';
        } else {
            pre.innerHTML = hlbylanguage(html, lang, true);
        }
    }
}


module.exports = JSHL;