const validator = require('validator');

module.exports = {

    getPage: function (page = '1', limit = '10') {
        if (!validator.isInt(page, { min: 1, max: 50 })) {
            page = '1';
        }
        if (!validator.isInt(limit, { min: 10, max: 100 })) {
            limit = '10';
        }
        return {
            page: parseInt(page, 10),
            limit: parseInt(limit, 10)
        };
    }

};