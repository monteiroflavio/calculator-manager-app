import axios from 'axios';

class TokenService {
    static setToken(token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
}

export default TokenService;