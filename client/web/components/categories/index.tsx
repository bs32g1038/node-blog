import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchCategories, State } from '../../redux/reducers/categories';
import media from '../../utils/media';
import NavLink from '../nav-link';
import * as theme from '../../theme';

const CategoriesWrap = styled.ul`
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid rgba(178, 186, 194, 0.15);
    display: flex;
    flex: 0 0 auto;
    font-size: 13px;
    margin: 0;
    padding: 0 10px 15px;
    border-bottom: 1px solid #ededee;
    ${media.phone`
        padding-top: 5px;
        margin-bottom: 0;
        white-space: nowrap;
        overflow-x: auto;
        overflow-y: hidden;
        box-sizing: border-box;
    `};
`;

const Item = styled.li`
    display: inline-block;
    margin: 7px 20px 7px 0;
`;

const ItemLink = styled.a`
    color: ${theme.textColor};
    text-decoration: none;
    cursor: pointer;
    &.active {
        position: relative;
        font-size: 14px;
        color: ${theme.headingColor};
        font-weight: 700;
        &:after {
            position: absolute;
            top: 100%;
            right: 0;
            left: 0;
            width: 14px;
            margin: auto;
            content: '';
            border-top: 5px solid transparent;
            border-right: 7px solid transparent;
            border-bottom: 5px solid #f86422;
            border-left: 7px solid transparent;
            box-sizing: border-box;
        }
    }
`;

const C = (props: any) => {
    useEffect(() => {
        const cats = props._DB.categories || [];
        if (cats.length <= 0) {
            props.dispatch(fetchCategories());
        }
    }, [1]);
    const { categories = [] } = props._DB;
    return (
        <CategoriesWrap>
            <Item>
                <NavLink exact={true} href="/blog">
                    <ItemLink>全部</ItemLink>
                </NavLink>
            </Item>
            {categories.map((item: any) => (
                <Item key={item._id}>
                    <NavLink exact={true} href={`/blog/articles?cid=${item._id}`}>
                        <ItemLink>
                            {item.name}
                            <span>({item.articleCount})</span>
                        </ItemLink>
                    </NavLink>
                </Item>
            ))}
        </CategoriesWrap>
    );
};

export const Categories = connect((state: State) => ({
    _DB: state.categories,
}))(C as any);
