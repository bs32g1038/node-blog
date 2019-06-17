import axios from '../utils/axios';

export default class Cagegory {

    public static fetchCategories() {
        return axios.get('/categories').then((_) => {
            return _.data;
        });
    }

}