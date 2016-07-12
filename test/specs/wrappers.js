import { WNode, WElement, WList } from "../../";
import { assert } from "chai";
import { createElement } from "../helpers/dom-builder";

describe("wrappers", () => {
    it("check instanceof WNode", () => {
        [
            new WElement(createElement("div", "test")),
            new WList([createElement("div", "test")])
        ].forEach(wrapper => {
            assert(wrapper instanceof WNode);
        });
    });

    it("check getDOMElement method", () => {
        [
            new WElement(createElement("div", "test")),
            new WList([createElement("div", "test")])
        ].forEach(wrapper => {
            assert(typeof wrapper.getDOMElement === "function");
        });
    });

    it("check inheritance hierarchy", () => {
        [
            { wrapper: new WNode(createElement("div", "test")), rules: [ true, false, false ]},
            { wrapper: new WElement(createElement("div", "test")), rules: [ true, true, false ]},
            { wrapper: new WList([createElement("div", "test")]), rules: [ true, false, true ]},
            { wrapper: {}, rules: [ false, false, false ]}
        ].forEach(({ wrapper, rules }) => {
            assert.equal(wrapper instanceof WNode, rules[0]);
            assert.equal(wrapper instanceof WElement, rules[1]);
            assert.equal(wrapper instanceof WList, rules[2]);
        });

    });

    it("check correct inheritance", () => {
        class WNode2 extends WNode {}
        class WElement2 extends WElement {}
        class WList2 extends WList {}
        class WElement3 extends WElement2 {}

        [
            new WNode2(createElement("div", "test")),
            new WElement2(createElement("div", "test")),
            new WList2([createElement("div", "test")]),
            new WElement3(createElement("div", "test"))
        ].forEach(wrapper => {
            assert(wrapper instanceof WNode);
        });
    });

    it("check child class", () => {
        class WNode2 extends WNode {
            getDOMElement() {
                return super.getDOMElement().innerHTML + "!";
            }
        }

        const wNode2 = new WNode2(createElement("div", "test"));

        assert.equal(wNode2.getDOMElement(), "test!");
    });
});
