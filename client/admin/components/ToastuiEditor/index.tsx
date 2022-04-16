import React, { useState, useRef, useEffect, ReactElement } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import Editor, { EditorOptions } from '@toast-ui/editor';
import axios from '@blog/client/admin/axios';
import style from './style.module.scss';

type Props = Omit<EditorOptions, 'el'> & {
    getEditor?: (ed: Editor) => void;
};

export default function ToastuiEditor(props: Props): ReactElement {
    const [editor, setEditor] = useState(null);
    const ref = useRef(null);

    useEffect(() => {
        let height = 500;
        if (ref.current) {
            height = ref.current.offsetTop;
        }
        const ed = new Editor({
            initialEditType: 'wysiwyg',
            hideModeSwitch: true,
            previewStyle: 'vertical',
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        if (editor && props.initialValue !== '') {
            editor.setMarkdown(props.initialValue);
        }
    }, [editor, props.initialValue]);

    return <div id="editor" ref={ref} className={style.toastuiEditorContents}></div>;
}
