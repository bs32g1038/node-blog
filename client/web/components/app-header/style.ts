import styled from '@emotion/styled';

export const MainWrap = styled.header`
    display: flex;
    align-items: center;
    padding: 10px 20px;
    background-color: #fff;
`;

export const HomeNav: any = styled.a`
    @font-face {
        font-family: 'logoFont';
        src: url(${require('@blog/client/assets/fonts/ZiXinFangMengTi-subfont.ttf')}) format('truetype');
        font-weight: normal;
        font-style: normal;
    }
    display: flex;
    text-decoration: none;
    color: inherit;
    font-size: 16px;
    align-items: center;
    cursor: pointer;
    font-weight: 600;
    margin-right: 26px;
    margin-bottom: 0;
    h1 {
        font-family: logoFont;
        font-size: 16px;
        font-weight: bold;
        color: ${(props: any) => props.theme.colors.title};
    }
    &:hover {
        text-decoration: none;
    }
`;

export const NavWrap = styled.div`
    display: flex;
    align-items: center;
    flex: 1 0 auto;
`;

export const NavA = styled.a`
    transition: none;
    flex: 1 0 auto;
    color: ${(props: any) => props.theme.colors.primaryText};
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:focus {
        box-shadow: none;
    }
    &:hover {
        text-decoration: none;
    }
    &.active {
        color: #f86422;
        svg {
            fill: #f86422;
        }
    }
    > span {
        margin-left: 5px;
    }
`;

export const SvgDiv: any = styled.div`
    display: flex;
    align-items: center;
    svg {
        margin-right: 8px;
        width: 40px;
        height: 40px;
    }
`;
