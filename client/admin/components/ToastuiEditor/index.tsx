import React, { useState, useRef, useEffect } from 'react';
import Wrap from './style';
import Vditor from 'vditor';
import 'vditor/dist/index.css';

export default (props) => {
    const [editor, setEditor] = useState(null);
    const ref = useRef(null);

    useEffect(() => {
        // let height = 500;
        // if (ref.current) {
        //     height = ref.current.offsetTop;
        // }
        // const ed = new Editor({
        //     hideModeSwitch: true,
        //     previewStyle: 'vertical',
        //     initialEditType: 'markdown',
        //     height: document.documentElement.clientHeight - height + 'px',
        //     el: ref.current,
        //     language: 'zh-CN',
        //     hooks: {
        //         addImageBlobHook: (file, cb) => {
        //             const formdata = new FormData();
        //             formdata.append('file', file);
        //             axios({
        //                 url: '/files/upload',
        //                 method: 'post',
        //                 data: formdata,
        //                 headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        //             }).then((res) => {
        //                 cb(res.data.url, '');
        //             });
        //         },
        //     },
        // });
        // setEditor(ed);
        // if (props.getEditor) {
        //     props.getEditor(ed);
        // }
        const vditor = new Vditor('editor', {
            height: 360,
            toolbarConfig: {
                pin: true,
            },
            cache: {
                enable: false,
            },
            after() {
                vditor.setValue('Hello, Vditor + React!');
            },
        });
        setEditor(vditor);
        if (props.getEditor) {
            props.getEditor(vditor);
        }
    }, [1]);
    useEffect(() => {
        if (editor && props.initialValue !== '') {
            editor.setValue(props.initialValue);
        }
    }, [editor !== null && props.initialValue]);

    return <Wrap id="editor" ref={ref} />;
};
