export default class {
    constructor(config) {
        this._config = config;
    }

    process(template, store) {
        const rootElement = document.createElement("div");

        rootElement.innerHTML = template;

        this._findPlaceholders(rootElement).forEach(placeholder => {
            const token = placeholder.getAttribute(this._config.placeholderAttribute);
            const wnode = store.pull(token);
            this._replacePlaceholder(placeholder, wnode);
        });

        return rootElement.innerHTML;
    }

    _findPlaceholders(element) {
        const { placeholderTag: tag, placeholderAttribute: attr } = this._config;
        return Array.from(element.querySelectorAll(`${ tag }[${ attr }]`));
    }

    _replacePlaceholder(placeholder, wnode) {
        placeholder.parentNode.replaceChild(wnode.getDOMElement(), placeholder);
        return this;
    }
}
