import InputProcessor from "./input-processor";
import OutputProcessor from "./output-processor";

const defaultConfig = {
    placeholderTag: "var",
    placeholderAttibute: "data-domra-id"
};

function domra(config = {}) {
    const conf = Object.assign(Object.create(null), defaultConfig, config);

    return function(strings, ...values) {
        const inputProcessor = new InputProcessor(conf);
        const outputProcessor = new OutputProcessor(conf);
        const { template, placeholders } = inputProcessor.process(strings, values);
        return outputProcessor.process(template, placeholders);
    };
}

export { domra as default };
export { default as WNode } from "./wrappers/w-node";
export { default as WElement } from "./wrappers/w-element";
export { default as WList } from "./wrappers/w-list";