import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStore } from '../../context/store';

class Categories extends Component {
    render() {
        let categories = this.props.categories || [];
        return (
            <ul className="Categories">
                <li className="Categories-item">
                    <i className="fa fa-book fa-fw"></i>分类
                </li>
                {
                    categories.map((item) => (
                        <li className="Categories-item" key={item._id}>
                            <Link className="Categories-link" to={`/blog/articles?cid=${item._id}`}>
                                {item.name}<span>({item.articleCount})</span>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        );
    }
}
export default withStore(Categories);