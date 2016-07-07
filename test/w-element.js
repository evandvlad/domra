import { WElement } from "../";
import { assert } from "chai";

describe("WElement", () => {
    const testDOMElement = document.createElement("div");
    testDOMElement.innerHTML = "test";

    it("check getDOMElement method", () => {
        const wElement = new WElement(testDOMElement);
        assert(wElement.getDOMElement(), testDOMElement);
    });
});
