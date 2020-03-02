import React, { useEffect } from 'react';
import Editor from 'tui-editor';

export default () => {
    useEffect(() => {
        const editor = new Editor({
            el: document.querySelector('#editSection'),
            initialEditType: 'markdown',
            previewStyle: 'vertical',
            height: '300px',
        });
    });
    return <div id="editSection"></div>;
};
