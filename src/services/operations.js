import axios from 'axios';
import UserService from './users';

class OperationService {
    constructor() {
        this.userId = UserService.getUserId();
        this.baseURL = `/v1/users/${this.userId}/operations`
    }
    async list() {
        return axios.get(this.baseURL).then((res) => { return res.data });
    }
}

export default OperationService;