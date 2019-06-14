import styled from '@emotion/styled';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { State } from '../../redux/reducers/categories';
import { fetchCategories } from '../../redux/reducers/categories';
import media from '../../utils/media';

const CategoriesWrap = styled.ul`
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid rgba(178,186,194,.15);
    display: flex;
    flex: 0 0 auto;
    font-size: 13px;
    margin: 0;
    padding: 0 10px 15px;
    border-bottom: 1px solid #ededee;
    margin-bottom: 8px;
    ${media.phone`
        padding-left: 5px;
    `};
`;

const Item = styled.li`
    display: inline-block;
    margin: 7px 20px 7px 0;
`;

const ItemLink = styled(NavLink)`
    color: #90979c;
    text-decoration: none;
    &.active{
        font-size: 14px;
        color: #40404c;
        font-weight: 700;
        position: relative;
        &:after{
            content: '';
            position: absolute;
            bottom: -8px;
            left: 50%;
            width: 20px;
            height: 3px;
            background: #f86442;
            transform: translate(-50%,0);
        }
    }
`;

class Categories extends Component<any, any> {

    public componentDidMount() {
        const { categories = [] } = this.props._DB;
        if (categories.length <= 0) {
            this.props.dispatch(fetchCategories());
        }
    }

    public render() {
        const { categories = [] } = this.props._DB;
        return (
            <CategoriesWrap>
                <Item>
                    <ItemLink to="/blog" exact={true}>
                        全部
                    </ItemLink>
                </Item>
                {
                    categories.map((item: any) => (
                        <Item key={item._id}>
                            <ItemLink exact={true} to={`/blog/categories/${item._id}`}>
                                {item.name}<span>({item.articleCount})</span>
                            </ItemLink>
                        </Item>
                    ))
                }
            </CategoriesWrap>
        );
    }
}

export default connect(
    (state: State) => ({
        _DB: state.categories
    })
)((Categories as any));