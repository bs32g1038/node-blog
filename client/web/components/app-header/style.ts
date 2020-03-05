import styled from '@emotion/styled';
import { Link } from '@chakra-ui/core';
import siteitlefont from './siteitlefont';

export const HomeNav: any = styled(Link)`
    display: flex;
    text-decoration: none;
    color: inherit;
    font-size: 16px;
    align-items: center;
    cursor: pointer;
    font-weight: 600;
    ${siteitlefont}
    img {
        margin-right: 8px;
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
