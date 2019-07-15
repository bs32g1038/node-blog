import axios from '../utils/axios';
export default class Link {
    public static fetchLinks() {
        return axios.get('/links').then(_ => {
            return _.data;
        });
    }
}
