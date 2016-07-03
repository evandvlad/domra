import Translator from "./translator";

const defaultConfig = {
    placeholderTag: "var",
    placeholderAttibute: "data-domra-id"
};

function domra(config = {}) {
    const conf = Object.assign(Object.create(null), defaultConfig, config);

    return function(strings, ...values) {
        const translator = new Translator(conf);
        const { template, placeholders } = translator.translate(strings, values);
        return template;
    };
}

export { domra as default };
export { default as WNode } from "./wrappers/w-node";
export { default as WElement } from "./wrappers/w-element";
export { default as WList } from "./wrappers/w-list";