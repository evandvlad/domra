import { WList } from "../";
import { assert } from "chai";

describe("WList", () => {
    function checkInstanceOf(dElement) {
        assert(dElement instanceof DocumentFragment);
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
            const dElement = wElement.getDOMElement();

            checkInstanceOf(dElement);
            assert(dElement.childNodes.length, 2);
        });

        it("HTMLCollection", () => {
            const testWrapperDOMElement = createTestDOMTree();

            const wElement = new WList(testWrapperDOMElement.getElementsByTagName("p"));
            const dElement = wElement.getDOMElement();

            checkInstanceOf(dElement);
            assert(dElement.childNodes.length, 2);
        });

        it("NodeList", () => {
            const testWrapperDOMElement = createTestDOMTree();

            const wElement = new WList(testWrapperDOMElement.querySelectorAll("p"));
            const dElement = wElement.getDOMElement();

            checkInstanceOf(dElement);
            assert(dElement.childNodes.length, 2);
        });

        it("iterator", () => {
            function *gen() {
                yield document.createElement("p");
                yield document.createElement("p");
            }

            const wElement = new WList(gen());
            const dElement = wElement.getDOMElement();

            checkInstanceOf(dElement);
            assert(dElement.childNodes.length, 2);
        });

        it("Arguments", () => {
            (function() {
                const wElement = new WList(arguments);
                const dElement = wElement.getDOMElement();

                checkInstanceOf(dElement);
                assert(dElement.childNodes.length, 2);
            }(document.createElement("p"), document.createElement("p")));
        });
    });

    it("empty list", () => {
        const wElement = new WList([]);
        const dElement = wElement.getDOMElement();

        checkInstanceOf(dElement);
    });
});
