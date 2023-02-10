import { noop } from 'lodash';
import React from 'react';
import FilerobotImageEditor from 'react-filerobot-image-editor';
import { TABS } from 'react-filerobot-image-editor';

interface Props {
    src: string;
    onSave: (editedImageObject: any, designState: any) => void;
}

export default function App(props: Props) {
    const { src, onSave = noop } = props;
    return (
        <div
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000 }}
            onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
            }}
        >
            <FilerobotImageEditor
                onBeforeSave={() => false}
                source={src}
                onSave={onSave}
                tabsIds={[TABS.ADJUST]}
                savingPixelRatio={0}
                previewPixelRatio={0}
                useBackendTranslations={false}
            />
        </div>
    );
}
