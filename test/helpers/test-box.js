export default class {
    constructor(boxName, test) {
        this._boxName = boxName;
        this._test = test;
        this._items = [];
    }

    add(name, ...params) {
        this._items.push(() => {
            it(`${ this._boxName } > ${ name }`, () => {
                this._test(...params);
            });
        });

        return this;
    }

    run() {
        this._items.forEach(test => test());
        return this;
    }
}
