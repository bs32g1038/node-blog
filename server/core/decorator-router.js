const express = require('express');
const auth = require('../utils/auth');
const _routes_ = [];

export function AUTH() {
    return function(target, name, descriptor) {
        const fn = descriptor.value;
        descriptor.value = async (req, res, next) => {
            const user = auth(req)
            user ? fn(req, res, next) : res.status(401).json({
                msg: 'Failed to authenticate user!'
            })
        }
        return descriptor
    }
}

function route(method, path) {
    return (target, key, descriptor) => {
        _routes_.push({ target, method, path, key });
        return descriptor;
    };
};

export function ROUTER(path) {
    return function(target) {
        target.basePath = path || '';
        target.isBaseRouter = true;
    }
}

export function GET(path = '') {
    return route('get', path);
};

export function POST(path = '') {
    return route('post', path);
};

export function PUT(path = '') {
    return route('put', path);
};

export function PATCH(path = '') {
    return route('patch', path);
};

export function DELETE(path = '') {
    return route('delete', path);
};

export function getRoutes() {
    const router = express.Router();
    for (const route of _routes_) {
        if (!route.target.isBaseRouter) {
            throw new Error('请确保使用@ROUTER进行类注入！！')
        }
        router[route.method](route.target.basePath + '' + route.path, route.target[route.key])
    }
    return router;
}