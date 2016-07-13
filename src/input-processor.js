import WNode from "./wrappers/w-node";

export default class {
    constructor(store, config) {
        this._store = store;
        this._config = config;
    }

    process(strings, values) {
        const vals = [...values];

        const result = strings.reduce((acc, str, index) => {
            const val = index > 0 && vals.length ? this._processValue(vals.shift()) : "";
            return acc + val + str;
        }, "");

        return this._postProcessResult(result);
    }

    _processValue(value) {
        if (!this._isWrapper(value)) {
            return value;
        }

        const token = this._store.put(value);

        return this._createPlaceholder(token);
    }

    _createPlaceholder(id) {
        const { placeholderTag: tag, placeholderAttr: attr } = this._config;
        return `<${ tag } ${ attr } = "${ id }"></${ tag }>`;
    }

    _isWrapper(value) {
        return value instanceof WNode;
    }

    _postProcessResult(result) {
        return this._config.trimString ? result.trim() : result;
    }
}