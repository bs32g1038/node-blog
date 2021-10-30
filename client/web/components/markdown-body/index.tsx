import React, { useEffect } from 'react';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
const M = (props: any) => {
    useEffect(() => {
        new Viewer({
            initialValue: props.content,
            el: document.getElementById('editor-content')
        });
    }, [1]);
    return <div id="editor-content"></div>;
};
export default M;
