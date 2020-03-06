import styled from '@emotion/styled';

export const Header = styled.header`
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    height: 36px;
    padding: 0;
    padding: 24px 40px;
    z-index: 799;
    display: flex;
    .left-item {
        display: flex;
        .name {
            padding-right: 8px;
        }
        .type {
            padding-left: 8px;
            border-left: 1px solid rgba(0, 0, 0, 0.15);
        }
    }
    .view-actions {
        display: flex;
        align-items: center;
    }
    .avatar-uploader {
        width: 282px;
        height: 130px;
        .ant-upload {
            width: 282px;
            height: 130px;
        }
    }
`;

export const EditorWrap = styled.div`
    margin-top: 20px;
    .MdEditor {
        margin: 0 auto;
        border: none !important;
        max-width: 700px;
        width: 100%;
        margin-top: 20px;
    }
    textarea.ant-input {
        font-size: 32px;
        font-weight: 700;
        border: none;
        overflow-y: scroll;
        &:focus {
            outline: none;
            box-shadow: none;
        }
    }
    .CodeMirror {
        min-height: auto !important;
    }
`;
