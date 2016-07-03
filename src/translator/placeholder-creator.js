function *idGenerator() {
    let index = 0;

    while(true) {
        index += 1;
        yield [Date.now(), index].join("--");
    }
}

export default {
    _idIterator: null,

    create(tag, attr) {
        this._idIterator = this._idIterator || idGenerator();
        const id = this._idIterator.next().value;

        return {
            id,
            value: `<${tag} ${attr}="${id}"></${tag}>`
        };
    }
};
