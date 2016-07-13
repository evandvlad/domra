/* global describe, it */

import { WNode } from "../../";
import { assert } from "chai";
import { createElement } from "../helpers/dom-builder";

describe("WNode", () => {
    it("check getDOMElement method", () => {
        const element = createElement("div", "test");
        assert(new WNode(element).getDOMElement(), element);
    });
});
