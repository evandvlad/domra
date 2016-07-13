/* global document */

import WNode from "./w-node";

export default class extends WNode {
    getDOMElement() {
        const frag = document.createDocumentFragment();

        try {
            return Array.from(this._value).reduce((acc, element) => {
                acc.appendChild(element);
                return acc;
            }, frag);
        } catch (e) {
            throw new Error("can't correct process DOM elements");
        }
    }
}
