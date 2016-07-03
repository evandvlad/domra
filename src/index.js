import Translator from "./translator/index";

const defaultConfig = {
    placeholderTag: "var",
    placeholderAttibute: "data-domra-id"
};

function domra(config = {}) {
    const conf = Object.assign(Object.create(null), defaultConfig, config);

    return function(strings, ...values) {
        const translator = new Translator(conf, () => false);
        const { template, placeholders } = translator.translate(strings, values);
        return template;
    };
}

export { domra as default };