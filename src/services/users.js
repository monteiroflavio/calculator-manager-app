import axios from 'axios';

import TokenService from './tokens';

class UserService {
    static #setUserId(userId) {
        localStorage.setItem('userId', userId);
    }

    static getUserId() {
        return localStorage.getItem('userId');
    }

    static async authenticate(username, password) {
        return axios.post("/v1/authenticate", {
            "username": username,
            "password": password
        }).then((res) => {
            TokenService.setToken(res.data.token);
            UserService.#setUserId(res.data.user?.id);
            return true;
        }).catch((_) => {
            return false;
        });
    }
}

export default UserService;