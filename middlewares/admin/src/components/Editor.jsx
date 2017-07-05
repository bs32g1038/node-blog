import React from 'react';
import cNames from 'classnames'
const CodeMirror = require('react-codemirror');
require('codemirror/lib/codemirror.css');
import marked from 'marked';
require('github-markdown-css');
require('codemirror/mode/markdown/markdown');
class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      panelClass: 'md-panel',
      mode: 'split',
      isFullScreen: false,
      result: marked(this.props.value || ''),
      codeMirror: null
    }
  }
  _getToolBar() {
    return (
      <ul className="md-toolbar clearfix">
        <li className="tb-btn"><a title="加粗" onClick={() => this._boldText()}><i className="fa fa-bold"></i></a></li>{/* bold */}
        <li className="tb-btn"><a title="斜体" onClick={() => this._italicText()}><i className="fa fa-italic"></i></a></li>{/* italic */}
        <li className="tb-btn spliter"></li>
        <li className="tb-btn"><a title="链接" onClick={() => this._linkText()}><i className="fa fa-link"></i></a></li>{/* link */}
        <li className="tb-btn"><a title="引用" onClick={() => this._blockquoteText()}><i className="fa fa-outdent"></i></a></li>{/* blockquote */}
        <li className="tb-btn"><a title="代码段" onClick={() => this._codeText()}><i className="fa fa-code"></i></a></li>{/* code */}
        <li className="tb-btn"><a title="图片" onClick={() => this._pictureText()}><i className="fa fa-picture-o"></i></a></li>{/* picture-o */}
        <li className="tb-btn spliter"></li>
        <li className="tb-btn"><a title="有序列表" onClick={() => this._listOlText()}><i className="fa fa-list-ol"></i></a></li>{/* list-ol */}
        <li className="tb-btn"><a title="无序列表" onClick={() => this._listUlText()}><i className="fa fa-list-ul"></i></a></li>{/* list-ul */}
        <li className="tb-btn"><a title="标题" onClick={() => this._headerText()}><i className="fa fa-header"></i></a></li>{/* header */}
      </ul>
    )
  }
  _getModeBar() {
    const checkActive = (mode) => cNames({ active: this.state.mode === mode })
    return (
      <ul className="md-modebar">
        <li className="tb-btn pull-right">
          <a className={checkActive('preview')} onClick={this._changeMode('preview')} title="预览模式">
            <i className="fa fa-eye"></i>
          </a>
        </li> { /* preview mode */}
        <li className="tb-btn pull-right">
          <a className={checkActive('edit')} onClick={this._changeMode('edit')} title="编辑模式">
            <i className="fa fa-pencil"></i>
          </a>
        </li> { /* edit mode */}
      </ul>
    )
  }
  _changeMode(mode) {
    return (e) => {
      this.setState({ mode })
    }
  }
  codeMirrorInstance(codemirror) {
    this.setState({
      codemirror
    })
  }

  _preInputText(text, preStart, preEnd) {
    let cm = this.state.codeMirror;
    const start = cm.getCursor('start')
    const end = cm.getCursor('end')
    cm.replaceRange(text, start, end);
    cm.focus();
    this.setState({ result: marked(cm.getValue()) }) // change state
  }
  _toggleFullScreen(e) {
    this.setState({ isFullScreen: !this.state.isFullScreen })
  }
  _boldText() {
    this._preInputText("**加粗文字**", 2, 6)
  }
  _italicText() {
    this._preInputText("_斜体文字_", 1, 5)
  }
  _linkText() {
    this._preInputText("[链接文本](www.yourlink.com)", 1, 5)
  }
  _blockquoteText() {
    this._preInputText("> 引用", 2, 4)
  }
  _codeText() {
    this._preInputText("```\ncode block\n```", 4, 14)
  }
  _pictureText() {
    this._preInputText("![alt](www.yourlink.com)", 2, 5)
  }
  _listUlText() {
    this._preInputText("- 无序列表项0\n- 无序列表项1", 2, 8)
  }
  _listOlText() {
    this._preInputText("1. 有序列表项0\n2. 有序列表项1", 3, 9)
  }
  _headerText() {
    this._preInputText("## 标题", 3, 5)
  }
  handleChange = (md) => {
    if (this.props.onChange) {
      this.props.onChange(md);
      this.setState({
        result: marked(md)
      })
    }
  }
  render() {
    const previewClass = cNames(['md-preview', 'markdown-body', { 'expand': this.state.mode === 'preview', 'shrink': this.state.mode === 'edit' }])
    const { value } = this.props;
    return (
      <div className="md-panel">
        <div className="md-menubar">
          {this._getModeBar()}
          {this._getToolBar()}
        </div>
        <CodeMirror value={value} onChange={this.handleChange} options={{
          mode: 'markdown',
          lineNumbers: true
        }} ref="codeMirror" />
        <div className={previewClass} ref="preview" dangerouslySetInnerHTML={{ __html: this.state.result }}></div>
      </div>
    )
  }
  componentDidMount() {
    this.setState({
      codeMirror: this.refs.codeMirror.getCodeMirror()
    })
  }

}

// let imageHandler = function (image, callback) {

//     let _this3 = this;
//     let fileInput = this.container.querySelector('input.ql-image[type=file]');
//     if (fileInput == null) {
//         fileInput = document.createElement('input');
//         fileInput.setAttribute('type', 'file');
//         fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
//         fileInput.classList.add('ql-image');
//         fileInput.addEventListener('change', function () {
//             if (fileInput.files != null && fileInput.files[0] != null) {

//                 let formData = new FormData();
//                 formData.append('file', fileInput.files[0], fileInput.files[0].name);
//                 let xhr = new XMLHttpRequest();
//                 xhr.open('POST', '/api/admin/medias', true);
//                 xhr.onload = function () {
//                     if (xhr.status === 200) {
//                         let data = JSON.parse(xhr.responseText);
//                         let range = _this3.quill.getSelection(true);
//                         _this3.quill.updateContents({
//                             ops: [
//                                 { retain: range.index },
//                                 { insert: { image: data.url } },
//                             ],
//                             source: 'user'
//                         });
//                         fileInput.value = "";
//                     }
//                 };
//                 xhr.send(formData);
//             }
//         });
//         this.container.appendChild(fileInput);
//     }
//     fileInput.click();
// };

// Editor.modules = {
//     toolbar: {
//         container: "#toolbar",
//         handlers: {
//             "H": insertH,
//             "image": imageHandler
//         }
//     }
// }
// Editor.formats = [
//     'bold', 'italic', 'blockquote',
//     'list', 'bullet', 'link', 'image', 'video', 'code-block', 'H'
// ]

export default Editor