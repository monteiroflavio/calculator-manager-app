import axios from 'axios';

import TokenService from './tokens';

class UserService {
    constructor() {
        console.log(process.env.API);
        this.baseURL = `http://68.183.137.187:8080/v1/authenticate`;
    }
    #setUserId(userId) {
        localStorage.setItem('userId', userId);
    }

    getUserId() {
        return localStorage.getItem('userId');
    }

    async authenticate(username, password) {
        return axios.post(this.baseURL, {
            "username": username,
            "password": password
        }).then((res) => {
            TokenService.setToken(res.data.token);
            this.#setUserId(res.data.user?.id);
            return true;
        }).catch((_) => {
            return false;
        });
    }
}

export default UserService;