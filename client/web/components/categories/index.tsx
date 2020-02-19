import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchCategories, State } from '../../redux/reducers/categories';
import NavLink from '../nav-link';
import { Box, Link, Tag, TagLabel, TagCloseButton } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import Router from 'next/router';

const ItemLink = styled(Link)`
    text-decoration: none;
    cursor: pointer;
    &:hover {
        text-decoration: none;
    }
    &.active {
        position: relative;
        font-size: 14px;
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
    const router = useRouter();
    const { categories = [] } = props._DB;
    return (
        <Box
            flex="0 0 auto"
            fontSize={13}
            borderBottomWidth="1px"
            borderStyle="solid"
            borderBottomColor="theme.categories.border"
            pb={3}
        >
            <Box display="inline-block" mt={2} mb={4}>
                <NavLink exact={true} href="/blog">
                    <ItemLink color="theme.categories.color">全部</ItemLink>
                </NavLink>
            </Box>
            {categories.map((item: any) => (
                <Box key={item._id} display="inline-block" ml={5} mb={4} mt={2}>
                    <NavLink exact={true} href={`/blog/articles?cid=${item._id}`}>
                        <ItemLink color="theme.categories.color">
                            {item.name}
                            <span>({item.articleCount})</span>
                        </ItemLink>
                    </NavLink>
                </Box>
            ))}
            {router.query.tag && (
                <Box>
                    <Tag>
                        <TagLabel>{router.query.tag}</TagLabel>
                        <TagCloseButton
                            onClick={() => {
                                Router.push('/blog/articles');
                            }}
                        />
                    </Tag>
                </Box>
            )}
        </Box>
    );
};

export const Categories = connect((state: State) => ({
    _DB: state.categories,
}))(C as any);
