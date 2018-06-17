import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from "./cssmodule.scss";

export default class Categories extends Component {
    render() {
        return (
            <ul className={styles.cats}>
                <li className={styles.catItem}>
                    <i className="fa fa-book fa-fw"></i>分类
                </li>
                {
                    this.props.categories.map((item) => (
                        <li className={styles.catItem} key={item._id}>
                            <Link className={styles.catLink} to={`/blog/articles?cid=${item._id}`}>
                                {item.name}<span>({item.articleCount})</span>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        );
    }
}
