export class ApiServiceInstance {
    get(url, data, options) {
        throw new Error('Must override method');
    }

    post(url, data, options) {
        throw new Error('Must override method');
    }
}
