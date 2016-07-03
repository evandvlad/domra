import WNode from "./wrappers/w-node";

const generateId = (function() {
    let index = 0;

    return function() {
        index += 1;

        return [
            Date.now(),
            Math.random().toString().slice(0, 32),
            index
        ].join("-");
    };
}());

export default class {
    constructor(config) {
        this._config = config;
        this._placeholders = new Map();
    }

    translate(strings, values) {
        return {
            template: this._createTemplate(strings, values),
            placeholders: this._placeholders
        };
    }

    _createTemplate(strings, values) {
        const vals = [...values];

        return strings.reduce((acc, str, index) => {
            const val = index > 0 && vals.length ? this._processValue(vals.shift()) : "";
            return acc + val + str;
        }, "");
    }

    _processValue(value) {
        if (!this._isWrapper(value)){
            return value;
        }

        const id = generateId();
        this._placeholders.set(id, value.getDOMElement());

        return this._createPlaceholder(id);
    }

    _createPlaceholder(id) {
        return `<${this._config.placeholderTag} ${this._config.placeholderAttibute}="${id}">
            </${this._config.placeholderTag}>`;
    }

    _isWrapper(value) {
        return value instanceof WNode;
    }
}