export default class {
    constructor(config) {
        this._config = config;
    }

    process(template, store) {
        const rootElement = document.createElement("div");

        rootElement.innerHTML = template;

        const { placeholderTag: tag, placeholderAttribute: attr } = this._config;

        Array.from(rootElement.querySelectorAll(`${ tag }[${ attr }]`)).forEach(placeholder => {
            const token = placeholder.getAttribute(attr);
            const element = store.pull(token);
            placeholder.parentNode.replaceChild(element, placeholder);
        });

        return rootElement.innerHTML;
    }
}
