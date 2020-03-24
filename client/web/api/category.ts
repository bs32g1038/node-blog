import axios from '@blog/client/web/utils/axios';

export const fetchCategories = () => {
    return axios
        .get('/categories')
        .then((_) => {
            return _.data;
        })
        .catch((err) => {
            console.log(err);
        });
};
