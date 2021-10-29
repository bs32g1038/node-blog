import React, { useState, useRef, useEffect } from 'react';
import Wrap from './style';
import Vditor from 'vditor';
import 'vditor/dist/index.css';

export default (props) => {
    const [editor, setEditor] = useState(null);
    const ref = useRef(null);

    useEffect(() => {
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
