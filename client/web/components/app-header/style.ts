import styled from '@emotion/styled';
import { Link } from '@chakra-ui/react';
import { config as darkConfig } from '../../theme/dark';
import { config as lightConfig } from '../../theme/light';

export const HomeNav: any = styled(Link)`
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
    h1 {
        font-family: logoFont;
    }
    &:hover {
        text-decoration: none;
    }
`;

export const NavA = styled(Link)`
    transition: none;
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
`;

export const SvgDiv: any = styled.div`
    display: flex;
    align-items: center;
    svg {
        margin-right: 8px;
        width: 40px;
        height: 40px;
        fill: ${(props: any) => {
            return props.colorMode == 'light' ? lightConfig.colors.theme.title : darkConfig.colors.theme.title;
        }};
    }
`;
