exports.id = "main";
exports.modules = {

/***/ "./src/components/about/index.tsx":
/*!****************************************!*\
  !*** ./src/components/about/index.tsx ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/styled */ "./node_modules/@emotion/styled/dist/styled.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_calendar_heatmap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-calendar-heatmap */ "./node_modules/react-calendar-heatmap/dist/react-calendar-heatmap.esm.js");
/* harmony import */ var react_calendar_heatmap_dist_styles_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-calendar-heatmap/dist/styles.css */ "./node_modules/react-calendar-heatmap/dist/styles.css");
/* harmony import */ var react_calendar_heatmap_dist_styles_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_calendar_heatmap_dist_styles_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-helmet */ "./node_modules/react-helmet/lib/Helmet.js");
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_helmet__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_tooltip__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-tooltip */ "./node_modules/react-tooltip/dist/index.js");
/* harmony import */ var react_tooltip__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_tooltip__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _config_site_info__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../config/site-info */ "./src/config/site-info.ts");
/* harmony import */ var _redux_reducers_about__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../redux/reducers/about */ "./src/redux/reducers/about.ts");
/* harmony import */ var _utils_media__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../utils/media */ "./src/utils/media.ts");
/* harmony import */ var _content_loader__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../content-loader */ "./src/components/content-loader/index.tsx");
/* harmony import */ var _PieChart__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./PieChart */ "./src/components/about/PieChart.tsx");
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












var AboutDiv = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    display: flex;\n    flex-direction: column;\n    flex: 1 0 auto;\n    background-color: #fff;\n    .resume {\n        text-align: center;\n        font-size: 24px;\n    }\n    .about-header {\n        flex: 1 0 auto;\n        display: flex;\n        flex-direction: row;\n        border-bottom: 2px solid #444;\n        .person-base {\n            flex: 1 0 auto;\n            .name {\n                font-size: 20px;\n            }\n            .aim {\n                font-size: 12px;\n            }\n            ", ";\n        }\n        .person-info {\n            flex: 1 0 auto;\n            padding: 5px;\n            list-style: none;\n            li {\n                font-size: 12px;\n                padding: 5px;\n            }\n        }\n        .person-img {\n            flex: 1 0 auto;\n            text-align: right;\n            img {\n                width: 90px;\n                height: 90px;\n                border-radius: 2px;\n            }\n            h3{\n                display: none;\n            }\n            ", ";\n        }\n    }\n\n    .pie-chart{\n        display: flex;\n        ", ";\n    }\n\n    .skills-list {\n        display: flex;\n    }\n\n    .skills-list ul {\n        list-style: none;\n        padding-left: 0;\n        margin: 0;\n        flex: 1 0 auto;\n        width: 50%;\n    }\n\n    .skills-list ul li .progress {\n        position: relative;\n        display: block;\n        width: 100%;\n        height: 4px;\n        background: #eee;\n    }\n\n    .skills-list ul li .progress .percentage {\n        position: absolute;\n        left: 0;\n        top: 0;\n        width: 0%;\n        height: 100%;\n        background: #2eca7f;\n        transition: all 0.6s ease 0s;\n        border-radius: 4px;\n        &.html{\n            background-color: #e892bb;\n        }\n        &.css{\n            background-color: #ac97e0;\n        }\n        &.javascript{\n            background-color: #e0b176;\n        }\n        &.nodejs{\n            background-color: #4cf3ff;\n        }\n        &.mongodb{\n            background-color: #709441;\n        }\n        &.react{\n            background-color: #7fc8f8;\n        }\n        &.vue{\n            background-color: #51b1ef;\n        }\n    }\n\n    .skills-list ul li .progress {\n        position: relative;\n        display: block;\n        width: 100%;\n        height: 8px;\n        background: #eee;\n        border-radius: 4px;\n    }\n\n    .skills-list ul li {\n        position: relative;\n        padding: 15px 10px 0;\n    }\n\n    .skills-list ul li .name {\n        margin: 0 0 11px 0;\n        line-height: 16px;\n        font-weight: 400;\n    }\n"], ["\n    display: flex;\n    flex-direction: column;\n    flex: 1 0 auto;\n    background-color: #fff;\n    .resume {\n        text-align: center;\n        font-size: 24px;\n    }\n    .about-header {\n        flex: 1 0 auto;\n        display: flex;\n        flex-direction: row;\n        border-bottom: 2px solid #444;\n        .person-base {\n            flex: 1 0 auto;\n            .name {\n                font-size: 20px;\n            }\n            .aim {\n                font-size: 12px;\n            }\n            ",
    ";\n        }\n        .person-info {\n            flex: 1 0 auto;\n            padding: 5px;\n            list-style: none;\n            li {\n                font-size: 12px;\n                padding: 5px;\n            }\n        }\n        .person-img {\n            flex: 1 0 auto;\n            text-align: right;\n            img {\n                width: 90px;\n                height: 90px;\n                border-radius: 2px;\n            }\n            h3{\n                display: none;\n            }\n            ",
    ";\n        }\n    }\n\n    .pie-chart{\n        display: flex;\n        ",
    ";\n    }\n\n    .skills-list {\n        display: flex;\n    }\n\n    .skills-list ul {\n        list-style: none;\n        padding-left: 0;\n        margin: 0;\n        flex: 1 0 auto;\n        width: 50%;\n    }\n\n    .skills-list ul li .progress {\n        position: relative;\n        display: block;\n        width: 100%;\n        height: 4px;\n        background: #eee;\n    }\n\n    .skills-list ul li .progress .percentage {\n        position: absolute;\n        left: 0;\n        top: 0;\n        width: 0%;\n        height: 100%;\n        background: #2eca7f;\n        transition: all 0.6s ease 0s;\n        border-radius: 4px;\n        &.html{\n            background-color: #e892bb;\n        }\n        &.css{\n            background-color: #ac97e0;\n        }\n        &.javascript{\n            background-color: #e0b176;\n        }\n        &.nodejs{\n            background-color: #4cf3ff;\n        }\n        &.mongodb{\n            background-color: #709441;\n        }\n        &.react{\n            background-color: #7fc8f8;\n        }\n        &.vue{\n            background-color: #51b1ef;\n        }\n    }\n\n    .skills-list ul li .progress {\n        position: relative;\n        display: block;\n        width: 100%;\n        height: 8px;\n        background: #eee;\n        border-radius: 4px;\n    }\n\n    .skills-list ul li {\n        position: relative;\n        padding: 15px 10px 0;\n    }\n\n    .skills-list ul li .name {\n        margin: 0 0 11px 0;\n        line-height: 16px;\n        font-weight: 400;\n    }\n"])), _utils_media__WEBPACK_IMPORTED_MODULE_9__["default"].phone(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n                display: none;\n            "], ["\n                display: none;\n            "]))), _utils_media__WEBPACK_IMPORTED_MODULE_9__["default"].phone(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n                flex: auto;\n                text-align: left;\n                img{\n                    width: 70px;\n                    height: 70px;\n                }\n                h3{\n                    font-size: 12px;\n                    display: block;\n                }\n            "], ["\n                flex: auto;\n                text-align: left;\n                img{\n                    width: 70px;\n                    height: 70px;\n                }\n                h3{\n                    font-size: 12px;\n                    display: block;\n                }\n            "]))), _utils_media__WEBPACK_IMPORTED_MODULE_9__["default"].phone(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n            display: block;\n        "], ["\n            display: block;\n        "]))));
var today = new Date();
var About = /** @class */ (function (_super) {
    __extends(About, _super);
    function About(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isLoading: false
        };
        return _this;
    }
    About.asyncData = function (store) {
        return store.dispatch(Object(_redux_reducers_about__WEBPACK_IMPORTED_MODULE_8__["fetchUserProfile"])('bs32g1038'));
    };
    About.prototype.componentDidMount = function () {
        var _this = this;
        var profile = this.props._DB.profile;
        if (profile) {
            return;
        }
        this.setState({
            isLoading: true
        });
        About.asyncData({ dispatch: this.props.dispatch }).then(function () {
            _this.setState({
                isLoading: false
            });
        });
    };
    About.prototype.render = function () {
        var userProfile = this.props._DB.profile;
        var values = [];
        var userRepos;
        var totalContributionLastYear;
        if (userProfile) {
            userRepos = userProfile.userRepos;
            totalContributionLastYear = userProfile.userCommits && userProfile.userCommits.total || 0;
            if (userProfile && userProfile.userCommits && userProfile.userCommits.contribution) {
                values = userProfile.userCommits.contribution.map(function (item) {
                    return {
                        year: item.year,
                        date: item.year + '-' + item.month,
                        count: item.count,
                    };
                });
            }
        }
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(AboutDiv, { className: "about" }, this.state.isLoading ?
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_helmet__WEBPACK_IMPORTED_MODULE_4__["Helmet"], { title: _config_site_info__WEBPACK_IMPORTED_MODULE_7__["default"].name + '-关于' }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h1", { className: "resume" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_content_loader__WEBPACK_IMPORTED_MODULE_10__["default"], { width: 720, height: 40 },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: "260", y: "0", width: "200", height: "40" }))),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_content_loader__WEBPACK_IMPORTED_MODULE_10__["default"], { width: 720, height: 30 },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: "0", y: "0", rx: "2", ry: "2", width: "720", height: "30" })),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_content_loader__WEBPACK_IMPORTED_MODULE_10__["default"], { width: 720, height: 100 },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: "0", y: "10", rx: "2", ry: "2", width: "160", height: "100" }),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: "190", y: "10", rx: "2", ry: "2", width: "160", height: "100" }),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: "370", y: "10", rx: "2", ry: "2", width: "160", height: "100" }),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: "550", y: "10", rx: "2", ry: "2", width: "160", height: "100" })),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_content_loader__WEBPACK_IMPORTED_MODULE_10__["default"], { width: 720, height: 30 },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: "0", y: "20", rx: "2", ry: "2", width: "720", height: "30" })),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_content_loader__WEBPACK_IMPORTED_MODULE_10__["default"], { width: 720, height: 100 },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: "0", y: "20", rx: "2", ry: "2", width: "720", height: "100" })),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_content_loader__WEBPACK_IMPORTED_MODULE_10__["default"], { width: 720, height: 180 },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: "0", y: "20", rx: "2", ry: "2", width: "370", height: "30" }),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: "0", y: "70", rx: "2", ry: "2", width: "250", height: "30" }),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: "0", y: "120", rx: "2", ry: "2", width: "370", height: "30" }),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("circle", { cx: "600", cy: "80", r: "60" })),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_content_loader__WEBPACK_IMPORTED_MODULE_10__["default"], { width: 720, height: 260 },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: "0", y: "0", width: "720", height: "20" }),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: "40", y: "40", width: "460", height: "30" }),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: "40", y: "90", width: "280", height: "20" }),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: "40", y: "130", width: "280", height: "20" }),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: "40", y: "170", width: "280", height: "20" }),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: "40", y: "210", width: "280", height: "20" })),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_content_loader__WEBPACK_IMPORTED_MODULE_10__["default"], { width: 720, height: 260 },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: "0", y: "0", width: "720", height: "20" }),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: "40", y: "40", width: "460", height: "30" }),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: "40", y: "90", width: "280", height: "20" }),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: "40", y: "130", width: "280", height: "20" }),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: "40", y: "170", width: "280", height: "20" }),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: "40", y: "210", width: "280", height: "20" })),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_content_loader__WEBPACK_IMPORTED_MODULE_10__["default"], { width: 720, height: 260 },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: "0", y: "0", width: "720", height: "20" }),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: "40", y: "40", width: "460", height: "30" }),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: "40", y: "90", width: "280", height: "20" }),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: "40", y: "130", width: "280", height: "20" }),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: "40", y: "170", width: "280", height: "20" }),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("rect", { x: "40", y: "210", width: "280", height: "20" })))
            :
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_helmet__WEBPACK_IMPORTED_MODULE_4__["Helmet"], { title: _config_site_info__WEBPACK_IMPORTED_MODULE_7__["default"].name + '-关于' }),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h1", { className: "resume" }, "--\u5173\u4E8E--"),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", { style: { padding: '10px 18px', margin: '0 10px', backgroundColor: '#efefef', borderRadius: '4px' } }, "\u4E13\u6CE8\u4E8Eweb\u524D\u7AEF\u5F00\u53D1\u3002\u559C\u6B22\u65B0\u4E8B\u7269\uFF0C\u5173\u6CE8\u524D\u7AEF\u52A8\u6001\uFF0C\u5BF9\u65B0\u7684\u6280\u672F\u6709\u8FFD\u6C42\uFF1B\u6D89\u730E\u5E7F\u6CDB\uFF0C\u559C\u6B22 coding\u3002"),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", { style: { padding: '0 10px' } }, "\u672C\u535A\u5BA2\u662F\u4E00\u4E2A\u6280\u672F\u6027\u535A\u5BA2\uFF0C\u5E73\u65F6\u4E3B\u8981\u53D1\u5E03\u4E00\u4E9B\u5173\u4E8Eweb\u524D\u7AEF\u4EE5\u53CA\u540E\u7AEF\u5F00\u53D1\u7684\u6587\u7AE0\uFF0C\u8FD9\u5176\u4E2D\u5305\u62EC\u7B2C\u4E09\u65B9\u7684\u6587\u7AE0\uFF0C\u4E5F\u5305\u62EC\u6211\u81EA\u5DF1\u603B\u7ED3\u7684\u4E00\u4E9B\u6587\u7AE0\u3002 \u6211\u4F1A\u4E00\u76F4\u575A\u6301\u5199\u4F5C\uFF0C\u628A\u81EA\u5DF1\u7684\u4E00\u4E9B\u7B14\u8BB0\u8BB0\u5F55\u4E0B\u6765\uFF0C\u4EE5\u4F5C\u5907\u5FD8\u548C\u5206\u4EAB\u3002"),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "about-header" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "person-base" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", { className: "name" }, "\u51B7\u591C\u6D41\u661F"),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", { className: "aim" }, "\u6C42\u804C\u76EE\u6807\uFF1Aweb\u524D\u7AEF\u5DE5\u7A0B\u5E08")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", { className: "person-info" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null,
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-user fa-fw" }),
                                "2*\u5C81"),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null,
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-phone fa-fw" }),
                                "185(*^_^*)7248"),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null,
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-flag fa-fw" }),
                                "\u8BA1\u7B97\u673A\u79D1\u5B66\u4E0E\u6280\u672F")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", { className: "person-info" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null,
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-map-marker fa-fw" }),
                                "\u5E7F\u4E1C\u7701\u5E7F\u5DDE\u5E02"),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null,
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-envelope fa-fw" }),
                                "bs32g1038@163.com"),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null,
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-university fa-fw" }),
                                "\u5927\u5B66\u672C\u79D1")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "person-img" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", { src: "/public/images/avatar.png", alt: "\u5934\u50CF" }),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", { className: "aim" }, "web\u524D\u7AEF\u5DE5\u7A0B\u5E08"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null,
                        "Github ",
                        totalContributionLastYear,
                        " contributions in the last year"),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_calendar_heatmap__WEBPACK_IMPORTED_MODULE_2__["default"], { startDate: (values[0] && values[0].year + '-1-1') || (new Date().getFullYear()) - 1 + '-1-1', endDate: today, values: values, classForValue: function (value) {
                            if (!value) {
                                return 'color-empty';
                            }
                            return "color-github-" + value.count;
                        }, tooltipDataAttrs: function (value) {
                            if (!value.date) {
                                return {};
                            }
                            return {
                                'data-tip': value.date + " has count: " + value.count,
                            };
                        }, showWeekdayLabels: true }),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_tooltip__WEBPACK_IMPORTED_MODULE_6___default.a, null),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "pie-chart" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", { style: { minWidth: 140 } }, "Stars per Repo(top 5)"),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_PieChart__WEBPACK_IMPORTED_MODULE_11__["default"], { userRepos: userRepos })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "skills-list" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", null,
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", { className: "border-line-h" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "name" }, "HTML5"),
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "progress" },
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "percentage html", style: { width: '80%' }, title: "80%" }))),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", { className: "border-line-h" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "name" }, "CSS3"),
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "progress" },
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "percentage css", style: { width: '85%' }, title: "85%" }))),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", { className: "border-line-h" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "name" }, "Mongodb"),
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "progress" },
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "percentage mongodb", style: { width: '75%' }, title: "75%" }))),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", { className: "border-line-h" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "name" }, "Vue/Vue-router/Vuex"),
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "progress" },
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "percentage vue", style: { width: '80%' }, title: "80%" })))),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", null,
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", { className: "border-line-h" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "name" }, "Javascript"),
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "progress" },
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "percentage javascript", style: { width: '85%' }, title: "85%" }))),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", { className: "border-line-h" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "name" }, "NODEJS"),
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "progress" },
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "percentage nodejs", style: { width: '77%' }, title: "77%" }))),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", { className: "border-line-h" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "name" }, "Git"),
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "progress" },
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "percentage git", style: { width: '70%' }, title: "70%" }))),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", { className: "border-line-h" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "name" }, "React/React-router/Redux"),
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "progress" },
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "percentage react", style: { width: '82%' }, title: "82%" }))))))));
    };
    return About;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_5__["connect"])(function (state) { return ({
    _DB: state.about
}); })(About));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;


/***/ })

};
//# sourceMappingURL=main.e511e66fdbd35d897a6a.hot-update.js.map