import React, { Component } from 'react';
import MarkdownIt from 'markdown-it';
import './index.scss';
import axios from '../../axios';
const CM = require('codemirror');
require('codemirror/mode/markdown/markdown');

export default class MdEdit extends Component {
    constructor(props) {
        super(props);
        this.markdown = new MarkdownIt();
        this.state = {
            MarkdownContent: this.props.value || '',
            isPreview: false,
        };
    }
    getCodeMirror() {
        return this.codeMirror;
    }
    _replaceSelection(cm, format) {
        let startPoint = cm.getCursor('start');
        let endPoint = cm.getCursor('end');
        cm.replaceSelection(format.before + cm.getSelection() + format.after);
        startPoint.ch += format.before.length;
        endPoint.ch += format.after.length;
        cm.setSelection(startPoint, endPoint);
        cm.focus();
    }
    insertLink() {
        let cm = this.getCodeMirror();
        let format = { before: '[', after: '](http://)' };
        this._replaceSelection(cm, format);
    }
    insertImage() {
        const self = this;
        const inputObj = document.createElement('input');
        inputObj.setAttribute('name', 'file');
        inputObj.setAttribute('type', 'file');
        inputObj.setAttribute('style', 'visibility:hidden');
        inputObj.click();
        inputObj.onchange = function() {
            const formdata = new FormData();
            formdata.append('file', inputObj.files[0]);
            axios({
                url: '/upload/image',
                method: 'post',
                data: formdata,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }).then(res => {
                let cm = self.getCodeMirror();
                let format = { before: '![', after: '](' + res.data.url + ')' };
                self._replaceSelection(cm, format);
            });
        };
    }
    preview() {
        const MarkdownContent = this.markdown.render(this._currentCodemirrorValue);
        if (this.state.isPreview) {
            this.setState({
                isPreview: false,
            });
        } else {
            this.setState({
                MarkdownContent,
                isPreview: true,
            });
        }
    }
    toggleFullScreen() {
        let el = this.getCodeMirror().getWrapperElement();
        let doc = document;
        let isFull = doc.fullScreen || doc.mozFullScreen || doc.webkitFullScreen;
        let request = function() {
            if (el.requestFullScreen) {
                el.requestFullScreen();
            } else if (el.mozRequestFullScreen) {
                el.mozRequestFullScreen();
            } else if (el.webkitRequestFullScreen) {
                el.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        };
        let cancel = function() {
            if (doc.cancelFullScreen) {
                doc.cancelFullScreen();
            } else if (doc.mozCancelFullScreen) {
                doc.mozCancelFullScreen();
            } else if (doc.webkitCancelFullScreen) {
                doc.webkitCancelFullScreen();
            }
        };
        if (!isFull) {
            request();
        } else {
            cancel();
        }
    }
    codemirrorValueChanged(doc) {
        let newValue = doc.getValue();
        this._currentCodemirrorValue = newValue;
        this.props.onChange && this.props.onChange(newValue);
    }
    getOptions() {
        return Object.assign(
            {
                mode: 'markdown',
                lineNumbers: false,
                indentWithTabs: true,
                tabSize: '4',
                dragDrop: false,
                styleActiveLine: false,
                lineWrapping: true,
            },
            this.props.options || {}
        );
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.codeMirror && this._currentCodemirrorValue !== nextProps.value) {
            this.codeMirror.setValue(nextProps.value);
        }
    }
    componentDidMount() {
        this.codeMirror = CM.fromTextArea(document.getElementById('codemirror'), this.getOptions());
        this.codeMirror.on('change', (doc, change) => this.codemirrorValueChanged(doc, change));
        this._currentCodemirrorValue = this.props.value || '';
    }
    componentWillUnmount() {
        if (this.codeMirror) {
            this.codeMirror.toTextArea();
        }
    }
    render() {
        return (
            <div className="MdEditor">
                <div className="MdEditor-toolbar">
                    {/* <button className="MdEditor-button" title="引用">
                        <svg className="MdEditor-svg queto" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M17.975 12.209c.504.454.822 1.05.952 1.792.061.35.055.715-.022 1.096-.075.379-.209.718-.4 1.018-.465.73-1.155 1.175-2.07 1.337-.874.153-1.684-.06-2.432-.638a3.6 3.6 0 0 1-.916-1.043 3.92 3.92 0 0 1-.506-1.336c-.172-.98-.03-2.026.425-3.142.455-1.116 1.155-2.118 2.1-3.007.8-.757 1.456-1.182 1.97-1.273a.72.72 0 0 1 .544.104.656.656 0 0 1 .286.452c.054.31-.095.601-.45.877-.856.67-1.455 1.27-1.796 1.798-.323.513-.467.873-.43 1.079.034.196.21.287.524.274l.191-.001.249-.029a2.436 2.436 0 0 1 1.781.642zm-7.51 0c.504.454.821 1.05.951 1.792.062.35.056.715-.02 1.096-.077.379-.21.718-.401 1.018-.465.73-1.155 1.175-2.07 1.337-.874.153-1.684-.06-2.432-.638a3.6 3.6 0 0 1-.916-1.043 3.92 3.92 0 0 1-.506-1.336c-.172-.98-.03-2.026.424-3.142.455-1.116 1.156-2.118 2.101-3.007.8-.757 1.456-1.182 1.97-1.273a.72.72 0 0 1 .544.104.656.656 0 0 1 .285.452c.055.31-.094.601-.45.877-.855.67-1.454 1.27-1.796 1.798-.322.513-.466.873-.43 1.079.034.196.21.287.525.274l.191-.001.248-.029a2.436 2.436 0 0 1 1.782.642z" fill-rule="evenodd"></path></svg>
                    </button> */}
                    <button type="button" className="MdEditor-button" onClick={() => this.insertLink()} title="链接">
                        <svg
                            className="MdEditor-svg link"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                        >
                            <path d="M6.77 17.23c-.905-.904-.94-2.333-.08-3.193l3.059-3.06-1.192-1.19-3.059 3.058c-1.489 1.489-1.427 3.954.138 5.519s4.03 1.627 5.519.138l3.059-3.059-1.192-1.192-3.059 3.06c-.86.86-2.289.824-3.193-.08zm3.016-8.673l1.192 1.192 3.059-3.06c.86-.86 2.289-.824 3.193.08.905.905.94 2.334.08 3.194l-3.059 3.06 1.192 1.19 3.059-3.058c1.489-1.489 1.427-3.954-.138-5.519s-4.03-1.627-5.519-.138L9.786 8.557zm-1.023 6.68c.33.33.863.343 1.177.029l5.34-5.34c.314-.314.3-.846-.03-1.176-.33-.33-.862-.344-1.176-.03l-5.34 5.34c-.314.314-.3.846.03 1.177z"></path>
                        </svg>
                    </button>
                    <button
                        type="button"
                        className="MdEditor-button image"
                        onClick={() => this.insertImage()}
                        title="上传图片"
                    >
                        <svg className="MdEditor-svg" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
                            <path d="M21 17.444C21 18.3 20.1 19 19 19H5c-1.1 0-2-.7-2-1.556V6.556C3 5.7 3.9 5 5 5h14c1.1 0 2 .7 2 1.556v10.888zm-9.437-3.919a.5.5 0 0 1-.862.013l-1.26-2.065a.5.5 0 0 0-.861.012l-2.153 3.767a.5.5 0 0 0 .435.748h10.292a.5.5 0 0 0 .438-.741L14.573 9.78a.5.5 0 0 0-.872-.006l-2.138 3.75z"></path>
                        </svg>
                    </button>
                    <button type="button" className="MdEditor-button eye" onClick={() => this.preview()} title="预览">
                        <svg className="MdEditor-svg" viewBox="0 0 512 512" width="30" height="20">
                            <path d="M569.354 231.631C512.969 135.949 407.81 72 288 72 168.14 72 63.004 135.994 6.646 231.631a47.999 47.999 0 0 0 0 48.739C63.031 376.051 168.19 440 288 440c119.86 0 224.996-63.994 281.354-159.631a47.997 47.997 0 0 0 0-48.738zM288 392c-75.162 0-136-60.827-136-136 0-75.162 60.826-136 136-136 75.162 0 136 60.826 136 136 0 75.162-60.826 136-136 136zm104-136c0 57.438-46.562 104-104 104s-104-46.562-104-104c0-17.708 4.431-34.379 12.236-48.973l-.001.032c0 23.651 19.173 42.823 42.824 42.823s42.824-19.173 42.824-42.823c0-23.651-19.173-42.824-42.824-42.824l-.032.001C253.621 156.431 270.292 152 288 152c57.438 0 104 46.562 104 104z" />
                        </svg>
                    </button>
                    <div style={{ flex: '1 0 auto', textAlign: 'center' }}>
                        <strong>markdown编辑器，开始写作吧！</strong>
                    </div>
                    <button type="button" className="MdEditor-button help" title="帮助">
                        <svg className="MdEditor-svg" viewBox="0 0 512 512" width="20" height="20">
                            <path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        className="MdEditor-button fullscreen"
                        onClick={() => this.toggleFullScreen()}
                        title="全屏"
                    >
                        <svg className="MdEditor-svg" viewBox="0 0 512 512" width="20" height="20">
                            <path d="M352.201 425.775l-79.196 79.196c-9.373 9.373-24.568 9.373-33.941 0l-79.196-79.196c-15.119-15.119-4.411-40.971 16.971-40.97h51.162L228 284H127.196v51.162c0 21.382-25.851 32.09-40.971 16.971L7.029 272.937c-9.373-9.373-9.373-24.569 0-33.941L86.225 159.8c15.119-15.119 40.971-4.411 40.971 16.971V228H228V127.196h-51.23c-21.382 0-32.09-25.851-16.971-40.971l79.196-79.196c9.373-9.373 24.568-9.373 33.941 0l79.196 79.196c15.119 15.119 4.411 40.971-16.971 40.971h-51.162V228h100.804v-51.162c0-21.382 25.851-32.09 40.97-16.971l79.196 79.196c9.373 9.373 9.373 24.569 0 33.941L425.773 352.2c-15.119 15.119-40.971 4.411-40.97-16.971V284H284v100.804h51.23c21.382 0 32.09 25.851 16.971 40.971z"></path>
                        </svg>
                    </button>
                </div>
                <div className="MdEditor-wraper">
                    <textarea id="codemirror" name={this.props.name} defaultValue={this.props.value} />
                    {this.state.isPreview && (
                        <div
                            className="preview markdown-body"
                            dangerouslySetInnerHTML={{
                                __html: this.state.MarkdownContent,
                            }}
                        ></div>
                    )}
                </div>
            </div>
        );
    }
}
