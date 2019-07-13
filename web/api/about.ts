import axios from '../utils/axios';

export default class About {

    public static fetchUserProfile(username: string) {
        return axios.get('/about/github/user-profile/' + username).then((_) => {
            return _.data;
        });
    }
}