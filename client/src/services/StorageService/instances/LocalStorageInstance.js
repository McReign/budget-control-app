import { StorageServiceInstance } from '../StorageServiceInstance';

export class LocalStorageInstance extends StorageServiceInstance {
    get(name) {
        return window.localStorage.getItem(name);
    }

    set(name, value, options) {
        window.localStorage.setItem(name, value);
    }

    remove(name) {
        window.localStorage.removeItem(name);
    }
}
