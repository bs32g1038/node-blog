import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from './ckeditor.js';
import style from './style.module.scss';
import axios from '@blog/client/admin/axios';

type EditorDemoProps = {
    value?: string;
    onChange?: (val: string) => void;
};

class MyUploadAdapter {
    loader: { file: any };
    constructor(loader: any) {
        this.loader = loader;
    }
    async upload() {
        const data = new FormData();
        data.append('file', await this.loader.file);
        const res = await axios({
            url: '/files/upload',
            method: 'POST',
            data,
            withCredentials: true, // true 为不允许带 token, false 为允许
        });
        return {
            default: res.data.url,
        };
    }
}

const editorConfiguration = {
    toolbar: [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'outdent',
        'indent',
        '|',
        'codeblock',
        'imageUpload',
        'blockQuote',
        'insertTable',
        'undo',
        'redo',
    ],
    placeholder: '输入正文...',
};

export default function EditorDemo(props: EditorDemoProps): JSX.Element {
    return (
        <div className={style.wrap + ' rich-text-editor'}>
            <CKEditor
                editor={ClassicEditor as any}
                config={editorConfiguration as any}
                data={props.value}
                watchdogConfig={{ crashNumberLimit: 10 }}
                onChange={(event, editor) => {
                    props.onChange?.(editor.getData());
                }}
                onReady={(editor) => {
                    const rep = editor.plugins.get('FileRepository') as any;
                    rep.createUploadAdapter = (loader: any) => {
                        return new MyUploadAdapter(loader);
                    };
                }}
            />
        </div>
    );
}
