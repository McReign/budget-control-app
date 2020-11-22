export class StorageServiceInstance {
    get(name) {
        throw new Error('Must override method');
    }

    set(name, value) {
        throw new Error('Must override method');
    }

    remove(name) {
        throw new Error('Must override method');
    }
}
