import React, { useEffect, useImperativeHandle } from 'react';
import style from './style.module.scss';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { noop } from 'lodash';
import Placeholder from '@tiptap/extension-placeholder';
import OlSvg from './components/ol';
import { Button, Input, message, Popover, Upload, UploadProps } from 'antd';
import UlSvg from './components/ul';
import BoldSvg from './components/bold';
import ItalicSvg from './components/italic';
import CodeBlockSvg from './components/code-block';
import QuoteSvg from './components/quote';
import ClearSvg from './components/clear';
import HSvg from './components/h';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import CodeSvg from './components/code';
import LinkSvg from './components/link';
import ImageSvg from './components/image';
import config from '@blog/client/configs/admin.default.config';

const MenuBar = ({ editor, len, loading }: any) => {
    if (!editor) {
        return null;
    }
    const props: UploadProps = {
        name: 'file',
        action: '/api/files/upload',
        headers: {
            authorization: typeof localStorage !== 'undefined' && localStorage.getItem(config.tokenKey),
        },
        showUploadList: false,
        onChange(info) {
            if (info.file.status === 'done') {
                editor.commands.setImage({ src: info.file.response?.url });
                message.success(`${info.file.name} 文件上传成功。`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} 文件上传失败。`);
            }
        },
    };
    return (
        <div className={style.header}>
            <div className={style.menuBar}>
                <Button
                    onClick={() => {
                        editor.chain().focus().toggleBold().run();
                    }}
                    className={editor.isActive('bold') ? 'is-active' : ''}
                >
                    <BoldSvg></BoldSvg>
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive('italic') ? 'is-active' : ''}
                >
                    <ItalicSvg></ItalicSvg>
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    className={editor.isActive('code') ? 'is-active' : ''}
                >
                    <CodeSvg></CodeSvg>
                </Button>
                <Popover
                    content={
                        <Input
                            placeholder="请输入链接"
                            value={editor.getAttributes('link').href}
                            onChange={(e) => {
                                editor.commands.toggleLink({ href: e.target.value, target: '_blank' });
                            }}
                        />
                    }
                    trigger="click"
                >
                    <Button className={editor.isActive('link') ? 'is-active' : ''}>
                        <LinkSvg></LinkSvg>
                    </Button>
                </Popover>
                <Button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                >
                    <HSvg></HSvg>
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'is-active' : ''}
                >
                    <OlSvg></OlSvg>
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive('orderedList') ? 'is-active' : ''}
                >
                    <UlSvg></UlSvg>
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={editor.isActive('codeBlock') ? 'is-active' : ''}
                >
                    <CodeBlockSvg></CodeBlockSvg>
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={editor.isActive('blockquote') ? 'is-active' : ''}
                >
                    <QuoteSvg></QuoteSvg>
                </Button>
                <Upload {...props}>
                    <Button className={editor.isActive('image') ? 'is-active' : ''}>
                        <ImageSvg></ImageSvg>
                    </Button>
                </Upload>
                <Button
                    onClick={() => {
                        editor.chain().focus().clearNodes().unsetAllMarks().run();
                    }}
                >
                    <ClearSvg></ClearSvg>
                </Button>
            </div>
        </div>
    );
};

interface Props {
    ref?: any;
    value?: string;
    onChange?: () => void;
    placeholder?: string;
    loading?: boolean;
}

StarterKit.options.heading = {
    levels: [2],
};

export default React.forwardRef(function JEditor(props: Props, ref) {
    const { value, onChange = noop, placeholder, loading } = props;
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                showOnlyWhenEditable: false,
                placeholder: placeholder || '来了，就说点什么吧！',
            }),
            Link.configure({
                openOnClick: false,
            }),
            Image.configure({}),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });
    useImperativeHandle(ref, () => ({
        getLength: () => {
            return editor.getText().length;
        },
    }));
    useEffect(() => {
        if (value && (!editor?.getHTML() || editor?.getHTML() === '<p></p>')) {
            editor?.commands.setContent(value);
        }
    }, [editor, editor?.commands, value]);
    return (
        <div className={style.wrap}>
            <MenuBar loading={loading} editor={editor} len={editor?.getText()?.length ?? 0} />
            <div className={style.editor}>
                <EditorContent className="rich-text" editor={editor} />
            </div>
        </div>
    );
});
