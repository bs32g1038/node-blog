import axios from '../utils/axios';

export default class Guestbook {
    public static fetchGuestbooks() {
        return axios.get('/guestbooks').then(_ => {
            return _.data;
        });
    }
}
