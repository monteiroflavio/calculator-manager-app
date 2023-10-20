import axios from 'axios';
import UserService from './users';

class RecordService {
    constructor() {
        this.userId = new UserService().getUserId();
        this.baseURL = `http://68.183.137.187:8080/v1/users/${this.userId}/records`
    }

    async list(q, limit, offset, sorting, sortingField) {
        const params = {
            ...(q) && { q: q },
            ...(limit) && { limit: limit },
            ...(offset) && { offset: offset },
            ...(sorting) && { sorting: sorting },
            ...(sortingField) && { "sorting-field": sortingField },
        }
        return axios.get(this.baseURL, { params: params }).then(res => { return res.data }).catch(_ => []);
    }

    async insert(operationId, a, b) {
        const data = {
            "operation-id": operationId,
            a: a,
            ...(b) && { b: b }
        }
        return axios.post(this.baseURL, data).then((res) => { return res.data; }).catch((reason) => { return reason.response?.data });
    }

    async delete(recordId) {
        const url = `${this.baseURL}/${recordId}`
        return axios.delete(url).then((_) => { return true; }).catch((_) => { return false });
    }
}

export default RecordService;