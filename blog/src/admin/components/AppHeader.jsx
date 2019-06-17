import { Component } from 'inferno';
import { Link, withRouter } from 'inferno-router';
import config from '../config';
const tokenKey = "node-blog-bs32g1038";

class AppHeader extends Component {
  loginOut() {
    sessionStorage.removeItem(tokenKey);
    const { history } = this.props;
    return history.push('/blog/admin/login');
  }
  render() {
    return (
      <header className="app-header">
        <h1 className="site-name"><i className="fa fa-css3 fa-fw"></i>{config.site.name}后台</h1>
        <nav className="app-header-nav">
          <div className="app-header-nav-main">
            <Link to="/blog/admin/articles"><i className="fa fa-file fa-fw"></i>文章管理</Link>
            <Link to="/blog/admin/comments"><i className="fa fa-comments fa-fw"></i>评论管理</Link>
            <Link to="/blog/admin/categories"><i className="fa fa-folder fa-fw"></i>分类管理</Link>
            <Link to="/blog/admin/guestbooks"><i className="fa fa-coffee fa-fw"></i>留言管理</Link>
            <a href="javascript:;" onClick={() => this.loginOut()}><i className="fa fa-power-off  fa-fw"></i>注销</a>
          </div>
        </nav>
      </header>
    )
  }
}
export default withRouter(AppHeader)