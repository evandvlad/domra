import { WList } from "../../";
import { assert } from "chai";
import { checkFragment } from "../helpers/dom-checker";
import { createElement, createTree } from "../helpers/dom-builder";

describe("WList", () => {
    describe("correct argument type", () => {
        it("array", () => {
            const wElement = new WList([createElement("p"), createElement("p")]);
            checkFragment(wElement.getDOMElement(), 2);
        });

        it("HTMLCollection", () => {
            const tree = createTree(createElement("div"), [createElement("p"), createElement("p")]);
            const wElement = new WList(tree.getElementsByTagName("p"));
            checkFragment(wElement.getDOMElement(), 2);
        });

        it("NodeList", () => {
            const tree = createTree(createElement("div"), [createElement("p"), createElement("p")]);
            const wElement = new WList(tree.querySelectorAll("p"));
            checkFragment(wElement.getDOMElement(), 2);
        });

        it("iterator", () => {
            function *gen() {
                yield createElement("p");
                yield createElement("p");
            }

            checkFragment(new WList(gen()).getDOMElement(), 2);
        });

        it("Arguments", () => {
            (function() {
                checkFragment(new WList(arguments).getDOMElement(), 2);
            }(createElement("p"), createElement("p")));
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
                checkFragment(new WList(testItem.testValue).getDOMElement(), 0);
            });
        });
    });

    it("empty list", () => {
        checkFragment(new WList([]).getDOMElement(), 0);
    });
});
