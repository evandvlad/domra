/* global Text, document, describe, it */

import domra, { WNode, WElement } from "../../";
import { assert } from "chai";

describe("examples", () => {

    it("ex-1", () => {
        document.body.innerHTML = "";

        const b = document.createElement("b");
        b.innerHTML = "world";

        document.body.appendChild(domra() `<p>Hello ${ new WElement(b) }.</p>`);
        assert.equal(document.body.innerHTML, "<p>Hello <b>world</b>.</p>");

        document.body.innerHTML = "";
    });

    it("ex-2", () => {
        class WText extends WNode {
            getDOMElement() {
                return document.createTextNode(super.getDOMElement());
            }
        }

        const textNode = new WText("Hello world");

        assert(textNode instanceof WText);
        assert(textNode instanceof WNode);
        assert(textNode.getDOMElement() instanceof Text);
        assert.equal(textNode.getDOMElement().nodeValue, "Hello world");
    });

    it("ex-3", () => {
        document.body.innerHTML = "";

        const element = document.createElement("p");
        element.innerHTML = "Hello world";
        document.body.innerHTML = domra({ outputFormat: "string" }) `${ new WElement(element) }`;

        assert.equal(document.body.innerHTML, "<p>Hello world</p>");
        document.body.innerHTML = "";
    });
});
