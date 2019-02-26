import styled from '@emotion/styled';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { State } from '../../redux/reducers/categories';
import media from '../../utils/media';

const CategoriesWrap = styled.ul`
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid rgba(178,186,194,.15);
    display: flex;
    flex: 0 0 auto;
    font-size: 12px;
    margin: 0;
    padding: 11px 0;
    ${media.phone`
        padding-left: 5px;
    `};
`;

const Item = styled.li(() => ({
    display: 'inline-block',
    marginRight: '20px'
}));

const ItemLink = styled(Link)(() => ({
    color: '#90979c',
    textDecoration: 'none'
}));

class Categories extends Component<any, any> {

    public render() {
        const { categories } = this.props._DB || [];
        return (
            <CategoriesWrap>
                <Item>
                    <i className="fa fa-book fa-fw"></i>分类
                </Item>
                {
                    categories.map((item: any) => (
                        <Item key={item._id}>
                            <ItemLink to={`/blog/articles?cid=${item._id}`}>
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