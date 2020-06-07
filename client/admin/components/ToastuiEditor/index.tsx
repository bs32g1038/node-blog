import React, { useState, useRef, useEffect } from 'react';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import Editor, { EditorOptions } from '@toast-ui/editor';
import axios from '@blog/client/admin/axios';
import Wrap from './style';

type Props = Omit<EditorOptions, 'el'> & {
    getEditor?: (ed: Editor) => void;
};

export default (props: Props) => {
    const [editor, setEditor] = useState(null);
    const ref = useRef(null);

    useEffect(() => {
        let height = 500;
        if (ref.current) {
            height = ref.current.offsetTop;
        }
        const ed = new Editor({
            hideModeSwitch: true,
            previewStyle: 'vertical',
            initialEditType: 'markdown',
            height: document.documentElement.clientHeight - height + 'px',
            el: ref.current,
            language: 'zh-CN',
            hooks: {
                addImageBlobHook: (file, cb) => {
                    const formdata = new FormData();
                    formdata.append('file', file);
                    axios({
                        url: '/files/upload',
                        method: 'post',
                        data: formdata,
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    }).then((res) => {
                        cb(res.data.url, '');
                    });
                },
            },
        });
        setEditor(ed);
        if (props.getEditor) {
            props.getEditor(ed);
        }
    }, [1]);
    useEffect(() => {
        if (editor && props.initialValue !== '') {
            editor.setMarkdown(props.initialValue);
        }
    }, [editor !== null && props.initialValue]);

    return <Wrap id="editor" ref={ref} />;
};
