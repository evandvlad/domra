import WNode from "./w-node";

export default class extends WNode {
    getDOMElement() {
        return Array.from(this._value).reduce((acc, element) => {
            acc.appendChild(element);
            return acc;
        }, document.createDocumentFragment());
    }
};
