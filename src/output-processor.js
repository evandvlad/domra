const resultFormattersMap = new Map([
    ["string", rootElement => rootElement.innerHTML],
    ["wrapper", rootElement => rootElement],
    ["first-node", rootElement => rootElement.childNodes[0]],
    ["node-array", rootElement => Array.from(rootElement.childNodes || [])],
    ["fragment", rootElement => {
        const children = Array.from(rootElement.childNodes || []);
        const frag = document.createDocumentFragment();

        return children.reduce((acc, child) => {
            acc.appendChild(child);
            return acc;
        }, frag);
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
            const wnode = store.pull(token);
            this._replacePlaceholder(placeholder, wnode);
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