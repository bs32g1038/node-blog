import { Component } from 'inferno';
import config from '../config';
export default class AppFooter extends Component {
  render() {
    return (
    <footer className="app-footer">
        <div className="back-top" title="返回顶部"></div>
        <div>
            <p>由<strong>Nodejs</strong>强力驱动，本博客已经开源至
            <a href="https://github.com/bs32g1038/node-blog" target="_blank" className="app-github">
            <strong>Github</strong>
            </a>请大家多多关注</p>
            <p>
            Copyright ©
            <a className="text-white" href="/blog">{config.site.name}</a>
            文章供学习交流，转载请保留出处,谢谢合作
            <span><a href="http://www.miitbeian.gov.cn/" target="_blank">{config.site.icp}</a></span>
            </p>
        </div>
    </footer>
    )
  }
}