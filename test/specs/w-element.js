/* global describe, it */

import { WElement } from "../../";
import { assert } from "chai";
import { createElement } from "../helpers/dom-builder";

describe("WElement", () => {
    it("check getDOMElement method", () => {
        const element = createElement("div", "test");
        assert(new WElement(element).getDOMElement(), element);
    });
});
