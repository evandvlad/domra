import WNodesStore from "./wnodes-strore";
import InputProcessor from "./input-processor";
import OutputProcessor from "./output-processor";

const defaultConfig = {
    placeholderTag: "var",
    placeholderAttr: "data-domra-id",
    wrapperTag: "div",
    wrapperAttrs: Object.create(null)
};

function domra(config = {}) {
    const conf = Object.assign(Object.create(null), defaultConfig, config);

    return function(strings, ...values) {
        const store = new WNodesStore();
        const inputProcessor = new InputProcessor(store, conf);
        const outputProcessor = new OutputProcessor(conf);
        const template = inputProcessor.process(strings, values);
        return outputProcessor.process(template, store);
    };
}

export { domra as default };
export { default as WNode } from "./wrappers/w-node";
export { default as WElement } from "./wrappers/w-element";
export { default as WList } from "./wrappers/w-list";