exports.id = "main";
exports.modules = {

/***/ "./src/redux/reducers/articles.ts":
/*!****************************************!*\
  !*** ./src/redux/reducers/articles.ts ***!
  \****************************************/
/*! exports provided: setArticles, fetchArticles, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setArticles", function() { return setArticles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchArticles", function() { return fetchArticles; });
/* harmony import */ var _api_article__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../api/article */ "./src/api/article.ts");
/* harmony import */ var _action_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../action-types */ "./src/redux/action-types.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};


var setArticles = function (articles) { return ({
    type: _action_types__WEBPACK_IMPORTED_MODULE_1__["FETCH_ARTICLES"],
    articles: articles
}); };
var fetchArticles = function (page, limit, filter) {
    if (filter === void 0) { filter = { cid: '' }; }
    return function (dispatch) {
        return _api_article__WEBPACK_IMPORTED_MODULE_0__["default"].fetchArticles(page, limit, filter).then(function (res) {
            var articles = res.items;
            var o = {};
            if (filter.cid) {
                o[filter.cid] = articles;
            }
            else {
                o.blog = articles;
            }
            dispatch(setArticles(o));
        });
    };
};
var initialState = {
    articles: {},
    recentArticles: []
};
/* harmony default export */ __webpack_exports__["default"] = (function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case _action_types__WEBPACK_IMPORTED_MODULE_1__["FETCH_ARTICLES"]: {
            var articles = action.articles;
            return __assign({}, state, { articles: articles });
        }
        default:
            return state;
    }
});


/***/ })

};
//# sourceMappingURL=main.3d1321ade1bb9561407a.hot-update.js.map