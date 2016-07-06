import { WNode, WElement, WList } from "../";
import { assert } from "chai";

describe("wrappers", () => {
    const testDOMElement = document.createElement("div");
    testDOMElement.innerHTML = "test";

    it("check instanceof WNode", () => {
        [
            new WElement(testDOMElement),
            new WList([testDOMElement])
        ].forEach(wrapper => {
            assert(wrapper instanceof WNode);
        });
    });

    it("check getDOMElement method", () => {
        [
            new WElement(testDOMElement),
            new WList([testDOMElement])
        ].forEach(wrapper => {
            assert(typeof wrapper.getDOMElement === "function");
        });
    });

    it("check inheritance hierarchy", () => {
        [
            { wrapper: new WNode(testDOMElement), rules: [ true, false, false ]},
            { wrapper: new WElement(testDOMElement), rules: [ true, true, false ]},
            { wrapper: new WList([testDOMElement]), rules: [ true, false, true ]},
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
            new WNode2(testDOMElement),
            new WElement2(testDOMElement),
            new WList2([testDOMElement]),
            new WElement3(testDOMElement)
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

        const wNode2 = new WNode2(testDOMElement);

        assert.equal(wNode2.getDOMElement(), "test!");
    });
});
