import styled from '@emotion/styled';

export const WrapperDiv = styled.div`
    padding: 16px 24px 0;
    background: #fff;
    border-bottom: 1px solid #e8e8e8;
    .ant-page-header {
        padding: 0;
    }
    .ant-page-header-title-view-extra {
        top: 0;
        right: 0;
    }
    .detail {
        display: flex;
    }

    .row {
        display: flex;
        width: 100%;
    }

    .logo {
        display: inline-block;
        margin-top: -1px;
        margin-right: 16px;
        vertical-align: middle;

        > img {
            display: block;
            width: 28px;
            height: 28px;
        }
    }

    .title-content {
        margin-bottom: 16px;
    }

    @media screen and (max-width: $screen-sm) {
        .children-content {
            margin: 24px 0 0;
        }
    }

    .title,
    .content {
        flex: auto;
    }

    .extraContent,
    .main {
        flex: 0 1 auto;
    }

    .main {
        width: 100%;
    }

    .title {
        margin-bottom: 16px;
    }

    .content,
    .extraContent {
        margin-bottom: 16px;
    }

    .extraContent {
        min-width: 242px;
        margin-left: 88px;
        text-align: right;
    }
`;

export const WideDiv = styled.div<{ isWide: boolean }>`
    ${props =>
        props.isWide &&
        `
    max-width: 1200px;
    margin: auto;
    `}
`;

export const ChildrenContentDiv = styled.div`
    margin: 24px 24px 0;
`;
