import { WList } from "../";
import { assert } from "chai";

describe("WList", () => {
    function checkResultElement(dElement, childrenCount) {
        assert(dElement instanceof DocumentFragment);
        assert.equal(dElement.childNodes.length, childrenCount);
    }

    describe("correct argument type", () => {

        function createTestDOMTree() {
            const element = document.createElement("div");

            element.appendChild(document.createElement("p"));
            element.appendChild(document.createElement("p"));

            return element;
        }

        it("array", () => {
            const wElement = new WList([document.createElement("p"), document.createElement("p")]);
            checkResultElement(wElement.getDOMElement(), 2);
        });

        it("HTMLCollection", () => {
            const testWrapperDOMElement = createTestDOMTree();
            const wElement = new WList(testWrapperDOMElement.getElementsByTagName("p"));
            checkResultElement(wElement.getDOMElement(), 2);
        });

        it("NodeList", () => {
            const testWrapperDOMElement = createTestDOMTree();
            const wElement = new WList(testWrapperDOMElement.querySelectorAll("p"));
            checkResultElement(wElement.getDOMElement(), 2);
        });

        it("iterator", () => {
            function *gen() {
                yield document.createElement("p");
                yield document.createElement("p");
            }

            checkResultElement(new WList(gen()).getDOMElement(), 2);
        });

        it("Arguments", () => {
            (function() {
                checkResultElement(new WList(arguments).getDOMElement(), 2);
            }(document.createElement("p"), document.createElement("p")));
        });
    });

    describe("incorrect argument type", () => {
        [
            { name: "null", testValue: null },
            { name: "undefined" },
            { name: "not empty string", testValue: "test" }
        ].forEach(testItem => {
            it(testItem.name, () => {
                assert.throws(
                    () => new WList(testItem.testValue).getDOMElement(),
                    "can't correct process DOM elements"
                );
            });
        });
    });

    describe("argument type convert to empty list", () => {
        [
            { name: "boolean true", testValue: true },
            { name: "boolean false", testValue: false },
            { name: "object", testValue: {a: 1, b: 2} },
            { name: "function", testValue: () => {} },
            { name: "number", testValue: 0 }
        ].forEach(testItem => {
            it(testItem.name, () => {
                checkResultElement(new WList(testItem.testValue).getDOMElement(), 0);
            });
        });
    });

    it("empty list", () => {
        checkResultElement(new WList([]).getDOMElement(), 0);
    });
});
