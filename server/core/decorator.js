const express = require('express');

exports.ReqRouter = {
    _routes_: [],
    type: {
        GET: "get",
        POST: "post",
        PUT: "put",
        DELETE: "delete"
    },
    route: (path, type) => {
        return function(target, name, descriptor) {
            exports.ReqRouter._routes_.push({
                path,
                type,
                fn: target[name]
            })
        }
    },
    init: function() {
        const router = express.Router();
        for (const route of this._routes_) {
            router[route.type](route.path, route.fn)
        }
        return router;
    }
}