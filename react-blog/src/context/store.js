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
    guestbooks: [],
    links: [],
    article: {},
    comments: [],
    setArticles: function (articles) {
        this.articles = articles;
    },
    setCategories(categories) {
        this.categories = categories;
    },
    setGuestbooks(guestbooks) {
        this.guestbooks = guestbooks;
    },
    setLinks(links) {
        this.links = links;
    },
    setArticle(article, commetns) {
        this.article = article;
        this.comments = commetns;
    }
};

// 是服务器端渲染就加入数据到store
if (isSSR()) {
    Object.assign($store, __INITIAL_STATE__());
    console.log('服务器端的返回的数据：', __INITIAL_STATE__());
}

export { $store };

export const StoreContext = React.createContext($store);

export function withStore(Component) {
    return function StoreComponent(props) {
        return (
            <StoreContext.Consumer>
                {data => <Component {...props} $store={data} />}
            </StoreContext.Consumer>
        );
    };
}