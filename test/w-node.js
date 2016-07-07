import { WNode } from "../";
import { assert } from "chai";

describe("WNode", () => {
    const testDOMElement = document.createElement("div");
    testDOMElement.innerHTML = "test";

    it("check getDOMElement method", () => {
        const wNode = new WNode(testDOMElement);
        assert(wNode.getDOMElement(), testDOMElement);
    });
});
