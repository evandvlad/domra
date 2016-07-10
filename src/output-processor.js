export default class {
    constructor(config) {
        this._config = config;
    }

    process(template, store) {
        const wrapperElement = this._createWrapperElement(template);

        this._findPlaceholders(wrapperElement).forEach(placeholder => {
            const token = placeholder.getAttribute(this._config.placeholderAttr);
            const wnode = store.pull(token);
            this._replacePlaceholder(placeholder, wnode);
        });

        return this._extractResult(wrapperElement);
    }

    _createWrapperElement(stringHtml) {
        const { wrapperTag: tag, wrapperAttrs: attrs } = this._config;
        const element = document.createElement(tag);

        Object.keys(attrs).forEach(name => {
            element.setAttribute(name, attrs[name]);
        });

        element.innerHTML = stringHtml;

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
        return wrapperElement.innerHTML;
    }
}