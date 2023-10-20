import axios from 'axios';
import UserService from './users';

class OperationService {
    constructor() {
        this.userId = new UserService().getUserId();
        this.baseURL = `http://68.183.137.187:8080/v1/users/${this.userId}/operations`
    }
    async list() {
        return axios.get(this.baseURL).then((res) => { return res.data });
    }
}

export default OperationService;