import React from 'react';

// 获取服务器端渲染提供的初始化state
export const __INITIAL_STATE__ = function () {
    return window.__INITIAL_STATE__;
};

// 判断服务器端渲染数据是否存在
export const isSSR = function () {
    if (typeof window !== 'undefined') {
        return !!window.__INITIAL_STATE__;
    }
    return false;
};

const $store = {
    categories: [],
    articles: [],
    setArticles: function (articles) {
        this.articles = articles;
    },
    setCategories(categories) {
        this.categories = categories;
    }
};

// 是服务器端渲染就加入数据到store
// if (isSSR()) {
//     Object.assign($store, __INITIAL_STATE__());
// console.log(__INITIAL_STATE__())

// }
console.log($store)


export { $store };

export const StoreContext = React.createContext($store);

class StoreComponent extends React.Component {
    static asyncData() {
    }
    render() {
        const { Component, props } = this.props;
        return (
            <StoreContext.Consumer>
                {data => <Component {...props} $store={data} />}
            </StoreContext.Consumer>
        );
    }
}

export function withStore(Component) {
    StoreComponent.asyncData = Component.asyncData;
    return function StoreComponent(props) {
        return (
            <StoreComponent Component={Component} props={props} />
        );
    };
}