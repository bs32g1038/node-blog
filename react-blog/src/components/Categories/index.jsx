import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Categories extends Component {
    render() {
        let categories = this.props.categories || [];
        console.log(categories)
        return (
            <ul className="_categories">
                <li className="_c-item">
                    <i className="fa fa-book fa-fw"></i>分类
                </li>
                {
                    categories.map((item) => (
                        <li className="_c-item" key={item._id}>
                            <Link className="_c-link" to={`/blog/articles?cid=${item._id}`}>
                                {item.name}<span>({item.articleCount})</span>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        );
    }
}
