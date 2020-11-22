import { StorageServiceInstance } from '../StorageServiceInstance';

export class SessionStorageInstance extends StorageServiceInstance {
    get(name) {
        return window.sessionStorage.getItem(name);
    }

    set(name, value, options) {
        window.sessionStorage.setItem(name, value);
    }

    remove(name) {
        window.sessionStorage.removeItem(name);
    }
}
