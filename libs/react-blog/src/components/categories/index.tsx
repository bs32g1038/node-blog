import styled from '@emotion/styled';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { State } from '../../redux/reducers/categories';

const CategoriesWrap = styled.ul(() => ({
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flex: '0 0 auto',
    fontSize: '12px',
    margin: '0',
    padding: '10px 42px'
}));

const Item = styled.li(() => ({
    display: 'inline-block',
    marginRight: '20px'
}));

const ItemLink = styled(Link)(() => ({
    color: '#90979c',
    textDecoration: 'none'
}));

class Categories extends React.Component<any, any> {
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
)(Categories);