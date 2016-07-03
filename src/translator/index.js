import placeholderCreator from "./placeholder-creator";

export default class {
    constructor(config, isNeedPlaceholder) {
        this._config = config;
        this._isNeedPlaceholder = isNeedPlaceholder;
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
        if (!this._isNeedPlaceholder(value)){
            return value;
        }

        const { id, value: placeholder } = placeholderCreator.create(
            this._config.placeholderTag, this._config.placeholderAttibute
        );

        this._placeholders.set(id, value);

        return placeholder;
    }
}