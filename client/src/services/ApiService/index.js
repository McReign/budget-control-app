import { AxiosInstance } from './instances/AxiosInstance';

export class ApiService {
    constructor(instance) {
        this.instance = instance;
    }

    get(url, data, options) {
        return this.instance.get(url, data, options);
    }

    post(url, data, options) {
        return this.instance.post(url, data, options);
    }
}

export const apiService = new ApiService(new AxiosInstance());
