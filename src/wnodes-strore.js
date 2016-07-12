const generateToken = (() => {
    let index = 0;

    return () => {
        index += 1;

        return [
            Date.now(),
            Math.random().toString().slice(0, 32),
            index
        ].join("-");
    };
})();

export default class {
    constructor() {
        this._store = Object.create(null);
    }

    put(wnode) {
        const token = generateToken();
        this._store[token] = wnode;
        return token;
    }

    has(token) {
        return !!this._store[token];
    }

    pull(token) {
        const wnode = this._store[token];
        delete this._store[token];
        return wnode;
    }
}
