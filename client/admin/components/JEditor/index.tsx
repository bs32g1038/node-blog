import React, { useEffect, useImperativeHandle } from 'react';
import style from './style.module.scss';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { noop } from 'lodash';
import Placeholder from '@tiptap/extension-placeholder';
import OlSvg from './components/ol';
import { Button } from 'antd';
import UlSvg from './components/ul';
import BoldSvg from './components/bold';
import ItalicSvg from './components/italic';
import CodeBlockSvg from './components/code-block';
import QuoteSvg from './components/quote';
import ClearSvg from './components/clear';
import HSvg from './components/h';
import Link from '@tiptap/extension-link';

const MenuBar = ({ editor, len, loading }: any) => {
    if (!editor) {
        return null;
    }
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
                openOnClick: true,
            }),
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
            <EditorContent className={'toastui-editor-contents' + ' ' + style.editor} editor={editor} />
        </div>
    );
});
