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
}