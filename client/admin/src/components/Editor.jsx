import React from 'react';
import ReactQuill, { Quill } from 'react-quill'
let Block = Quill.import('blots/block');


const CustomButton = () => <i className="fa fa-header"><sub>2</sub></i>

function insertH() {
    this.quill.format('H', true);

}

class BlockH extends Block {
    static create(value) {
        let node = super.create();
        console.log(node)
        return node;
    }
    static formats(node) {
        console.log(node)
        return BlockH.tagName.indexOf(node.tagName) + 1;
    }
}
BlockH.blotName = 'H';
BlockH.tagName = 'h2';
Quill.register(BlockH);

const CustomToolbar = () => (
    <div id="toolbar">
        <button className="ql-bold"></button>
        <button className="ql-italic"></button>
        <button className="ql-link"></button>
        <button className="ql-blockquote"></button>
        <button className="ql-code-block"></button>
        <button className="ql-list" value="ordered"></button>
        <button className="ql-list" value="bullet"></button>
        <button className="ql-video"></button>
        <button className="ql-image"></button>
        <button className="ql-H">
            <CustomButton />
        </button>
    </div>
)

class Editor extends React.Component {
    handleChange = (html) => {
        if (this.props.onChange) {
            this.props.onChange(html);
        }
    }
    render() {
        const { value } = this.props;
        return (
            <div className="text-editor">
                <CustomToolbar />
                <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={this.handleChange}
                    modules={Editor.modules}
                />
            </div>
        )
    }
}

var imageHandler = function (image, callback) {

    var _this3 = this;
    var fileInput = this.container.querySelector('input.ql-image[type=file]');
    if (fileInput == null) {
        fileInput = document.createElement('input');
        fileInput.setAttribute('type', 'file');
        fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
        fileInput.classList.add('ql-image');
        fileInput.addEventListener('change', function () {
            if (fileInput.files != null && fileInput.files[0] != null) {

                var formData = new FormData();
                formData.append('file', fileInput.files[0], fileInput.files[0].name);
                var xhr = new XMLHttpRequest();
                xhr.open('POST', '/api/admin/medias', true);
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        var data = JSON.parse(xhr.responseText);
                        var range = _this3.quill.getSelection(true);
                        _this3.quill.updateContents({
                            ops: [
                                { retain: range.index },
                                { insert: { image: data.url } },
                            ],
                            source: 'user'
                        });
                        fileInput.value = "";
                    }
                };
                xhr.send(formData);
            }
        });
        this.container.appendChild(fileInput);
    }
    fileInput.click();
};

Editor.modules = {
    toolbar: {
        container: "#toolbar",
        handlers: {
            "H": insertH,
            "image": imageHandler
        }
    }
}
Editor.formats = [
    'bold', 'italic', 'blockquote',
    'list', 'bullet', 'link', 'image', 'video', 'code-block', 'H'
]

export default Editor