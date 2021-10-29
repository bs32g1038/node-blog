import React from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';

export default (props: any) => (
    <div
        className="tui-editor-contents"
        dangerouslySetInnerHTML={{
            __html: props.content,
        }}
    ></div>
);
