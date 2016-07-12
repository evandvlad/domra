import domra, { WElement, WList } from "../../";
import { assert } from "chai";
import { createElement, createTree } from "../helpers/dom-builder";

describe("output-format", () => {
    describe("string", () => {
        const domraS = domra({ outputFormat: "string" });

        it("string html with single root", () => {
            const result = domraS `<div>test</div>`;
            assert.equal(result, "<div>test</div>");
        });

        it("string html with 3 root elements", () => {
            const result = domraS `<span>1</span><span>2</span><span>3</span>`;
            assert.equal(result, "<span>1</span><span>2</span><span>3</span>");
        });

        it("single w-element", () => {
            const element = createElement("div", "test");
            const result = domraS `${ new WElement(element) }`;
            assert.equal(result, "<div>test</div>");
        });

        it("inner single w-element", () => {
            const element = createElement("span", "test");
            const result = domraS `<div>${ new WElement(element) }</div>`;
            assert.equal(result, "<div><span>test</span></div>");
        });

        it("several w-elements", () => {
            const element1 = createElement("div", "test-1");
            const element2 = createElement("div", "test-2");
            const result = domraS `${ new WElement(element1) }${ new WElement(element2) }`;
            assert.equal(result, "<div>test-1</div><div>test-2</div>");
        });

        it("text between w-elements", () => {
            const element1 = createElement("div", "test-1");
            const element2 = createElement("div", "test-3");
            const result = domraS `${ new WElement(element1) }test-2${ new WElement(element2) }`;
            assert.equal(result, "<div>test-1</div>test-2<div>test-3</div>");
        });

        it("complex w-element", () => {
            const element = createTree(createElement("div"), [
                createElement("span", "test"), createElement("em", "-1")
            ]);

            const result = domraS `${ new WElement(element) }`;

            assert.equal(result, "<div><span>test</span><em>-1</em></div>");
        });

        it("single w-list", () => {
            const element1 = createElement("div", "test-1");
            const element2 = createElement("div", "test-2");
            const result = domraS `${ new WList([element1, element2]) }`;
            assert.equal(result, "<div>test-1</div><div>test-2</div>");
        });

        it("text before w-list", () => {
            const element1 = createElement("div", "test-1");
            const element2 = createElement("div", "test-2");
            const result = domraS `!!!!${ new WList([element1, element2]) }`;
            assert.equal(result, "!!!!<div>test-1</div><div>test-2</div>");
        });

        it("text after w-list", () => {
            const element1 = createElement("div", "test-1");
            const element2 = createElement("div", "test-2");
            const result = domraS `${ new WList([element1, element2]) }!!!!`;
            assert.equal(result, "<div>test-1</div><div>test-2</div>!!!!");
        });

        it("text surround w-list", () => {
            const element1 = createElement("div", "test-1");
            const element2 = createElement("div", "test-2");
            const result = domraS `!!!!${ new WList([element1, element2]) }!!!!`;
            assert.equal(result, "!!!!<div>test-1</div><div>test-2</div>!!!!");
        });

        it("w-element & w-list", () => {
            const element1 = createElement("div", "test-1");
            const element2 = createElement("div", "test-2");
            const element3 = createElement("div", "test-3");
            const result = domraS `${ new WElement(element1) }${ new WList([element2, element3]) }`;
            assert.equal(result, "<div>test-1</div><div>test-2</div><div>test-3</div>");
        });

        it("several w-lists", () => {
            const element1 = createElement("div", "test-1");
            const element2 = createElement("div", "test-2");
            const element3 = createElement("div", "test-3");
            const result = domraS `${ new WList([element1]) }${ new WList([element2, element3]) }`;
            assert.equal(result, "<div>test-1</div><div>test-2</div><div>test-3</div>");
        });
    });
});
