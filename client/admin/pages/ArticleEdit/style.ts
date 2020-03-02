import styled from '@emotion/styled';

export const Header = styled.header`
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    height: 36px;
    padding: 0;
    padding: 24px;
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
`;
