exports.id = "main";
exports.modules = {

/***/ "./src/components/app-header/index.tsx":
/*!*********************************************!*\
  !*** ./src/components/app-header/index.tsx ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/styled */ "./node_modules/@emotion/styled/dist/styled.esm.js");
/* harmony import */ var polished__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! polished */ "./node_modules/polished/dist/polished.es.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var _utils_media__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/media */ "./src/utils/media.ts");
var __makeTemplateObject = (undefined && undefined.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





var Container = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].header(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    align-items: center;\n    background-color: #f9f9f9;\n    background-size: cover;\n"], ["\n    align-items: center;\n    background-color: #f9f9f9;\n    background-size: cover;\n"])));
var MainWrap = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    position: relative;\n    bottom: 0;\n    text-align: center;\n    color: #555;\n    display: flex;\n    justify-content: space-between;\n    width: 720px;\n    margin: 0 auto;\n    align-items: center;\n    padding: 10px 0;\n    > p {\n        font-size: '12px'\n    }\n    ", ";\n"], ["\n    position: relative;\n    bottom: 0;\n    text-align: center;\n    color: #555;\n    display: flex;\n    justify-content: space-between;\n    width: 720px;\n    margin: 0 auto;\n    align-items: center;\n    padding: 10px 0;\n    > p {\n        font-size: '12px'\n    }\n    ",
    ";\n"])), _utils_media__WEBPACK_IMPORTED_MODULE_4__["default"].phone(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n        width: 100%;\n    "], ["\n        width: 100%;\n    "]))));
var HomeNav = Object(_emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"])(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"])(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    display: flex;\n    text-decoration: none;\n    color: #555;\n    font-size: 16px;\n    align-items: center;\n    img{\n        width: 32px;\n        height: 32px;\n    }\n"], ["\n    display: flex;\n    text-decoration: none;\n    color: #555;\n    font-size: 16px;\n    align-items: center;\n    img{\n        width: 32px;\n        height: 32px;\n    }\n"])));
var H1 = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].h1(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    ", ";\n    text-align: center;\n    margin: 0;\n    font-size: 16px;\n    ", ";\n"], ["\n    ", ";\n    text-align: center;\n    margin: 0;\n    font-size: 16px;\n    ",
    ";\n"])), Object(polished__WEBPACK_IMPORTED_MODULE_1__["transitions"])('color .15s ease'), _utils_media__WEBPACK_IMPORTED_MODULE_4__["default"].phone(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n        padding-left: 5px;\n        width: 100%;\n    "], ["\n        padding-left: 5px;\n        width: 100%;\n    "]))));
var Menu = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n    overflow: hidden;\n    transition: all .4s ease;\n    >i {\n        font-size: 16px;\n        display: none\n    }\n    ", ";\n"], ["\n    overflow: hidden;\n    transition: all .4s ease;\n    >i {\n        font-size: 16px;\n        display: none\n    }\n    ",
    ";\n"])), _utils_media__WEBPACK_IMPORTED_MODULE_4__["default"].phone(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n        >i {\n            display: block;\n            padding-right: 20px;\n        }\n    "], ["\n        >i {\n            display: block;\n            padding-right: 20px;\n        }\n    "]))));
var UL = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].ul(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n    display: inline-block;\n    position: relative;\n    margin: 0;\n    list-style-type: none;\n    text-align: center;\n    padding: 0;\n    ", ";\n"], ["\n    display: inline-block;\n    position: relative;\n    margin: 0;\n    list-style-type: none;\n    text-align: center;\n    padding: 0;\n    ",
    ";\n"])), _utils_media__WEBPACK_IMPORTED_MODULE_4__["default"].phone(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n        position: absolute;\n        top: 44px;\n        left: 0;\n        right: 0;\n        text-align: left;\n        background-color: #f9f9f9;\n        display: none;\n        z-index: 1000;\n        li{\n            display: block;\n            width: 100%;\n        }\n        span{\n            display: none;\n        }\n    "], ["\n        position: absolute;\n        top: 44px;\n        left: 0;\n        right: 0;\n        text-align: left;\n        background-color: #f9f9f9;\n        display: none;\n        z-index: 1000;\n        li{\n            display: block;\n            width: 100%;\n        }\n        span{\n            display: none;\n        }\n    "]))));
var LI = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].li(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n    display: inline-block;\n    line-height: 1em;\n    .rss {\n        display: block;\n        position: relative;\n        text-decoration: none;\n        font-size: 14px;\n        padding: 10px 10px;\n        border-radius: 30px;\n        letter-spacing: 1px;\n        color: #555;\n    }\n"], ["\n    display: inline-block;\n    line-height: 1em;\n    .rss {\n        display: block;\n        position: relative;\n        text-decoration: none;\n        font-size: 14px;\n        padding: 10px 10px;\n        border-radius: 30px;\n        letter-spacing: 1px;\n        color: #555;\n    }\n"])));
var ATag = Object(_emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"])(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"])(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n    display: block;\n    position: relative;\n    text-decoration: none;\n    font-size: 14px;\n    padding: 10px 10px;\n    border-radius: 30px;\n    letter-spacing: 1px;\n    color: #555;\n"], ["\n    display: block;\n    position: relative;\n    text-decoration: none;\n    font-size: 14px;\n    padding: 10px 10px;\n    border-radius: 30px;\n    letter-spacing: 1px;\n    color: #555;\n"])));
var AppHeader = /** @class */ (function (_super) {
    __extends(AppHeader, _super);
    function AppHeader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isShowMobileMenu: false
        };
        return _this;
    }
    AppHeader.prototype.showMenu = function () {
        this.setState({
            isShowMobileMenu: !this.state.isShowMobileMenu
        });
    };
    AppHeader.prototype.render = function () {
        var _this = this;
        var siteInfo = this.props.siteInfo;
        return (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Container, null,
            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(MainWrap, null,
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(HomeNav, { to: "/", title: siteInfo.name },
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("img", { src: __webpack_require__(/*! ../../assets/images/notebook.png */ "./src/assets/images/notebook.png"), alt: siteInfo.name }),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(H1, null,
                        "\u300A",
                        siteInfo.name,
                        "\u300B")),
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Menu, null,
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("i", { className: this.state.isShowMobileMenu ? 'fa fa-times' : 'fa fa-reorder', onClick: function () { return _this.showMenu(); } }),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(UL, { style: this.state.isShowMobileMenu ? { display: 'block' } : {} },
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(LI, null,
                            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(ATag, { to: "/blog" },
                                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("i", { className: "fa fa-home fa-fw" }),
                                "\u535A\u5BA2")),
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", null, " \u00B7 "),
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(LI, null,
                            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(ATag, { to: "/blog/guestbook" },
                                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("i", { className: "fa fa-coffee fa-fw" }),
                                "\u7559\u8A00")),
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", null, " \u00B7 "),
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(LI, null,
                            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(ATag, { to: "/blog/links" },
                                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("i", { className: "fa fa-globe fa-fw" }),
                                "\u53CB\u94FE")),
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", null, " \u00B7 "),
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(LI, null,
                            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(ATag, { to: "/blog/about" },
                                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("i", { className: "fa fa-user fa-fw" }),
                                "\u5173\u4E8E")),
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", null, " \u00B7 "),
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(LI, null,
                            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("a", { className: "rss", href: "/blog/rss", rel: "noopener noreferrer", target: "_blank" },
                                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("i", { className: "fa fa-rss fa-fw" }),
                                "Rss")))))));
    };
    return AppHeader;
}(react__WEBPACK_IMPORTED_MODULE_2__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (AppHeader);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12;


/***/ })

};
//# sourceMappingURL=main.4fb87158ceeb5ffbd6ed.hot-update.js.map