import React, { useEffect } from 'react';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
import { useSelector } from 'react-redux';
import { RootState } from '@blog/client/redux/store';
const M = (props: any) => {
    const theme = useSelector((state: RootState) => state.app.theme);
    useEffect(() => {
        new Viewer({
            initialValue: props.content,
            el: document.getElementById('editor-content'),
        });
    }, [props.content]);
    return <div id="editor-content" className={theme === 'dark' ? 'toastui-editor-dark' : ''}></div>;
};
export default M;
