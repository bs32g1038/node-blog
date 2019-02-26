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












var AboutDiv = _emotion_styled__WEBPACK_IMPORTED_MODULE_0__["default"].div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    display: flex;\n    flex-direction: column;\n    flex: 1 0 auto;\n    background-color: #fff;\n    .resume {\n        text-align: center;\n        font-size: 24px;\n    }\n    .about-header {\n        flex: 1 0 auto;\n        display: flex;\n        flex-direction: row;\n        border-bottom: 2px solid #444;\n        .person-base {\n            flex: 1 0 auto;\n            .name {\n                font-size: 20px;\n            }\n            .aim {\n                font-size: 12px;\n            }\n            ", ";\n        }\n        .person-info {\n            flex: 1 0 auto;\n            padding: 5px;\n            list-style: none;\n            li {\n                font-size: 12px;\n                padding: 5px;\n            }\n        }\n        .person-img {\n            flex: 1 0 auto;\n            text-align: right;\n            img {\n                width: 90px;\n                height: 90px;\n                border-radius: 2px;\n            }\n            h3{\n                display: none;\n            }\n            ", ";\n        }\n    }\n    .about-main {\n        display: flex;\n        flex-direction: column;\n        ", ";\n    }\n    .about-main-item {\n        flex: 1 0 auto;\n        .about-main-title{\n            flex: 0 0 auto;\n            i {\n                vertical-align: text-bottom;\n                margin-left: 5px;\n            }\n        }\n        .about-main-content{\n            font-size: 14px;\n            line-height: 26px;\n            padding: 10px 10px 0;\n            margin: 0;\n            list-style: circle;\n            h3{\n                margin:  0;\n            }\n            h4{\n                margin: 0;\n            }\n            p{\n                margin: 5px 0;\n            }\n        }\n    }\n\n    .pie-chart{\n        display: flex;\n        ", ";\n    }\n\n    .skills-list {\n        display: flex;\n    }\n\n    .skills-list ul {\n        list-style: none;\n        padding-left: 0;\n        margin: 0;\n        flex: 1 0 auto;\n        width: 50%;\n    }\n\n    .skills-list ul li .progress {\n        position: relative;\n        display: block;\n        width: 100%;\n        height: 4px;\n        background: #eee;\n    }\n\n    .skills-list ul li .progress .percentage {\n        position: absolute;\n        left: 0;\n        top: 0;\n        width: 0%;\n        height: 100%;\n        background: #2eca7f;\n        transition: all 0.6s ease 0s;\n        border-radius: 4px;\n        &.html{\n            background-color: #e892bb;\n        }\n        &.css{\n            background-color: #ac97e0;\n        }\n        &.javascript{\n            background-color: #e0b176;\n        }\n        &.nodejs{\n            background-color: #4cf3ff;\n        }\n        &.mongodb{\n            background-color: #709441;\n        }\n        &.react{\n            background-color: #7fc8f8;\n        }\n        &.vue{\n            background-color: #51b1ef;\n        }\n    }\n\n    .skills-list ul li .progress {\n        position: relative;\n        display: block;\n        width: 100%;\n        height: 8px;\n        background: #eee;\n        border-radius: 4px;\n    }\n\n    .skills-list ul li {\n        position: relative;\n        padding: 15px 10px 0;\n    }\n\n    .skills-list ul li .name {\n        margin: 0 0 11px 0;\n        line-height: 16px;\n        font-weight: 400;\n    }\n"], ["\n    display: flex;\n    flex-direction: column;\n    flex: 1 0 auto;\n    background-color: #fff;\n    .resume {\n        text-align: center;\n        font-size: 24px;\n    }\n    .about-header {\n        flex: 1 0 auto;\n        display: flex;\n        flex-direction: row;\n        border-bottom: 2px solid #444;\n        .person-base {\n            flex: 1 0 auto;\n            .name {\n                font-size: 20px;\n            }\n            .aim {\n                font-size: 12px;\n            }\n            ",
    ";\n        }\n        .person-info {\n            flex: 1 0 auto;\n            padding: 5px;\n            list-style: none;\n            li {\n                font-size: 12px;\n                padding: 5px;\n            }\n        }\n        .person-img {\n            flex: 1 0 auto;\n            text-align: right;\n            img {\n                width: 90px;\n                height: 90px;\n                border-radius: 2px;\n            }\n            h3{\n                display: none;\n            }\n            ",
    ";\n        }\n    }\n    .about-main {\n        display: flex;\n        flex-direction: column;\n        ",
    ";\n    }\n    .about-main-item {\n        flex: 1 0 auto;\n        .about-main-title{\n            flex: 0 0 auto;\n            i {\n                vertical-align: text-bottom;\n                margin-left: 5px;\n            }\n        }\n        .about-main-content{\n            font-size: 14px;\n            line-height: 26px;\n            padding: 10px 10px 0;\n            margin: 0;\n            list-style: circle;\n            h3{\n                margin:  0;\n            }\n            h4{\n                margin: 0;\n            }\n            p{\n                margin: 5px 0;\n            }\n        }\n    }\n\n    .pie-chart{\n        display: flex;\n        ",
    ";\n    }\n\n    .skills-list {\n        display: flex;\n    }\n\n    .skills-list ul {\n        list-style: none;\n        padding-left: 0;\n        margin: 0;\n        flex: 1 0 auto;\n        width: 50%;\n    }\n\n    .skills-list ul li .progress {\n        position: relative;\n        display: block;\n        width: 100%;\n        height: 4px;\n        background: #eee;\n    }\n\n    .skills-list ul li .progress .percentage {\n        position: absolute;\n        left: 0;\n        top: 0;\n        width: 0%;\n        height: 100%;\n        background: #2eca7f;\n        transition: all 0.6s ease 0s;\n        border-radius: 4px;\n        &.html{\n            background-color: #e892bb;\n        }\n        &.css{\n            background-color: #ac97e0;\n        }\n        &.javascript{\n            background-color: #e0b176;\n        }\n        &.nodejs{\n            background-color: #4cf3ff;\n        }\n        &.mongodb{\n            background-color: #709441;\n        }\n        &.react{\n            background-color: #7fc8f8;\n        }\n        &.vue{\n            background-color: #51b1ef;\n        }\n    }\n\n    .skills-list ul li .progress {\n        position: relative;\n        display: block;\n        width: 100%;\n        height: 8px;\n        background: #eee;\n        border-radius: 4px;\n    }\n\n    .skills-list ul li {\n        position: relative;\n        padding: 15px 10px 0;\n    }\n\n    .skills-list ul li .name {\n        margin: 0 0 11px 0;\n        line-height: 16px;\n        font-weight: 400;\n    }\n"])), _utils_media__WEBPACK_IMPORTED_MODULE_9__["default"].phone(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n                display: none;\n            "], ["\n                display: none;\n            "]))), _utils_media__WEBPACK_IMPORTED_MODULE_9__["default"].phone(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n                flex: auto;\n                text-align: left;\n                img{\n                    width: 70px;\n                    height: 70px;\n                }\n                h3{\n                    font-size: 12px;\n                    display: block;\n                }\n            "], ["\n                flex: auto;\n                text-align: left;\n                img{\n                    width: 70px;\n                    height: 70px;\n                }\n                h3{\n                    font-size: 12px;\n                    display: block;\n                }\n            "]))), _utils_media__WEBPACK_IMPORTED_MODULE_9__["default"].phone(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n            padding-left: 8px;\n        "], ["\n            padding-left: 8px;\n        "]))), _utils_media__WEBPACK_IMPORTED_MODULE_9__["default"].phone(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n            display: block;\n        "], ["\n            display: block;\n        "]))));
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
        console.log(profile);
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
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", { style: { borderLeft: '3px solid #ccc', padding: '5px 10px', backgroundColor: '#efefef' } }, "\u4E13\u6CE8\u4E8Eweb\u524D\u7AEF\u5F00\u53D1\u3002\u559C\u6B22\u65B0\u4E8B\u7269\uFF0C\u5173\u6CE8\u524D\u7AEF\u52A8\u6001\uFF0C\u5BF9\u65B0\u7684\u6280\u672F\u6709\u8FFD\u6C42\uFF1B\u6D89\u730E\u5E7F\u6CDB\uFF0C\u559C\u6B22 coding\u3002"),
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
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", { className: "aim" },
                                "\u6C42\u804C\u76EE\u6807\uFF1A",
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null),
                                "web\u524D\u7AEF\u5DE5\u7A0B\u5E08"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null,
                        " ",
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
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", { style: { minWidth: 140 } }, "Stars per Repo(top 12)"),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_PieChart__WEBPACK_IMPORTED_MODULE_11__["default"], { userRepos: userRepos })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "about-main" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "about-main-item" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", { className: "about-main-title", style: { marginBottom: 0 } },
                                "\u4E13\u4E1A\u6280\u80FD",
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-leaf" })),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "about-main-content" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "\u4E86\u89E3 photoshop \u8F6F\u4EF6\u4EE5\u53CA axurepr \u539F\u578B\u754C\u9762\u8F6F\u4EF6\uFF1B"),
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "\u80FD\u5F00\u53D1\u7B26\u5408w3c\u89C4\u8303\u7684\u524D\u53F0\u7F51\u9875\u3001\u5BF9 div+css \u76D2\u5B50\u6A21\u578B\u5E03\u5C40\u6709\u6DF1\u523B\u7684\u7406\u89E3; \u719F\u6089\u638C\u63E1 javascript \u4E2D dom \u7F16\u7A0B \u57FA\u672C\u539F\u7406\u3001\u4EE5\u53CA\u9762\u5411\u5BF9\u8C61\u7F16\u7A0B\u601D\u60F3\uFF1B"),
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "\u5BF9\u4E8EJS\u9AD8\u7EA7\u91CC\u9762(\u95ED\u5305\uFF0C\u4F5C\u7528\u57DF\u7B49\u6709\u4E00\u5B9A\u7684\u8BA4\u8BC6)\u638C\u63E1\u5E76\u4F7F\u7528\u524D\u7AEF\u6846\u67B6 bootstrap\u3001vue \u3001react \u3001jQuery\u7B49"),
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "\u719F\u6089 html5 \u8BED\u4E49\u5316\u6807\u7B7E\u7F16\u7A0B\u548C css3 \u7ED3\u6784\u9009\u62E9\u5668\u548C\u52A8\u753B\u5E76\u52A0\u4EE5\u4F7F\u7528\uFF1B"),
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "\u4E86\u89E3git\u64CD\u4F5C\uFF0C\u719F\u6089nodejs\u4E0Enpm\u751F\u6001\u5316\u5F00\u53D1, docker\u57FA\u672C\u4F7F\u7528\u3002")),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "skills-list" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", null,
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", { className: "border-line-h" },
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "name" }, "HTML5"),
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "progress" },
                                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "percentage html", style: { width: '80%' } }))),
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", { className: "border-line-h" },
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "name" }, "CSS3"),
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "progress" },
                                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "percentage css", style: { width: '85%' } }))),
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", { className: "border-line-h" },
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "name" }, "Mongodb"),
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "progress" },
                                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "percentage mongodb", style: { width: '75%' } }))),
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", { className: "border-line-h" },
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "name" }, "Vue/Vue-router/Vuex"),
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "progress" },
                                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "percentage vue", style: { width: '80%' } })))),
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", null,
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", { className: "border-line-h" },
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "name" }, "Javascript"),
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "progress" },
                                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "percentage javascript", style: { width: '85%' } }))),
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", { className: "border-line-h" },
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "name" }, "NODEJS"),
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "progress" },
                                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "percentage nodejs", style: { width: '77%' } }))),
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", { className: "border-line-h" },
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "name" }, "Git"),
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "progress" },
                                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "percentage git", style: { width: '70%' } }))),
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", { className: "border-line-h" },
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "name" }, "React/React-router/Redux"),
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "progress" },
                                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "percentage react", style: { width: '82%' } }))))),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "clear" })),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "about-main-item" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", { className: "about-main-title", style: { marginBottom: 0 } },
                                "\u9879\u76EE\u7ECF\u9A8C",
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-graduation-cap fa-fw" })),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", { className: "about-main-content" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null,
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h4", null, "\u9879\u76EE\uFF1A\u535A\u5BA2\u7F51\u7AD9\u5F00\u53D1"),
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, "\u9879\u76EE\u7B80\u4ECB\uFF1A\u4E00\u4E2A\u7C7B\u535A\u5BA2\u7684\u5E94\u7528\uFF0C\u4E3B\u8981\u8D1F\u8D23\u535A\u5BA2\u7684\u754C\u9762ui\u8BBE\u8BA1\uFF0C\u540E\u53F0\u6570\u636E\u4EA4\u6362\u903B\u8F91\u5B9E\u73B0\uFF0C\u9879\u76EE\u6587\u4EF6\u67B6\u6784\uFF0C\u8FED\u4EE3\u5F00\u53D1"),
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", { className: "person-info" },
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "\u4E3B\u8981\u662F\u4F7F\u7528react,nodejs\u7B49\u524D\u7AEFweb\u6280\u672F\u8FDB\u884C\u7F51\u7AD9\u7684\u5F00\u53D1"),
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "\u4F7F\u7528webpack\u6784\u5EFA\u524D\u540E\u7AEF"),
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "\u540E\u7AEF\u91C7\u7528nodejs express mongodb\u3002\u5229\u7528mongoose\u8FDB\u884C\u6A21\u578B\u89C4\u5212"),
                                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "\u9879\u76EE\u5F00\u6E90\u4EE3\u7801: https://github.com/bs32g1038/node-blog"))),
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null,
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h4", null, "\u9879\u76EE\uFF1A\u804C\u4E1A\u62DB\u8058\u7CFB\u7EDF\u524D\u7AEF\u5F00\u53D1"),
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, "\u9879\u76EE\u7B80\u4ECB\uFF1A\u4E3A\u5B66\u6821\u63D0\u4F9B\u804C\u4E1A\u62DB\u8058\u4FE1\u606F\uFF0C\u540C\u65F6\u89E3\u51B3\u5927\u5B66\u751F\u5C31\u4E1A\u95EE\u9898"),
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, "\u4E3B\u8981\u8D1F\u8D23\u8BE5\u9879\u76EE\u7684\u524D\u7AEF\u67B6\u6784\u4EE5\u53CA\u540E\u7EED\u7684\u5F00\u53D1\uFF0C\u5728\u8BE5\u9879\u76EE\u4E2D\uFF0C\u4E3B\u8981\u4F7F\u7528antdesign\uFF0Creact\uFF0Cwebpack\u7B49\u6280\u672F\uFF0C\u548C \u9E2D\u5B50\u6A21\u578B\uFF0C\u5171\u540C\u6784\u6210\u9879\u76EE\u7684\u89E3\u51B3\u65B9\u6848\u3002\u89E3\u51B3\u4E86\u56E2\u961F\u7684\u5206\u5DE5\u95EE\u9898\u4EE5\u53CA\u6784\u5EFA\u4E86\u9879\u76EE\u826F\u597D\u7684\u4EE3\u7801\u7ED3\u6784\uFF0C\u6700\u7EC8\u8BA9\u9700\u6C42\u53D8\u66F4\u53EF \u4EE5\u66F4\u5FEB\u7684\u88AB\u6D88\u5316\uFF0C\u6781\u901F\u7814\u53D1\u3001\u5FEB\u901F\u4E0A\u7EBF\u3001\u4E14\u65B9\u4FBF\u9879\u76EE\u540E\u671F\u7EF4\u62A4\uFF0C\u964D\u4F4E\u6210\u672C\uFF0C\u6700\u540E\u5728\u4EA7\u54C1\u7EBF\u4E2D\u5F00\u59CB\u63A8\u5E7F\u3002")),
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null,
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h4", null, "\u9879\u76EE\uFF1A\u5EB7\u590D\u5E73\u53F0\u524D\u7AEF\u5F00\u53D1"),
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, "\u9879\u76EE\u7B80\u4ECB\uFF1A\u4E00\u4E2A\u8F6F\u786C\u4EF6\u7ED3\u5408\u7684\u533B\u7597\u5E73\u53F0\uFF0C\u4E3B\u8981\u63D0\u4F9B\u5FEB\u6377\u4FBF\u5229\u7684\u5065\u5EB7\u533B\u7597\u670D\u52A1"),
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, "\u5728\u9879\u76EE\u4E2D\uFF0C\u4E3B\u8981\u91C7\u7528\u4E86bootstrap\uFF0Cjq\u6846\u67B6\u8FDB\u884C\u5F00\u53D1\uFF0C\u9488\u5BF9\u56E2\u961F\u7E41\u7410\u91CD\u590D\u6253\u5305html\uFF0Ccss\uFF0Cjs\uFF0Cimages\u7684\u5DE5\u4F5C\uFF0C\u91C7\u7528\u4E86gulp\u7B80\u5316\u4E86\u64CD\u4F5C\u6B65\u9AA4\uFF0C\u4F7F\u5F97\u5F00\u53D1\u548C\u5DE5\u4F5C\u6548\u7387\u5927\u5927\u63D0\u9AD8")),
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null,
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h4", null, "\u9879\u76EE\uFF1A\u901A\u4FE1\u9879\u76EEWEB\u5F00\u53D1"),
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, "\u9879\u76EE\u7B80\u4ECB\uFF1A\u8302\u540D\u901A\u4FE1- \u4E3A\u7528\u6237\u63D0\u4F9B\u5BBD\u5E26\u7F34\u8D39\uFF0C\u5BBD\u5E26\u62A5\u88C5\uFF0C\u7B49\u670D\u52A1\u7684\u4F01\u4E1A\u7CFB\u7EDF\u3002"),
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, "\u4E2A\u4EBA\u4E3B\u8981\u8D1F\u8D23\u9879\u76EE\u7684\u524D\u7AEF\u5F00\u53D1\uFF0C\u4EE5\u53CA\u90E8\u5206\u7684\u540E\u7AEFjava\u5F00\u53D1\uFF0C\u6784\u5EFA\u4E86\u901A\u7528\u7684web\u540E\u53F0\u524D \u7AEF\u6846\u67B6\uFF0C\u8D34\u5408\u4E86\u516C\u53F8\u7684\u4E1A\u52A1\u9700\u8981\uFF0C\u52A0\u5FEB\u4E86\u4EA7\u54C1\u5F00\u53D1\u3002\u540C\u65F6\u5728\u53E6\u4E00\u4E2A\u9879\u76EE\u4E2D\u4F7F\u7528\u4E86react\uFF0Cnodejs\uFF0Cantdesign \u7B49\u6280\u672F\uFF0C\u5BF9\u9879\u76EE\u7684\u6570\u636E\u8FC7\u6EE4\u548C\u6570\u636E\u56DE\u6EAF\u7B49\u529F\u80FD\u8FDB\u884C\u5F00\u53D1\u3002")),
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null,
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h4", null, "\u9879\u76EE\uFF1A\u5728\u7EBF\u5B66\u4E60webapp"),
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, "\u9879\u76EE\u7B80\u4ECB\uFF1A\u7C7B\u817E\u8BAF\u8BFE\u5802\u7C7B\u578B\u7684webapp\uFF0C\u4E3B\u8981\u662F\u79FB\u52A8\u7AEF\u5F00\u53D1"),
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, "\u5728\u9879\u76EE\u4E2D\uFF0C\u4E3B\u8981\u91C7\u7528\u4E86vue\u6846\u67B6\u8FDB\u884C\u5F00\u53D1\uFF0C\u5B9E\u73B0\u5728\u79FB\u52A8\u7AEF\u7684\u89C6\u9891\u64AD\u653E\uFF0C\u6570\u636E\u5C55\u793A\uFF0C\u6D77\u62A5\u5C55\u89C8\uFF0C\u6D3B\u52A8\u7ADE\u8D5B\u7B49\u529F\u80FD\u3002")))),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "about-main-item" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", { className: "about-main-title", style: { marginBottom: 0, marginTop: '10px' } },
                                "\u81EA\u6211\u8BC4\u4EF7",
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-edit fa-fw" })),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "about-main-content" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "\u5177\u6709\u826F\u597D\u7684\u56E2\u961F\u7CBE\u795E\uFF0C\u5F88\u5F3A\u7684\u8D23\u4EFB\u611F\uFF1B"),
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "\u5DE5\u4F5C\u8E0F\u5B9E\uFF0C\u8BA4\u771F\u8D1F\u8D23\uFF0C\u80FD\u591F\u7075\u6D3B\u5904\u7406\u5DE5\u4F5C\u4E2D\u7684\u7A81\u53D1\u4E8B\u4EF6\uFF1B"),
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "\u6211\u6B63\u5728\u627E\u4E00\u4E2A\u5E73\u53F0\uFF0C\u80FD\u591F\u5145\u5206\u628A\u81EA\u5DF1\u7684\u4F18\u52BF\u53D1\u6325\u51FA\u6765\uFF0C\u5171\u540C\u52AA\u529B\u6210\u5C31\u4E00\u756A\u4E8B\u4E1A\u3002")))))));
    };
    return About;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_5__["connect"])(function (state) { return ({
    _DB: state.about
}); })(About));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;


/***/ })

};
//# sourceMappingURL=main.0d98781316327032a03e.hot-update.js.map