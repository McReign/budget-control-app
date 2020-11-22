import { CookieInstance } from './instances/CookieInstance';
import { LocalStorageInstance } from './instances/LocalStorageInstance';
import { SessionStorageInstance } from './instances/SessionStorageInstance';

export class StorageService {
    constructor(instance) {
        this.instance = instance;
    }

    get(name) {
        return this.instance.get(name);
    }

    set(name, value, options) {
        return this.instance.set(name, value, options);
    }

    remove(name) {
        return this.instance.remove(name);
    }
}

export const cookieStorageService = new StorageService(new CookieInstance());
export const localStorageService = new StorageService(new LocalStorageInstance());
export const sessionStorageService = new StorageService(new SessionStorageInstance());
