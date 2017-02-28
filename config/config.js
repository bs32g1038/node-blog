/**
 * Created by liaoyunda on 16/11/22.
 */
const config = {
  view_path: "/views-ejs", //模版前置路径（经自动化工具处理后的模版文件）
  redis: {
    host: '127.0.0.1',
    port: 6379

  }
}

module.exports = config;
