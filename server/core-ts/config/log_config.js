var path = require('path');

//错误日志输出完整路径
var errorLogPath = path.resolve(__dirname, "../logs/error/error");

//响应日志输出完整路径
var responseLogPath = path.resolve(__dirname, "../logs/response/response");

module.exports = {
    "appenders":
    [
        //错误日志
        {
            "category":"errorLogger",             //logger名称
            "type": "dateFile",                   //日志类型
            "filename": errorLogPath,             //日志输出位置
            "alwaysIncludePattern":true,          //是否总是有后缀名
            "pattern": "-yyyy-MM-dd-hh.log"       //后缀，每小时创建一个新的日志文件
        },
        //响应日志
        {
            "category":"resLogger",
            "type": "dateFile",
            "filename": responseLogPath,
            "alwaysIncludePattern":true,
            "pattern": "-yyyy-MM-dd-hh.log"
        }
    ],
    "levels":                                     //设置logger名称对应的的日志等级
    {
        "errorLogger":"ERROR",
        "resLogger":"ALL"
    }
}