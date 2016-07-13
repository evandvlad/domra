/* global document */

const resultFormattersMap = new Map([
    ["string", ({ innerHTML }) => innerHTML],
    ["wrapper", rootElement => rootElement],
    ["first-node", ({ childNodes }) => childNodes.length ? childNodes[0] : document.createTextNode("")],
    ["node-array", ({ childNodes }) => Array.from(childNodes)],
    ["fragment", ({ childNodes }) => {
        return Array.from(childNodes).reduce((acc, child) => {
            acc.appendChild(child);
            return acc;
        }, document.createDocumentFragment());
    }]
]);

export default class {
    constructor(config) {
        this._config = config;
    }

    process(content, store) {
        const wrapperElement = this._createWrapperElement(content);

        this._findPlaceholders(wrapperElement).forEach(placeholder => {
            const token = placeholder.getAttribute(this._config.placeholderAttr);

            if (store.has(token)) {
                const wnode = store.pull(token);
                this._replacePlaceholder(placeholder, wnode);
            }
        });

        return this._extractResult(wrapperElement);
    }

    _createWrapperElement(content) {
        const { wrapperTag: tag, wrapperAttrs: attrs } = this._config;
        const element = document.createElement(tag);

        Object.keys(attrs).forEach(name => {
            element.setAttribute(name, attrs[name]);
        });

        element.innerHTML = content;

        return element;
    }

    _findPlaceholders(element) {
        const { placeholderTag: tag, placeholderAttr: attr } = this._config;
        return Array.from(element.querySelectorAll(`${ tag }[${ attr }]`));
    }

    _replacePlaceholder(placeholder, wnode) {
        placeholder.parentNode.replaceChild(wnode.getDOMElement(), placeholder);
        return this;
    }

    _extractResult(wrapperElement) {
        const format = this._config.outputFormat;

        if (typeof format === "string") {
            if (resultFormattersMap.has(format)) {
                return resultFormattersMap.get(format)(wrapperElement);
            }

            throw new Error(`unknown outputFormat value: "${ format }"`);
        }

        if (typeof format === "function") {
            return format(wrapperElement);
        }

        throw new Error("outputFormat must be string or function");
    }
}