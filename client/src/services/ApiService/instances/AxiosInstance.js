import axios from 'axios';
import { ApiServiceInstance } from '../ApiServiceInstance';

export class AxiosInstance extends ApiServiceInstance {
    get(url, data, options) {
        return axios.get(url, { ...options, params: data });
    }

    post(url, data, options) {
        return axios.post(url, data, options);
    }
}
